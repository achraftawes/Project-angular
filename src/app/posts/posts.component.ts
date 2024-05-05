import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Post {
  post_id: number;
  content: string;
  createdAt: Date;
  user_id: number;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  loading: boolean = false;
  error: string | null = null;

  // Pagination variables
  currentPage: number = 1;
  postsPerPage: number = 5;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.loading = true;
    this.error = null;

    this.http.get<Post[]>('http://localhost:8081/SpringMVC/posts')
      .subscribe(
        (data) => {
          this.posts = data;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching posts:', error);
          this.error = 'Failed to fetch posts. Please try again later.';
          this.loading = false;
        }
      );
  }

  // Pagination methods
  nextPage(): void {
    this.currentPage++;
  }

  prevPage(): void {
    this.currentPage--;
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  get paginatedPosts(): Post[] {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    return this.posts.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.posts.length / this.postsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
