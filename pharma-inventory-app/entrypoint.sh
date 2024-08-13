#!/bin/bash
set -e

echo "Waiting for SQL Server to start..."
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -Q "SELECT 1" -b -t 30

echo "Initializing database..."
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -d master -i /docker-entrypoint-initdb.d/init.sql

echo "Database initialization completed."

exec "$@"