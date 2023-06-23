import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { TaskModel } from 'src/models/task.model';

@Component({
  selector: 'app-modal-form-create-task',
  templateUrl: './modal-form-create-task.component.html',
  styleUrls: ['./modal-form-create-task.component.css']
})
export class ModalFormCreateTaskComponent {

  @Input() targetDate: Date | undefined;
  currentUser = 4;
  selectedDateStr = '';
  taskItem: TaskModel = new TaskModel(0, '', this.currentUser, '', '', new Date(), 0);

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {    
    if(this.targetDate != undefined) this.selectedDateStr = moment(this.targetDate).format('YYYY-MM-DD');
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }

  submitForm(): void {    
    this.taskItem.TaskDay = new Date(this.selectedDateStr)        
    this.activeModal.close(this.taskItem);
  }
}
