export class TaskModel{
    Id!: number;
    Title!: string;
    UserId!: number;
    Summary!: string;
    Note!: string;
    TaskDay!: Date;
    TaskStatus!: number;    
    constructor (id = 0, title: string, userId: number, summary: string, note: string, taskDay = new Date(), taskStatus = 0) {
        this.Id = id;
        this.Title = title;
        this.UserId = userId;
        this.Summary = summary
        this.Note = note;
        this.TaskDay = taskDay;
        this.TaskStatus = taskStatus
    }
}

export interface TaskDayModel{
    Date: string,
    Tasks: TaskModel[];
    TaskCount: number;
    DoneCount: number;
    UndoneCount: number;
    PostponedCount: number;
}

export interface ChangeDateModel{
    Id: number;
    TaskDate: Date;
}