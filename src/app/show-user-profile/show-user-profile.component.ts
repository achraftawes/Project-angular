import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute to access route parameters
import { UserService } from '../user.service';

@Component({
  selector: 'app-show-user-profile',
  templateUrl: './show-user-profile.component.html',
  styleUrls: ['./show-user-profile.component.css']
})
export class ShowUserProfileComponent implements OnInit {
  userProfile: any; // Update the type based on your API response structure
  userId!: number; // Remove the hardcoded userId

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Fetch the userId from route parameters
    this.route.params.subscribe(params => {
      // Assuming 'id' is the parameter name in the route
      this.userId = +params['id']; // Convert string to number
      this.fetchUserProfile();
    });
  }

  fetchUserProfile(): void {
    this.userService.getUserProfileById(this.userId)
      .subscribe(
        (data) => {
          this.userProfile = data;
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );
  }
}