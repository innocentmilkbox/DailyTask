import { Component, Input, OnChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ETaskStatus } from 'src/models/enums/e-status';
import { TaskModel } from 'src/models/task.model';

@Component({
  selector: 'app-modal-change-task-date',
  templateUrl: './modal-change-task-date.component.html',
  styleUrls: ['./modal-change-task-date.component.css']
})
export class ModalChangeTaskDateComponent {
  
  @Input()item: TaskModel | undefined;
  @Input()isCopy: boolean = false;
  
  changeType = '1';
  dateString = '';
  originalDateString = '';  
  displayDaySelect = false;
  minDate = moment().format('YYYY-MM-DD');
  constructor(public activeModal: NgbActiveModal) { }
  ngOnInit(): void {        
    if(this.item){
      this.dateString = moment(this.item.TaskDay).format('YYYY-MM-DD');
      this.originalDateString = this.dateString;
    }
  }
  
  toggleDateSelect(){
    if(this.changeType == '2'){
      this.displayDaySelect = true;
    }else{
      this.displayDaySelect = false;
      this.dateString = moment(this.item!.TaskDay).format('YYYY-MM-DD');
    }        
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }

  submitForm(): void {            
    this.activeModal.close({type: this.changeType, date: this.dateString});
  }
}
