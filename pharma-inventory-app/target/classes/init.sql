PRINT 'Starting database initialization...';

USE master;
GO

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'pharma_db')
BEGIN
    PRINT 'Creating pharma_db database...';
    CREATE DATABASE pharma_db;
    PRINT 'pharma_db database created successfully.';
END
ELSE
BEGIN
    PRINT 'pharma_db database already exists.';
END
GO

USE pharma_db;
GO

PRINT 'Creating tables if they do not exist...';

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='medicines' and xtype='U')
BEGIN
    PRINT 'Creating medicines table...';
    CREATE TABLE medicines (
        id INT PRIMARY KEY IDENTITY(1,1),
        name NVARCHAR(255) NOT NULL,
        description NVARCHAR(MAX),
        price DECIMAL(10, 2) NOT NULL,
        stock_quantity INT NOT NULL
    );
    PRINT 'medicines table created successfully.';
END
ELSE
BEGIN
    PRINT 'medicines table already exists.';
END
GO

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='customers' and xtype='U')
BEGIN
    PRINT 'Creating customers table...';
    CREATE TABLE customers (
        id INT PRIMARY KEY IDENTITY(1,1),
        name NVARCHAR(255) NOT NULL,
        email NVARCHAR(255) UNIQUE NOT NULL,
        phone NVARCHAR(20)
    );
    PRINT 'customers table created successfully.';
END
ELSE
BEGIN
    PRINT 'customers table already exists.';
END
GO

PRINT 'Database initialization completed.';