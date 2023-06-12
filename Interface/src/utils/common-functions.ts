/**
 * 
 * @param {string} dateString - A date string with format of YYYY-MM-DD 
 */
export const GetDateByString = (dateString: string) => {
    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // months are zero-based (0-11)
    const day = parseInt(dateParts[2], 10);

    return new Date(year, month, day);
}

export const GetDayOfWeekString = (date: Date) => {
    const strArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return strArr[date.getDay()]
}