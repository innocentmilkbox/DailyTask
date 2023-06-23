import { Component, HostListener, OnDestroy, ElementRef, Output, EventEmitter, Input, OnInit, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/services/task.service';
import { TaskModel } from 'src/models/task.model';
import { GetDayOfWeekString } from 'src/utils/common-functions';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
  
})
export class TaskDetailComponent implements OnInit, OnChanges {
 
  @Input() taskDetail: TaskModel | undefined;  
  @Output() closeDetail = new EventEmitter();
  @Output() detailChange = new EventEmitter<TaskModel>();
  editable: any = {
    title: false,
    summary: false,
    note: false
  }  
  dateString = '';

  constructor(
    private elementRef: ElementRef, 
    private taskService: TaskService, 
    private toastr: ToastrService) {}
    
  ngOnInit(): void {
    if(this.taskDetail == undefined) return;    
  }

  onClose(){
    this.closeDetail.emit();
  }
  ngOnChanges(): void {             
    if(this.taskDetail != null){
      const date = new Date(this.taskDetail.TaskDay);
      const dayOfWeek = GetDayOfWeekString(date);      
      this.dateString = `${dayOfWeek}, ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
    }
  }

  toEdit(type: string){       
    this.editable[type] = !this.editable[type];
  }

  submit(form: NgForm){        
    const Title:string = form.controls['task-title'].value;
    const Summary:string = form.controls['task-summary'].value;
    const Note: string = form.controls['task-note'].value;
    if(Title == ''){
      return;
    }else{            
      const {Id, UserId, TaskStatus, TaskDay} = this.taskDetail as TaskModel;
      let model = new TaskModel(Id, Title, UserId, Summary, Note, TaskDay, TaskStatus); 
      this.taskService.updateTaskInfo(model).subscribe(res => {
        if(res.success){
          this.detailChange.emit(model);
          this.toastr.success('Update task info successfully')
          this.onClose();
        }else{
          this.toastr.error('Cannot update task info')
        }
      })
    }
  }

  onChangeStatus(){
    const {Id, Title, UserId, Summary, Note, TaskDay, TaskStatus} = this.taskDetail as TaskModel;
    let model = new TaskModel(Id, Title, UserId, Summary, Note, TaskDay, TaskStatus == 0 ? 1 : 0);     
    this.taskService.updateTaskStatus(model.Id, model.TaskStatus).subscribe(res => {
      if(res.success){
        this.detailChange.emit(model);
        this.toastr.success('Update status successfully')
        this.onClose();
      }else{
        this.toastr.error('Cannot update task status')
      }
    })
  }

  
}
