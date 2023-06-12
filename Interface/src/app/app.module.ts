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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from './services/task.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';


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
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,    
    ToastrModule.forRoot()    
  ],
  providers: [
    TaskService,       
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
