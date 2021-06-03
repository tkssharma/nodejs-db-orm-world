# command 
mysql -h 127.0.0.1 -P 3306 -u root
# create database if "db" is not there 
# user dba nd  create table 
CREATE TABLE user (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    email varchar(255),
    PRIMARY KEY (id)
);