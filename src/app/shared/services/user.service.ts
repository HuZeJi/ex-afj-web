import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classes/user';
import { environment } from './../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

export interface ValidationRequest {
  userMail: String;
  password: String;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  path = '/users';
  userPath = environment.apiUrl + this.path;

  constructor(private readonly http: HttpClient) {}

  saveUser(user: User): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.userPath, user, httpOptions);
  }

  validateUser(requestBody: ValidationRequest): Observable<HttpResponse<any>> {
    const requestPath = this.userPath + '/validate';
    return this.http.post<any>(requestPath, requestBody, httpOptions);
  }
}
