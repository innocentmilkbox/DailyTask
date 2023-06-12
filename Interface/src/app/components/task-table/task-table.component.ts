import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/services/task.service';
import { ETaskStatus } from 'src/models/enums/e-status';
import { TaskModel } from 'src/models/task.model';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent implements OnInit, OnChanges {  
  data: TaskModel[] | undefined
  @Input() taskDate: Date | undefined;
  @Output() openTaskDetail = new EventEmitter<TaskModel>();  
  @Output() sendRequestChangeStatus = new EventEmitter<ETaskStatus>();
  
  constructor(
    private taskService: TaskService,
    private toastr: ToastrService
  ){}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.taskDate);          
  }
  
  ngOnInit(): void {           
    const taskSub = this.taskService.getAllTasks().subscribe(res => {
      if(res.success){
        console.log(res.data);           
        this.toastr.success('Lấy data thành công', 'Success')
        this.data = res.data as TaskModel[];     
        this.dataSorting() 
      }
      else{
        console.log(res);
        this.toastr.error(res.err);
      }
    })    
  }

  dataSorting(){
    this.data = this.data?.sort((a, b) => a.TaskStatus >= b.TaskStatus ? 1 : -1);
  }

  onCheck(target: any, id: number){    
    var item = this.data?.find(x => x.Id == id);
    if(item) item.TaskStatus = target.checked == true ? 1 : 0;    
    this.dataSorting();
  }

  handleStatusChange(value: ETaskStatus, id: number){    
    var item = this.data?.find(x => x.Id == id)
    if(item)
    {
      this.taskService.updateTaskStatus(id, value).subscribe(res => {
        if(res.success){
          this.toastr.success('Cập nhật trạng thái thành công')
          item!.TaskStatus = value;    
          this.dataSorting();
        }else{
          this.toastr.error('Không thể thực hiện thao tác này')
        }
      })
    } 
  }

  selectTask(item: TaskModel){
    let foundItem = {...item};
    this.openTaskDetail.emit(foundItem);
  }

  handleUpdateData(itemData: TaskModel){
    console.log(itemData);
    
    let item = this.data?.find(x => x.Id === itemData.Id);
    if(item != null){
      this.data![this.data?.indexOf(item) as number] = itemData;
    }
  }
}


// this.data = [
    //   {
    //     Id: 1,
    //     Title: 'Meeting with Janice about the Device Event debugging process',
    //     UserId: 1,
    //     Summary: 'Meeting with Janice about the Device Event debugging process',
    //     Note: '',
    //     TaskDay: new Date(),
    //     TaskStatus: 2,
    //   },
    //   {
    //     Id: 2,
    //     Title: 'Standup meeting with John Han',
    //     UserId: 1,
    //     Summary: 'Standup meeting with John Han',
    //     Note: '',
    //     TaskDay: new Date(),
    //     TaskStatus: 0,
    //   },
    //   {
    //     Id: 3,
    //     Title: 'Fixing the AJ204 issues',
    //     UserId: 1,
    //     Summary: 'Fixing the AJ204 issues',
    //     Note: '',
    //     TaskDay: new Date(),
    //     TaskStatus: 1,
    //   },
    //   {
    //     Id: 4,
    //     Title: 'Standup meeting with John Han 2',
    //     UserId: 1,
    //     Summary: 'Standup meeting with John Han',
    //     Note: '',
    //     TaskDay: new Date(),
    //     TaskStatus: 0,
    //   },
    //   {
    //     Id: 5,
    //     Title: 'Standup meeting with John Han 3',
    //     UserId: 1,
    //     Summary: 'Standup meeting with John Han',
    //     Note: '',
    //     TaskDay: new Date(),
    //     TaskStatus: 0,
    //   },
    //   {
    //     Id: 6,
    //     Title: 'Standup meeting with John Han 4',
    //     UserId: 1,
    //     Summary: 'Standup meeting with John Han',
    //     Note: '',
    //     TaskDay: new Date(),
    //     TaskStatus: 0,
    //   },
    // ];    