
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 05/12/2018 10:45:27
-- Generated from EDMX file: C:\studio\diil\ola\ola.model\OlaModelEntities.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [ola];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------


-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[LotteryOpenHistory]', 'U') IS NOT NULL
    DROP TABLE [dbo].[LotteryOpenHistory];
GO
IF OBJECT_ID(N'[dbo].[LotteryOpenTimes]', 'U') IS NOT NULL
    DROP TABLE [dbo].[LotteryOpenTimes];
GO
IF OBJECT_ID(N'[olaModelStoreContainer].[Log]', 'U') IS NOT NULL
    DROP TABLE [olaModelStoreContainer].[Log];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'LotteryOpenTimes'
CREATE TABLE [dbo].[LotteryOpenTimes] (
    [Id] uniqueidentifier  NOT NULL,
    [LotteryId] int  NOT NULL,
    [QiHao] nvarchar(50)  NOT NULL,
    [OpenTime] datetime  NOT NULL,
    [CreateTime] datetime  NOT NULL,
    [NextQiHao] nvarchar(50)  NOT NULL,
    [PreQiHao] nvarchar(50)  NOT NULL,
    [StartTime] datetime  NOT NULL,
    [EndTime] datetime  NOT NULL
);
GO

-- Creating table 'Logs'
CREATE TABLE [dbo].[Logs] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Date] datetime  NOT NULL,
    [Thread] varchar(255)  NOT NULL,
    [Level] varchar(50)  NOT NULL,
    [Logger] varchar(255)  NOT NULL,
    [Message] varchar(4000)  NOT NULL,
    [Exception] varchar(2000)  NULL
);
GO

-- Creating table 'LotteryOpenHistories'
CREATE TABLE [dbo].[LotteryOpenHistories] (
    [Id] uniqueidentifier  NOT NULL,
    [LotteryId] int  NOT NULL,
    [QiHao] nvarchar(50)  NOT NULL,
    [OpenNumber] nvarchar(50)  NOT NULL,
    [OpenTime] nvarchar(50)  NOT NULL,
    [CreateTime] datetime  NOT NULL,
    [UpdateTime] datetime  NULL,
    [Source] int  NOT NULL,
    [Forecast1] nvarchar(50)  NULL,
    [Forecast2] nvarchar(50)  NULL,
    [Forecast3] nvarchar(50)  NULL,
    [Used] bit  NOT NULL,
    [CurrentForecastNumber] nvarchar(50)  NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'LotteryOpenTimes'
ALTER TABLE [dbo].[LotteryOpenTimes]
ADD CONSTRAINT [PK_LotteryOpenTimes]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id], [Date], [Thread], [Level], [Logger], [Message] in table 'Logs'
ALTER TABLE [dbo].[Logs]
ADD CONSTRAINT [PK_Logs]
    PRIMARY KEY CLUSTERED ([Id], [Date], [Thread], [Level], [Logger], [Message] ASC);
GO

-- Creating primary key on [Id] in table 'LotteryOpenHistories'
ALTER TABLE [dbo].[LotteryOpenHistories]
ADD CONSTRAINT [PK_LotteryOpenHistories]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------