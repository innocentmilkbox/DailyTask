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
    Description nvarchar(100),
    DayOfWeek nvarchar(10),
    TimeStart datetime2,
    TimeFinished datetime2,
    IsDone bit, 
)
CREATE TABLE DailyTaskUnits
(
    Id int primary key Identity,
    DailyTaskId int NOT NULL,
    DailyTaskTitle nvarchar(100) NOT NULL,
    OfDay date NOT NULL,
    OfWeekString nvarchar(100),   --From dd-mm-yyyy To dd-mm-yyyy
    OfWeekMonday date NOT NULL,
    OfWeekSunday date NOT NULL,
    IsDone bit,
)
