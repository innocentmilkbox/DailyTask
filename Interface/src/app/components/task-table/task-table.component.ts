import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/services/task.service';
import { ETaskStatus } from 'src/models/enums/e-status';
import { ChangeDateModel, TaskDayModel, TaskModel } from 'src/models/task.model';
import { ModalChangeTaskDateComponent } from '../modal-change-task-date/modal-change-task-date.component';
import * as moment from 'moment';
import { DialogService } from 'src/app/services/dialog.service';
import { EChangeDateType } from 'src/models/enums/e-change-date-types';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent implements OnInit, OnChanges {  
  data: TaskModel[] | undefined;
  currentUserId = 4;
  countData: any;
  showDateCol = false;
  @Input() taskDate: Date | undefined;
  @Input() isPostponedList = false;
  @Output() openTaskDetail = new EventEmitter<TaskModel>();  
  @Output() sendRequestChangeStatus = new EventEmitter<ETaskStatus>();
  
  constructor(
    private taskService: TaskService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private dialogService: DialogService
  ){}
  ngOnChanges(changes: SimpleChanges): void {            
    this.loadData()          
  }
  
  ngOnInit(): void {           
    this.loadData();
  }

  reloadTable(){
    this.loadData()
  }

  loadData(){        
    if(this.isPostponedList){
      this.showDateCol = true;
      const taskSub = this.taskService.getPostponedListForUser(this.currentUserId).subscribe(res => {
        if(res.success){                 
          // this.toastr.success('Lấy data thành công', 'Success')
          this.data = res.data as TaskModel[];                            
          this.dataSorting() 
        }
        else{        
          this.toastr.error(res.err);
        }
      })  
    } else{
      const taskSub = this.taskService.getTasksForUserByDate(this.currentUserId, this.taskDate as Date).subscribe(res => {
        if(res.success){                 
          // this.toastr.success('Lấy data thành công', 'Success')
          const resData = res.data as TaskDayModel;    
          this.countData = resData;            
          this.data = resData.Tasks;     
          this.dataSorting() 
        }
        else{        
          this.toastr.error(res.err);
        }
      })  
    }
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
          this.loadData()
        }else{
          this.toastr.error('Không thể thực hiện thao tác này')
        }
      })
    } 
  }

  handleRemoveItem(id: number){    
    if(id){
      this.dialogService.openConfirmationDialog().subscribe(dialogRes => {
        if(dialogRes) {
          this.taskService.deleteTask(id).subscribe(res => {
            if(res.success){
              this.toastr.success('Remove task successfully');
              this.loadData();
            }else{
              this.toastr.error('There is an error occur');
            }
          })
        }
        else{          
          
        }
      })                  
    }
  }

  handleChangeDateClick(item: TaskModel, isCopy: boolean){
    const modalRef = this.modalService.open(ModalChangeTaskDateComponent);
    modalRef.componentInstance.item = item;  
    modalRef.componentInstance.isCopy = isCopy;  
    modalRef.result.then((result) => {        
      const dateToChange = result.type == '1' ? moment(item.TaskDay).add(1, 'day').format('YYYY-MM-DD') : result.date;
      if(isCopy){
        const payload = {...item, TaskDay: dateToChange, TaskStatus: 0}
        this.taskService.createTask(payload).subscribe(res => {
          if(res.success){
            this.toastr.success('Copied Task')
            this.loadData();
          }else{
            this.toastr.error('Error')
          }
        })
        
      } else{        
        const changeDateObj = {Id: item.Id, TaskDay: dateToChange} as ChangeDateModel   
        this.taskService.changeDate(changeDateObj).subscribe(res => {
          console.log(changeDateObj);
          
          if(res.success){
            this.toastr.success('Task date change successfully');
            this.loadData();
          }else{
            this.toastr.error('Error')
          }
        })
      }        
    }, (reason) => {

    })
  }

  selectTask(item: TaskModel){
    let foundItem = {...item};
    this.openTaskDetail.emit(foundItem);
  }

  handleUpdateData(itemData: TaskModel){        
    let item = this.data?.find(x => x.Id === itemData.Id);
    if(item != null){
      this.data![this.data?.indexOf(item) as number] = itemData;
      this.dataSorting();
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