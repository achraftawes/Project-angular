import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { ShowUserProfileComponent } from './show-user-profile/show-user-profile.component';
import { AddPostComponent } from './add-post/add-post.component';
import { PostsComponent } from './posts/posts.component';
import { GetUsersComponent } from './get-users/get-users.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'list-users', component: ListUsersComponent },
  { path: 'show-user-profile/:id', component: ShowUserProfileComponent },
  { path: 'add-post', component: AddPostComponent },
  { path: 'posts', component: PostsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'get-users', component: GetUsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }