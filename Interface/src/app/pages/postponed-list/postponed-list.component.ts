import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TaskTableComponent } from 'src/app/components/task-table/task-table.component';
import { TaskService } from 'src/app/services/task.service';
import { TaskModel } from 'src/models/task.model';

@Component({
  selector: 'app-postponed-list',
  templateUrl: './postponed-list.component.html',
  styleUrls: ['./postponed-list.component.css'],
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
export class PostponedListComponent {

  selectedTask: TaskModel | undefined;
  showDetail = false;  
  @ViewChild('taskTableRef', {static: false}) taskTable!: TaskTableComponent;

  constructor(
    private taskService: TaskService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ){}
  
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
    this.taskTable.reloadTable()
  }
}
