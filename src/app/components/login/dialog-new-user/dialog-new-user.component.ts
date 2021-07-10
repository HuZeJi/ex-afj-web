import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/shared/classes/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dialog-new-user',
  templateUrl: './dialog-new-user.component.html',
  styleUrls: ['./dialog-new-user.component.scss'],
})
export class DialogNewUserComponent {
  newUserForm: FormGroup;
  value = '';
  hidePassword = true;

  constructor(
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public userData: User,
    public dialogRef: MatDialogRef<DialogNewUserComponent>,
    private readonly userService: UserService
  ) {
    this.newUserForm = fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  public saveUser(): void {
    const userToSave = new User().populateUser(this.newUserForm.value);
    this.userService.saveUser(userToSave).subscribe((response) => {
      if (response.status && response.status === 200) {
        this.dialogRef.close();
      }
    });
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  get firstName() {
    return this.newUserForm.get('firstName');
  }
  get email() {
    return this.newUserForm.get('email');
  }
  get password() {
    return this.newUserForm.get('password');
  }
}
