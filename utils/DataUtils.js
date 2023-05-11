export const EmptyRecordSet = (data) => {
    if(data.recordset == null || data.recordset.length == 0){
        return true;
    }
    return false;
}

export const ResponseBase = (success, data, err) => {
    return {success, data, err};
}