import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.css']
})
export class GetUsersComponent implements OnInit {
  users: any[] = [];
  usersToShow: any[] = [];
  usersPerPage: number = 10;
  currentPage: number = 1;
  showMoreButtonVisible: boolean = false;
  showLessButtonVisible: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAllUsers()
      .subscribe(
        (data: any[]) => {
          this.users = data;
          this.loadUsers();
        },
        (error: any) => {
          console.error('Error fetching users:', error);
        }
      );
  }

  loadUsers(): void {
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    const endIndex = startIndex + this.usersPerPage;
    this.usersToShow = this.users.slice(startIndex, endIndex);

    this.showMoreButtonVisible = endIndex < this.users.length;
    this.showLessButtonVisible = this.currentPage > 1;
  }

  loadMore(): void {
    this.currentPage++;
    this.loadUsers();
  }

  loadLess(): void {
    this.currentPage--;
    this.loadUsers();
  }
}
