import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface UserProfile {
  user_id: number;
  f_name: string;
  l_name: string;
  email: string;
  role: string;
  posts: any[]; 
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile!: UserProfile;
  currentPassword: string = '';
  newPassword: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    this.http.get<UserProfile>('http://localhost:8081/SpringMVC/profile', { headers })
      .subscribe(
        (data) => {
          this.userProfile = data;
        },
        (error) => {
          console.error('Error fetching profile data:', error);
        }
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }


  changePassword(): void {
    console.log("Current Password:", this.currentPassword);
    console.log("New Password:", this.newPassword);
  
    // Check if both currentPassword and newPassword are not empty
    if (!this.currentPassword || !this.newPassword) {
      alert('Please enter both current password and new password.');
      return; // Exit the method if validation fails
    }
  
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
  
    const passwordDetails = {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    };
  
    this.http.post('http://localhost:8081/SpringMVC/change-password', passwordDetails, { headers, responseType: 'text' })
    .subscribe(
      (response) => {
        console.log("Password change response:", response);
        if (response === "Password changed successfully!") {
          alert("Password changed successfully!");
        } else {
          console.log("Unexpected response:", response);
          alert("An error occurred. Please try again later.");
        }
      },
      (error) => {
        console.error('Error:', error);
        alert("An error occurred. Please try again later.");
      }
    );
  }
}
