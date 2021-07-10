import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserData {
  private userMail!: string;
  private userName!: string;
  private userLastName!: string;

  public setUserMail(userMail: string) {
    this.userMail = userMail;
  }

  public getUserMail() {
    return this.userMail;
  }

  public setUserName(userName: string) {
    this.userName = userName;
  }

  public getUserName() {
    return this.userName;
  }

  public setUserLastName(userLastName: string) {
    this.userLastName = userLastName;
  }

  public getUserLastName() {
    return this.userLastName;
  }

  public setUserData(mail: string, name: string, lastName: string) {
    this.userMail = mail;
    this.userName = name;
    this.userLastName = lastName;
  }
}
