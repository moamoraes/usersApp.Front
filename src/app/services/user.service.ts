import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  fullName: string;
  birthDate: Date;
  income: number | null;
  cpf: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://localhost:7066/api/user';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(user: User): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  updateUser(cpf: string, user: User): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${cpf}`, user);
  }

  deleteUser(cpf: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cpf}`);
  }
}
