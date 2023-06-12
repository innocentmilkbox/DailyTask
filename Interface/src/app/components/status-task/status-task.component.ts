import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ETaskStatus } from 'src/models/enums/e-status';

@Component({
  selector: 'app-status-task',
  templateUrl: './status-task.component.html',
  styleUrls: ['./status-task.component.css']
})
export class StatusTaskComponent implements OnInit{
  @Input() status: number | undefined;
  @Output() statusChange = new EventEmitter<ETaskStatus>()
  ngOnInit(): void {
      
  }

  changeStatus(value: ETaskStatus){
    this.statusChange.emit(value);
  }
}
