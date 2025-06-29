FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy the Maven configuration files
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Download all required dependencies
RUN mvn dependency:go-offline -B

# Copy the project source
COPY src src

# Package the application
RUN mvn package -DskipTests

# For the runtime image
FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app

# Copy the jar file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Environment variables
ENV SPRING_PROFILES_ACTIVE=prod
ENV SERVER_PORT=8383

# Expose the port
EXPOSE 8383

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
