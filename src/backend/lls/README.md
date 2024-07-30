1. **Software Information** :
    - Download the following software (if not already installed) to use the application.
        - [IntelliJ IDEA 2023.2.3](https://www.jetbrains.com/idea/download/#section=windows) (Recommended)
        - [Java 21](https://www.oracle.com/java/technologies/downloads/#java21) (Required, Version used in the project)
        - [Spring Boot 3.2.6](https://start.spring.io/) (Version used in the project)
        - [Maven 10.0](https://maven.apache.org/download.cgi) (If using command line)
        - [MySQL 8.0.36](https://dev.mysql.com/downloads/installer/) (Required)
        - [redis-cli 5.0.14.1](https://redis.io/download) (Linux, MacOS)
        - [redis](https://github.com/tporadowski/redis/releases) (Windows)
        - [OpenSSL 3.1.2](https://www.openssl.org/source/) (Optional)
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
4. **Create Database** :
    - Method 1:
        - Database script is located in the following path.
          ```shell
          src/main/resources/init.sql
          ```
        - Run the script in MySQL Workbench or any other MySQL client to create the database.
    - Method 2:
        - Move to the directory where the `init.sql` file is located.
          ```shell
          cd src/main/resources
          ```
        - Run the following command in the terminal to create the database.
          ```shell
          mysql -u root -p < init.sql
          ```
        - Enter the password when prompted.
    - Method 3:
        - In file `application.properties` change the following properties.
          ```shell
          ddl-auto: create
          ```
        - Run the application to create the database.
        - Change the property back to `update` after the database is created.
           ```shell
           ddl-auto: update
          ```
        - This method is not recommended for production.
5. **Running the Application** :
    - Run the following command in the terminal to start the application.
      ```shell
      mvn clean install
      ```
      ```shell
      mvn spring-boot:run
      ```
    - The application will start on the following URL.
      ```shell
      http://localhost:8080
      ```
6. **Test Account** :
    - Use the following test account to log in to the application.
        - Role: Admin
            - Account 1:
                - Email: admin1@gmail.com
                - Password: admin1
            - Account 2:
                - Email: admin2@gmail.com
                - Password: admin2
        - Role: Teacher
            - Account 1:
                - Email: teacher1@gmail.com
                - Password: teacher1
            - Account 2:
                - Email: teacher2@gmail.com
                - Password: teacher2
        - Role: Student
            - Account 1:
                - Email: student1@gmail.com
                - Password: student1
            - Account 2:
                - Email: student2@gmail.com
                - Password: student2
