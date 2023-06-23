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
import { MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from './services/task.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormCreateTaskComponent } from './components/modal-form-create-task/modal-form-create-task.component';
import { ModalChangeTaskDateComponent } from './components/modal-change-task-date/modal-change-task-date.component';
import { ConfirmationDialogComponent } from './components/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogService } from './services/dialog.service';
import { PostponedListComponent } from './pages/postponed-list/postponed-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskTableComponent,
    InfoComponent,
    TaskButtonComponent,
    TaskDetailComponent,
    StatusTaskComponent,
    ModalFormCreateTaskComponent,
    ModalChangeTaskDateComponent,
    ConfirmationDialogComponent,
    PostponedListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,    
    ToastrModule.forRoot(
      {
        positionClass: 'toast-bottom-right'
      }
    ), 
    NgbModule,  
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    TaskService,
    DialogService       
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
