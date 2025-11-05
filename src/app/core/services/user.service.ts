import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { IUserService } from '../interfaces/user-service.interface';
import { environment } from '../../../environments/environments';
import { API_CONSTANTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {

	private readonly apiUrl = `${environment.apiUrl}${API_CONSTANTS.ENDPOINTS.USERS}`;

	constructor(private readonly http: HttpClient) {}

	getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

}