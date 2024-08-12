IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'pharma_db')
BEGIN
  CREATE DATABASE pharma_db;
END;
GO
