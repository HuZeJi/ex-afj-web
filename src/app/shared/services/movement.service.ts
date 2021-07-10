import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movement } from '../classes/movement';
import { environment } from './../../../environments/environment';
import { ValidationRequest } from './user.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  path = '/movements';
  movementsPath = environment.apiUrl + this.path;

  constructor(private readonly http: HttpClient) {}

  getMovementsByUser(userMail: string): Observable<Movement> {
    const requestPath = this.movementsPath + '/by/user';
    return this.http.post<Movement>(requestPath, { userMail }, httpOptions);
  }

  saveMovement(movement: Movement): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.movementsPath, movement, httpOptions);
  }
}
