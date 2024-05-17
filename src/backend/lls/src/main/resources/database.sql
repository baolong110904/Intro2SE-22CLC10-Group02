DROP DATABASE IF EXISTS language_learning_system;

CREATE DATABASE language_learning_system;
USE language_learning_system;

# 2 main languages: English, Japanese
CREATE TABLE languages
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       NVARCHAR(50) NOT NULL UNIQUE COMMENT 'Language name',
    is_active  TINYINT(1)   NOT NULL DEFAULT TRUE COMMENT '0: inactive, 1: active',
    created_at DATETIME              DEFAULT CURRENT_TIMESTAMP COMMENT 'Created date',
    updated_at DATETIME              DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated date'
);

# 3 levels: beginner, intermediate, advanced
CREATE TABLE levels
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    language_id INT          NOT NULL COMMENT 'Language ID',
    name        NVARCHAR(50) NOT NULL COMMENT 'Level name',
    is_active   TINYINT(1)   NOT NULL DEFAULT TRUE COMMENT '0: inactive, 1: active',
    created_at  DATETIME              DEFAULT CURRENT_TIMESTAMP COMMENT 'Created date',
    updated_at  DATETIME              DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated date',
    UNIQUE (language_id, name),
    FOREIGN KEY (language_id) REFERENCES languages (id) ON DELETE CASCADE ON UPDATE CASCADE
);

# 4 roles: admin, teacher, teacher assistant, student
CREATE TABLE roles
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(50) NOT NULL UNIQUE COMMENT 'Role name',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Created date',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated date'
);

CREATE TABLE users
(
    id            INT AUTO_INCREMENT PRIMARY KEY,
#     role_id       INT          NOT NULL COMMENT 'Role ID',
    username      VARCHAR(50)  NOT NULL UNIQUE COMMENT 'Username',
    phone_number  VARCHAR(20)  NOT NULL UNIQUE COMMENT 'Phone number',
    password      VARCHAR(255) NOT NULL COMMENT 'Encrypted password',
    date_of_birth DATE                  DEFAULT NULL COMMENT 'Date of birth',
    address       NVARCHAR(255)         DEFAULT NULL COMMENT 'Address',
    first_name    NVARCHAR(50) NOT NULL COMMENT 'First name',
    last_name     NVARCHAR(50) NOT NULL COMMENT 'Last name',
    avatar        VARCHAR(255) NOT NULL COMMENT 'Avatar URL',
    description   TEXT                  DEFAULT NULL COMMENT 'Description',
    is_active     TINYINT(1)   NOT NULL DEFAULT TRUE COMMENT '0: inactive, 1: active',
    created_at    DATETIME              DEFAULT CURRENT_TIMESTAMP COMMENT 'Created date',
    updated_at    DATETIME              DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated date'
#     FOREIGN KEY (role_id) REFERENCES roles (id)
);

CREATE TABLE users_roles
(
    id      INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL COMMENT 'User ID',
    role_id INT NOT NULL COMMENT 'Role ID',
    UNIQUE (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE
);

# CREATE TABLE teachers
# (
#     id      INT AUTO_INCREMENT PRIMARY KEY,
#     user_id INT NOT NULL COMMENT 'User ID',
#     FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
# );
#
# CREATE TABLE teacher_assistants
# (
#     id      INT AUTO_INCREMENT PRIMARY KEY,
#     user_id INT NOT NULL COMMENT 'User ID',
#     FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
# );
#
# CREATE TABLE students
# (
#     id      INT AUTO_INCREMENT PRIMARY KEY,
#     user_id INT NOT NULL COMMENT 'User ID',
#     FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
# );

CREATE TABLE tokens
(
    id              INT PRIMARY KEY AUTO_INCREMENT,
    token           VARCHAR(255) UNIQUE NOT NULL COMMENT 'Token value',
    token_type      VARCHAR(50)         NOT NULL COMMENT 'Token type',
    expiration_date DATETIME            NOT NULL COMMENT 'Expiration date',
    revoked         TINYINT(1)          NOT NULL COMMENT '0: not revoked, 1: revoked',
    expired         TINYINT(1)          NOT NULL COMMENT '0: not expired, 1: expired',
    user_id         INT                 NOT NULL COMMENT 'User ID',
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE courses
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    level_id    INT          NOT NULL COMMENT 'Level ID',
    teacher_id  INT          NOT NULL COMMENT 'Teacher ID',
    ta_id       INT                   DEFAULT NULL COMMENT 'Teacher assistant ID',
    title       NVARCHAR(50) NOT NULL COMMENT 'Course title',
    description TEXT                  DEFAULT NULL COMMENT 'Course description',
    is_private  TINYINT(1)   NOT NULL DEFAULT FALSE COMMENT '0: public, 1: private',
    join_code   VARCHAR(50)  NOT NULL COMMENT 'Join code for private Course',
    is_paid     TINYINT(1)   NOT NULL DEFAULT FALSE COMMENT '0: free, 1: paid',
    price       FLOAT        NOT NULL DEFAULT 0 COMMENT 'Price',
    status      VARCHAR(50)           DEFAULT NULL COMMENT 'Course status',
    is_active   TINYINT(1)   NOT NULL DEFAULT TRUE COMMENT '0: inactive, 1: active',
    created_at  DATETIME              DEFAULT CURRENT_TIMESTAMP COMMENT 'Created date',
    updated_at  DATETIME              DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated date',
    start_date  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Course start date',
    FOREIGN KEY (level_id) REFERENCES levels (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (ta_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE registrations
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    lesson_id  INT        NOT NULL COMMENT 'Lesson ID',
    user_id    INT        NOT NULL COMMENT 'User ID',
    is_active  TINYINT(1) NOT NULL DEFAULT TRUE COMMENT '0: inactive, 1: active',
    created_at DATETIME            DEFAULT CURRENT_TIMESTAMP COMMENT 'Created date',
    updated_at DATETIME            DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated date',
    FOREIGN KEY (lesson_id) REFERENCES courses (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE resources
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    lesson_id   INT          NOT NULL COMMENT 'Lesson ID',
    title       NVARCHAR(50)          DEFAULT NULL COMMENT 'Resource title',
    description TEXT                  DEFAULT NULL COMMENT 'Resource description',
    url         VARCHAR(255) NOT NULL COMMENT 'Resource URL',
    is_active   TINYINT(1)   NOT NULL DEFAULT TRUE COMMENT '0: inactive, 1: active',
    created_at  DATETIME              DEFAULT CURRENT_TIMESTAMP COMMENT 'Created date',
    updated_at  DATETIME              DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated date',
    FOREIGN KEY (lesson_id) REFERENCES courses (id) ON DELETE CASCADE ON UPDATE CASCADE
);

# # 1 teacher, 0->1 teacher assistant, multiple students
# CREATE TABLE lessons_users
# (
#     id        INT AUTO_INCREMENT PRIMARY KEY,
#     lesson_id INT NOT NULL COMMENT 'Lesson ID',
#     user_id   INT NOT NULL COMMENT 'User ID',
#     FOREIGN KEY (lesson_id) REFERENCES lessons (id) ON DELETE CASCADE ON UPDATE CASCADE,
#     FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
# );

CREATE TABLE feedbacks
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    lesson_id  INT        NOT NULL COMMENT 'Lesson ID',
    user_id    INT        NOT NULL COMMENT 'Student ID',
    content    TEXT COMMENT 'Feedback content',
    rating     INT COMMENT 'Feedback rating',
    is_active  TINYINT(1) NOT NULL DEFAULT TRUE COMMENT '0: inactive, 1: active',
    created_at DATETIME            DEFAULT CURRENT_TIMESTAMP COMMENT 'Created date',
    updated_at DATETIME            DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated date',
    FOREIGN KEY (lesson_id) REFERENCES courses (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE certificates
(
    id          INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Certificate ID',
    user_id     INT          NOT NULL COMMENT 'Student ID',
    level_id    INT          NOT NULL COMMENT 'Level ID',
    awarded_on  DATE         NOT NULL COMMENT 'Awarded date',
    certificate VARCHAR(255) NOT NULL COMMENT 'Certificate URL',
    is_active   TINYINT(1)   NOT NULL DEFAULT TRUE COMMENT '0: inactive, 1: active',
    created_at  DATETIME              DEFAULT CURRENT_TIMESTAMP COMMENT 'Created date',
    updated_at  DATETIME              DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated date',
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (level_id) REFERENCES levels (id)
);

INSERT INTO languages (name)
VALUES ('English'),
       ('Japanese');

INSERT INTO levels (language_id, name)
VALUES (1, 'Beginner'),
       (1, 'Intermediate'),
       (1, 'Advanced');
INSERT INTO levels (language_id, name)
VALUES (2, 'Beginner'),
       (2, 'Intermediate'),
       (2, 'Advanced');

INSERT INTO roles (name)
VALUES ('ADMIN'),
       ('TEACHER'),
       ('TA'),
       ('STUDENT');

SELECT *
FROM languages;
SELECT *
FROM levels;
SELECT *
FROM roles;

