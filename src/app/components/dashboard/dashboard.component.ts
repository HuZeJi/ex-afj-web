import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Movement } from 'src/app/shared/classes/movement';
import { User } from 'src/app/shared/classes/user';
import { UserData } from 'src/app/shared/classes/userData';
import { IMonthCard } from 'src/app/shared/interfaces/IMonthCard';
import { MovementService } from 'src/app/shared/services/movement.service';
import { DialogNewUserComponent } from '../login/dialog-new-user/dialog-new-user.component';
import { Utils } from './../../shared/utils';
import { DialogNewMovementComponent } from './dialog-new-movement/dialog-new-movement.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  monthCardList: IMonthCard[] = [];
  monthMovementList: Movement[] = [];

  totalMonth: number = 0;
  monthDetail: string = '';

  displayedColumns: string[] = ['description', 'createdDate', 'amount'];

  monthIncomesList: Movement[] = [];
  monthExpensesList: Movement[] = [];

  monthTotalIncomes: number = 0;
  monthTotalExpenses: number = 0;

  constructor(
    private readonly utils: Utils,
    private readonly movementService: MovementService,
    private readonly userData: UserData,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    if (this.userData.getUserMail()) {
      this.movementService
        .getMovementsByUser(this.userData.getUserMail())
        // .getMovementsByUser('hugojim123@gmail.com')
        .subscribe((res: any) => {
          this.monthMovementList = res.data || [];

          this.monthCardList = this.utils.calculateAmountByMonth(res.data);

          this.monthIncomesList = this.utils.getMovementsByTransaction(
            res.data,
            1,
            this.utils.getMonthNumber(
              this.monthCardList[this.monthCardList.length - 1].month
            ),
            this.monthCardList[this.monthCardList.length - 1].year
          );

          this.monthExpensesList = this.utils.getMovementsByTransaction(
            res.data,
            0,
            this.utils.getMonthNumber(
              this.monthCardList[this.monthCardList.length - 1].month
            ),
            this.monthCardList[this.monthCardList.length - 1].year
          );

          this.monthTotalIncomes = this.utils.getTotalByArray(
            this.monthIncomesList
          );
          this.monthTotalExpenses = this.utils.getTotalByArray(
            this.monthExpensesList
          );
          this.totalMonth = this.monthTotalIncomes - this.monthTotalExpenses;
          this.monthDetail = `Balance ${this.monthCardList[0].month}, ${this.monthCardList[1].year} `;
        });
    } else {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {}

  public switchMonthTable(month: string, year: number): void {
    this.monthIncomesList = this.utils.getMovementsByTransaction(
      this.monthMovementList,
      1,
      this.utils.getMonthNumber(month),
      year
    );

    this.monthExpensesList = this.utils.getMovementsByTransaction(
      this.monthMovementList,
      0,
      this.utils.getMonthNumber(month),
      year
    );

    this.monthTotalIncomes = this.utils.getTotalByArray(this.monthIncomesList);
    this.monthTotalExpenses = this.utils.getTotalByArray(
      this.monthExpensesList
    );
    this.totalMonth = this.monthTotalIncomes - this.monthTotalExpenses;
    this.monthDetail = `Balance ${this.monthCardList[0].month}, ${this.monthCardList[1].year} `;
  }

  public onCreateMovement(): void {
    const dialogRef = this.dialog.open(DialogNewMovementComponent, {
      panelClass: 'custom-container',
      data: this.userData.getUserMail(),
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed');
      this.movementService
        .getMovementsByUser(this.userData.getUserMail())
        // .getMovementsByUser('hugojim123@gmail.com')
        .subscribe((res: any) => {
          this.monthMovementList = res.data || [];

          this.monthCardList = this.utils.calculateAmountByMonth(res.data);

          this.monthIncomesList = this.utils.getMovementsByTransaction(
            res.data,
            1,
            this.utils.getMonthNumber(
              this.monthCardList[this.monthCardList.length - 1].month
            ),
            this.monthCardList[this.monthCardList.length - 1].year
          );

          this.monthExpensesList = this.utils.getMovementsByTransaction(
            res.data,
            0,
            this.utils.getMonthNumber(
              this.monthCardList[this.monthCardList.length - 1].month
            ),
            this.monthCardList[this.monthCardList.length - 1].year
          );

          this.monthTotalIncomes = this.utils.getTotalByArray(
            this.monthIncomesList
          );
          this.monthTotalExpenses = this.utils.getTotalByArray(
            this.monthExpensesList
          );
          this.totalMonth = this.monthTotalIncomes - this.monthTotalExpenses;
          this.monthDetail = `Balance ${this.monthCardList[0].month}, ${this.monthCardList[1].year} `;
        });
    });
  }

  onHomePressed(): void {
    this.router.navigate(['dashboard']);
  }
  onIncomesPressed(): void {
    this.router.navigate(['movements/incomes']);
  }
  onExpensesPressed(): void {
    this.router.navigate(['movements/expenses']);
  }

  onLogout(): void {
    this.router.navigate(['']);
  }
}
