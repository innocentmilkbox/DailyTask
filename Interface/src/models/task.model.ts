export interface TaskModel{
    Id: number;
    Title: string;
    UserId: number;
    Summary: string;
    Note: string;
    TaskDay: Date;
    TaskStatus: number;
}

export interface TaskDayModel{
    TaskCount: number;
    TaskDoneCount: number;
    TaskUndoneCount: number;
    TaskList: TaskModel[];
}