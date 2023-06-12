import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskModel } from 'src/models/task.model';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { TaskTableComponent } from 'src/app/components/task-table/task-table.component';
import { TaskService } from 'src/app/services/task.service';
import { ToastrService } from 'ngx-toastr';
import { GetDateByString } from 'src/utils/common-functions';
import * as moment from 'moment';
import {NgbModal} from '@'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
   animations: [
    trigger('slideInFromRight', [
      state('void', style({
        transform: 'translateX(100%)', // Initial position outside the viewport
        opacity: 0 // Initial opacity
      })),
      state('visible', style({
        transform: 'translateX(0)', // Visible position at 0px from the right
        opacity: 1 // Full opacity
      })),
      transition('void => visible', animate('500ms ease-out')), // Animation duration and easing when becoming visible
      transition('visible => void', animate('300ms ease-in')) // Animation duration and easing when becoming invisible
    ])
  ]
})
export class HomeComponent implements OnInit {
  // data: TaskModel[] | undefined;
  taskDate: Date | undefined;
  selectedTask: TaskModel | undefined;
  showDetail = false;
  @ViewChild('taskTableRef', {static: false}) taskTable!: TaskTableComponent;

  dateStringForInput = new Date().toISOString().substring(0,10);

  constructor(
    private taskService: TaskService,
    private toastr: ToastrService
  ){}
  ngOnInit(): void {
    
  }

  showDate(target: any){
    this.taskDate = moment(target.value, 'YYYY-MM-DD').toDate();                 
  }

  openCreateForm(){

  }

  handleOpenTaskDetail(task: TaskModel){
    if(!this.showDetail){
      this.selectedTask = task;
      this.showDetail = true;
    }
    else if(this.selectedTask?.Id != task.Id){      
      this.showDetail = false;
      setTimeout(() => {
        this.selectedTask = task;
        this.showDetail = true;
      }, !this.showDetail ? 300 : 0)    
    }
  }

  handleCloseDetail(){
    this.showDetail = false
  }

  handleDetailChange(model: TaskModel){
    this.taskTable.handleUpdateData(model); 
  }
}
