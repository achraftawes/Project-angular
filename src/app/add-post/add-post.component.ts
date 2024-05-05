import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  postContent: string = '';
  loading: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  addPost(): void {
    this.loading = true;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });

    const postDetails = {
      content: this.postContent
    };

    this.http.post('http://localhost:8081/SpringMVC/add-post', postDetails, { headers, responseType: 'text' })
      .subscribe(
        (response) => {
          console.log("Post added response:", response);
          if (response === "Post added successfully!") {
            alert("Post added successfully!");
            this.router.navigateByUrl('/posts');
          } else {
            console.error('Unexpected response:', response);
            alert("An error occurred while adding the post. Please try again later.");
          }
        },
        (error) => {
          console.error('Error adding post:', error);
          alert("An error occurred while adding the post. Please try again later.");
        }
      )
      .add(() => {
        this.loading = false;
      });
  }
}