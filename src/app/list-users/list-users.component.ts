import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface User {
  user_id: number;
  f_name: string;
  l_name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users: User[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });

      this.http.get<User[]>('http://localhost:8081/SpringMVC/list-users', { headers })
        .subscribe(
          (data) => {
            this.users = data;
          },
          (error) => {
            console.error('Error fetching users:', error);
          }
        );
    }
  }
}