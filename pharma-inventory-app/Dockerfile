# Étape 1: Construction de l'application
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn package

# Étape 2: Exécution de l'application
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/pharma-inventory-app-1.0.0.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]