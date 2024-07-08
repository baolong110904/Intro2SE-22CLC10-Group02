1. **Software Information** :
    - Download the following software (if not already installed) to use the application.
        - [IntelliJ IDEA 2023.2.3](https://www.jetbrains.com/idea/download/#section=windows)
        - [Java 21](https://www.oracle.com/java/technologies/downloads/#java21)
        - [Spring Boot 3.2.6](https://start.spring.io/)
        - [Maven 10.0](https://maven.apache.org/download.cgi)
        - [MySQL 8.0.36](https://dev.mysql.com/downloads/installer/)
        - [redis-cli 5.0.14.1](https://redis.io/download)
        - [OpenSSL 3.1.2](https://www.openssl.org/source/)
2. **Generating Asymmetric Keys with OpenSSL** :
    - Run the following commands in the terminal to generate the public and private keys.
       ```shell
       cd src/main/resources/certs
       ```

       ```shell
       openssl genrsa -out keypair.pem 2048  
       ```

       ```shell
       openssl rsa -in keypair.pem -pubout -out publicKey.pem 
       ```

       ```shell
       openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in keypair.pem -out privateKey.pem
       ```
3. **Create .env file in root directory** :
    - Run the following command in the terminal to create a .env file.
      ```shell
      cp .env.example .env
      ```
    - Update the .env file with your values.
4. **Running the Application** :
    - Run the following command in the terminal to start the application.
      ```shell
      mvn spring-boot:run
      ```
