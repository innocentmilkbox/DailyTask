import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponseModel } from 'src/models/baseResponse.model';
import { ChangeDateModel, TaskDayModel, TaskModel } from 'src/models/task.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import { ETaskStatus } from 'src/models/enums/e-status';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private baseUrl = `${environment.apiUrl}/tasks`;

  constructor(private http:HttpClient) { }

  getAllTasks(): Observable<BaseResponseModel<TaskModel[]>> {
    const apiUrl = `${this.baseUrl}/get-all`; 
    return this.http.get<BaseResponseModel<TaskModel[]>>(apiUrl);
  }

  getAllTasksByUser(userId: number): Observable<BaseResponseModel<TaskModel[]>> {
    const apiUrl = `${this.baseUrl}/get-all-by-user/${userId}`; 
    return this.http.get<BaseResponseModel<TaskModel[]>>(apiUrl);
  }

  getTasksForUserByDate(userId: number, dateString: string): Observable<BaseResponseModel<TaskDayModel>>{
    const apiUrl = `${this.baseUrl}/get-task-by-date/${userId}?date=${dateString}`;
    return this.http.get<BaseResponseModel<TaskDayModel>>(apiUrl);
  }

  getTaskById(id: number): Observable<BaseResponseModel<TaskModel>>{
    const apiUrl = `${this.baseUrl}/get-task-by-id/${id}`;
    return this.http.get<BaseResponseModel<TaskModel>>(apiUrl);
  }

  createTask(model: TaskModel): Observable<BaseResponseModel<number>>{
    const apiUrl = `${this.baseUrl}/create-task`;
    return this.http.post<BaseResponseModel<number>>(apiUrl, model);
  }

  updateTaskInfo(model: TaskModel): Observable<BaseResponseModel<number>>{
    const apiUrl = `${this.baseUrl}/update-info`;
    return this.http.put<BaseResponseModel<number>>(apiUrl, model);
  } 

  updateAsDone(id: number): Observable<BaseResponseModel<number>>{
    const apiUrl = `${this.baseUrl}/update-done/${id}`;
    return this.http.put<BaseResponseModel<number>>(apiUrl, null);
  } 

  updateAsNotDone(id: number): Observable<BaseResponseModel<number>>{
    const apiUrl = `${this.baseUrl}/update-notdone/${id}`;
    return this.http.put<BaseResponseModel<number>>(apiUrl, null);
  }

  updateAsPostponed(id: number): Observable<BaseResponseModel<number>>{
    const apiUrl = `${this.baseUrl}/update-postponed/${id}`;
    return this.http.put<BaseResponseModel<number>>(apiUrl, null);
  }

  updateTaskStatus(id: number, status: ETaskStatus): Observable<BaseResponseModel<number>>{
    if(status === ETaskStatus.Done){
      return this.updateAsDone(id);
    }else if(status === ETaskStatus.NotDone){
      return this.updateAsNotDone(id);
    }else if(status === ETaskStatus.Postponed){
      return this.updateAsPostponed(id);
    }else{
      return this.updateAsPostponed(id);
    }   
  }

  changeDate(model: ChangeDateModel): Observable<BaseResponseModel<number>>{
    const apiUrl = `${this.baseUrl}/update-move`;
    return this.http.put<BaseResponseModel<number>>(apiUrl, model);
  }

  deleteTask(id: number): Observable<BaseResponseModel<number>>{
    const apiUrl = `${this.baseUrl}/delete/${id}`;
    return this.http.delete<BaseResponseModel<number>>(apiUrl);
  }

}
