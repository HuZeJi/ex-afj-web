import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Movement } from 'src/app/shared/classes/movement';
import { UserData } from 'src/app/shared/classes/userData';
import { MovementService } from 'src/app/shared/services/movement.service';
import { Utils } from 'src/app/shared/utils';
import { DialogNewMovementComponent } from '../dashboard/dialog-new-movement/dialog-new-movement.component';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss'],
})
export class IncomesComponent implements OnInit {
  showIncomes: boolean = false;
  displayedColumns: string[] = ['description', 'createdDate', 'amount'];
  movementsList: Movement[] = [];

  constructor(
    private router: Router,
    private readonly utils: Utils,
    private readonly movementService: MovementService,
    private readonly userData: UserData,
    public dialog: MatDialog
  ) {
    this.showIncomes = this.router.url.includes('incomes');
    this.loadSources();
  }

  ngOnInit(): void {}

  private loadSources(): void {
    if (this.userData.getUserMail()) {
      // if (true) {
      this.movementService
        .getMovementsByUser(this.userData.getUserMail())
        // .getMovementsByUser('hugojim123@gmail.com')
        .subscribe((res: any) => {
          this.movementsList = this.utils.getMovementsByTransactionType(
            res.data,
            this.showIncomes ? 1 : 0
          );
        });
    } else {
      this.router.navigate(['']);
    }
  }

  onHomePressed(): void {
    this.router.navigate(['dashboard']);
  }
  onIncomesPressed(): void {
    this.router.navigate(['movements/incomes']);
    this.showIncomes = true;
    this.loadSources();
  }
  onExpensesPressed(): void {
    this.router.navigate(['movements/expenses']);
    this.showIncomes = false;
    this.loadSources();
  }

  onLogout(): void {
    this.router.navigate(['']);
  }

  public onCreateMovement(): void {
    const dialogRef = this.dialog.open(DialogNewMovementComponent, {
      panelClass: 'custom-container',
      data: this.userData.getUserMail(),
    });
  }
}
