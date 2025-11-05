import { Observable } from 'rxjs';
import { User } from '../models/user.model';

export interface IUserService {
    getUsers(): Observable<User[]>;
    getUserById(id: number): Observable<User>;
}