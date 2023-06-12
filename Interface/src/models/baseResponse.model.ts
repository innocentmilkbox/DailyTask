export interface BaseResponseModel<T>{
    success: boolean,
    data: T,
    err: string 
}