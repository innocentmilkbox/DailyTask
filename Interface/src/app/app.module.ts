import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { TaskTableComponent } from './components/task-table/task-table.component';
import { InfoComponent } from './pages/info/info.component';
import { TaskButtonComponent } from './components/task-button/task-button.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { StatusTaskComponent } from './components/status-task/status-task.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskTableComponent,
    InfoComponent,
    TaskButtonComponent,
    TaskDetailComponent,
    StatusTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
