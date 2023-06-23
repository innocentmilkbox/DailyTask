import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostponedListComponent } from './pages/postponed-list/postponed-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent    
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'postponed',
    component: PostponedListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
