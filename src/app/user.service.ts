import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8081/SpringMVC';

  constructor(private http: HttpClient) { }

  registerUser(user: any) {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }
  getUserProfileById(userId: number) {
    return this.http.get<any>(`${this.baseUrl}/show-user-profile/${userId}`);
  }

  getAllUsers() {
    return this.http.get<any[]>(`${this.baseUrl}/all-users`);
  }

  
}