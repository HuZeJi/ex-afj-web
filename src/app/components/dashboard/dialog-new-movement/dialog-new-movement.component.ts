import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movement } from 'src/app/shared/classes/movement';
import { User } from 'src/app/shared/classes/user';
import { MovementService } from 'src/app/shared/services/movement.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dialog-new-movement',
  templateUrl: './dialog-new-movement.component.html',
  styleUrls: ['./dialog-new-movement.component.scss'],
})
export class DialogNewMovementComponent {
  newMovement = new Movement();
  selectedDate = new Date();
  value = '';
  hidePassword = true;
  transactionType = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public userMail: string,
    public dialogRef: MatDialogRef<DialogNewMovementComponent>,
    private readonly movementService: MovementService
  ) {
    console.log(this.userMail);
  }

  public onSaveMovement(): void {
    this.newMovement.userMail = this.userMail.toString();
    this.newMovement.transactionType = this.transactionType;
    this.newMovement.createdDate = this.selectedDate;
    if (this.newMovement.amount > 0) {
      this.movementService
        .saveMovement(this.newMovement)
        .subscribe((response) => {
          if (response.status && response.status === 200) {
            this.dialogRef.close();
          }
          console.log(response);
        });
    }
  }

  public onTransactionTypeUpdated(): void {
    this.transactionType = this.transactionType === 1 ? 0 : 1;
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
