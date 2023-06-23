import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ETaskStatus } from 'src/models/enums/e-status';
import { ModalChangeTaskDateComponent } from '../modal-change-task-date/modal-change-task-date.component';

@Component({
  selector: 'app-status-task',
  templateUrl: './status-task.component.html',
  styleUrls: ['./status-task.component.css']
})
export class StatusTaskComponent implements OnInit{
  @Input() status: number | undefined;  
  @Output() statusChange = new EventEmitter<ETaskStatus>()
  @Output() removeItem = new EventEmitter();
  @Output() moveTaskToAnotherDate = new EventEmitter();
  @Output() copyTaskToAnotherDate = new EventEmitter();  
    
  ngOnInit(): void {
      
  }

  changeStatus(value: ETaskStatus){
    this.statusChange.emit(value);
  }

  itemRemove(){
    this.removeItem.emit();
  }

  onMoveTaskToAnotherDate(){    
    this.moveTaskToAnotherDate.emit();
  }

  onCopyTaskToAnotherDate(){
    this.copyTaskToAnotherDate.emit();
  }

}
