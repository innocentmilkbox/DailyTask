import { Component, Input, OnInit } from '@angular/core';
import { TaskModel } from 'src/models/task.model';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent implements OnInit {  
  @Input() data: TaskModel[] | undefined;
  ngOnInit(): void {
      this.data = [
        {
          Id: 1,
          Title: 'Meeting with Janice about the Device Event debugging process',
          UserId: 1,
          Summary: 'Meeting with Janice about the Device Event debugging process',
          Note: '',
          TaskDay: new Date(),
          TaskStatus: 2,
        },
        {
          Id: 2,
          Title: 'Standup meeting with John Han',
          UserId: 1,
          Summary: 'Standup meeting with John Han',
          Note: '',
          TaskDay: new Date(),
          TaskStatus: 1,
        },
        {
          Id: 3,
          Title: 'Fixing the AJ204 issues',
          UserId: 1,
          Summary: 'Fixing the AJ204 issues',
          Note: '',
          TaskDay: new Date(),
          TaskStatus: 1,
        },
      ]
  }
}
