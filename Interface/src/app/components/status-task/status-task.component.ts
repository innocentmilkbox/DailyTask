import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-task',
  templateUrl: './status-task.component.html',
  styleUrls: ['./status-task.component.css']
})
export class StatusTaskComponent implements OnInit{
  @Input() status: number | undefined;
  ngOnInit(): void {
      
  }
}
