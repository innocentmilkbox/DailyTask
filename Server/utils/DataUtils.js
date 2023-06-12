export const EmptyRecordSet = (data) => {
    if(data.recordset == null || data.recordset.length == 0){
        return true;
    }
    return false;
}

export const ResponseBase = (success, data, err) => {
    return {success, data, err};
}

export const GroupTaskByDay = (date, tasks) => {
    return {
        Date: date, 
        Tasks: tasks,
        TaskCount: tasks.length ?? 0,
        DoneCount: tasks.filter(x => x.TaskStatus == 1).length,
        UndoneCount: tasks.filter(x => x.TaskStatus == 0).length,
        PostponedCount: tasks.filter(x => x.TaskStatus == 2).length, 
    }
}