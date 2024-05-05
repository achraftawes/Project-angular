import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  f_name: string = "";
  l_name: string = "";
  email: string = "";
  password: string = "";

  constructor(private http: HttpClient, private router: Router) { }

  save() {
    let bodyData = {
      "f_name": this.f_name,
      "l_name": this.l_name,
      "email": this.email,
      "password": this.password
    };

    this.http.post("http://localhost:8081/SpringMVC/register", bodyData, { responseType: 'text' }).subscribe(
      (resultData: any) => {
        console.log(resultData);
        alert("Registration Successful"); // Notify the user about successful registration
        // Redirect to login page after successful registration
        this.router.navigateByUrl('/login');
      },
      (error) => {
        console.error('Error:', error);
        alert("An error occurred. Please try again later.");
      }
    );
  }
}