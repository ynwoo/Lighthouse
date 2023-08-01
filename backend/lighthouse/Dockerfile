FROM openjdk:8-jdk-alpine

ARG JAR_FILE=./S09P12A409/backend/lighthouse/build/libs/*.jar

COPY app.jar app.jar

ENTRYPOINT ["java","-jar","/app.jar"]