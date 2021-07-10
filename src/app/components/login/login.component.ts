import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { User } from 'src/app/shared/classes/user';
import { UserData } from 'src/app/shared/classes/userData';
import { UserService } from 'src/app/shared/services/user.service';
import { DialogNewUserComponent } from './dialog-new-user/dialog-new-user.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;

  socialUser!: SocialUser;

  email!: String;
  password!: String;

  constructor(
    private readonly socialAuthService: SocialAuthService,
    private readonly userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private readonly userData: UserData
  ) {}

  ngOnInit(): void {
    this.userData.setUserMail('');
    // this.socialAuthService.authState.subscribe((user) => {
    //   this.userService
    //     .validateUser({ userMail: user.email, password: '' })
    //     .subscribe((auth) => {
    //       console.log(auth);

    //       if (auth.status === 204) {
    //         const userToSave = new User().populateUser(user);
    //         this.userService.saveUser(userToSave).subscribe((response) => {
    //           console.log(response);
    //         });
    //       } else if (auth.status === 200) {
    //         // route to dashboard
    //       } else {
    //         console.error('Error on auth');
    //       }
    //     });
    // });
  }

  public loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  public onValidateUser(email: String, password: String): void {
    if (password !== '' && email !== '') {
      this.userService
        .validateUser({ userMail: email, password: password })
        .subscribe((auth: any) => {
          if (auth.status === 200 && auth.data && auth.data === true) {
            this.userData.setUserMail(email.toString());
            this.router.navigate(['dashboard']);
          } else {
            console.error('Auth error');
          }
        });
    }
  }

  public onCreateUser(): void {
    const dialogRef = this.dialog.open(DialogNewUserComponent, {
      panelClass: 'custom-container',
      data: new User(),
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed');
    });
  }
}
