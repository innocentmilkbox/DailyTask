CREATE DATABASE TODOLIST
GO 
USE TODOLIST
GO
CREATE TABLE USERS
(
    Id int primary key Identity,
    UserName nvarchar(100) NOT NULL,
    DisplayName nvarchar(100) NOT NULL,
    HashedPassword nvarchar(200) NOT NULL,
    Salt nvarchar(100) NOT NULL,
    JoinDate datetime2,
    LastOnline datetime2,
)
CREATE TABLE TASKS
(
    Id int primary key Identity,
    UserId int NOT NULL,
    Title nvarchar(100) NOT NULL,
    Summary nvarchar(100),
    Note nvarchar(100),
    TaskDay date,
    IsDone bit,    
    TaskStatus int, -- 0: Not Done, 1: Done, 2: Postponed    
)