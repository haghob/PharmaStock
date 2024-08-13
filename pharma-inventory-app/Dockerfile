# Étape 1: Construction de l'application
FROM maven:3.8.4-openjdk-17 AS build
FROM mcr.microsoft.com/mssql/server:2019-latest


WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn package

# Étape 2: Création de l'image finale
#WORKDIR /app
#COPY --from=build /app/target/pharma-inventory-app-1.0.0.jar app.jar
#EXPOSE 8080
#ENTRYPOINT ["java", "-jar", "app.jar"]


FROM openjdk:17-jdk-slim
VOLUME /tmp
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]



USER root

# Copy initialization script
COPY entrypoint.sh /entrypoint.sh
COPY src/main/resources/init.sql /docker-entrypoint-initdb.d/init.sql

# Grant permissions
RUN chmod +x /entrypoint.sh

USER mssql

CMD /bin/bash /entrypoint.sh

