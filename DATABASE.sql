CREATE DATABASE DAILY_TASKS_DATABASE
GO
USE DAILY_TASKS_DATABASE
GO
CREATE TABLE TaskTypes
(
    Id int primary key Identity,
    Title nvarchar(100),
    Description nvarchar(100)
)
CREATE TABLE DailyTasks
(
    Id int primary key Identity,
    TypeId int,
    Title nvarchar(100) NOT NULL,
    Description nvarchar(100) ,
    TimeStart datetime2,
    TimeFinished datetime2,
    IsDone boolean,
)
