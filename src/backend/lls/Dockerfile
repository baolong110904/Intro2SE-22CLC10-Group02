FROM openjdk:21-jdk
COPY .env .env
COPY target/lls.jar .
EXPOSE 8080
CMD ["java", "-jar", "lls.jar"]
