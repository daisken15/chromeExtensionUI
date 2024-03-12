import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { HomeComponent } from './home/home.component';
// import { SecretComponent } from './secret/secret.component';
import { HomeComponent } from './child-app/home/home.component';
import { SecretComponent } from './child-app/secret/secret.component';

const routes: Routes = [
  { path: 'login', component: SecretComponent },
  { path: ':subreddit', component: HomeComponent }
  
];



// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule,
//     RouterModule.forRoot(routes)
//   ],
//   exports: [RouterModule]
// })

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
