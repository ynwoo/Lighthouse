FROM openjdk:8-jdk-alpine

CMD pwd
CMD ls
ARG JAR_FILE=backend/lighthouse/build/libs/*.jar

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","/app.jar"]