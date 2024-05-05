import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  errorMessage: string = "";

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    let bodyData = {
      "email": this.email,
      "password": this.password
    };

    this.http.post<any>("http://localhost:8081/SpringMVC/login", bodyData)
      .subscribe(
        (resultData) => {
          console.log(resultData);
          if (resultData.token) {
            // Save token to local storage
            localStorage.setItem('token', resultData.token);
            // Redirect to profile page after successful login
            this.router.navigateByUrl('/profile');
          } else {
            console.error('Token not found in response:', resultData);
            this.errorMessage = "An error occurred. Please try again later.";
            alert(this.errorMessage); // Alert for unexpected response
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Error:', error);
          if (error.status === 401) {
            this.errorMessage = error.error.message;
            alert(this.errorMessage); // Alert for invalid email or password
          } else {
            this.errorMessage = "An error occurred. Please try again later.";
            alert(this.errorMessage); // Alert for generic error
          }
        }
      );
  }
}