DROP DATABASE IF EXISTS buckeatlist_db ;

CREATE DATABASE buckeatlist_db;

USE buckeatlist_db;

CREATE TABLE Users (
  id int PRIMARY KEY AUTO_INCREMENT,
  username varchar(255),
  encypted_pw varchar(255),
  emailaddress varchar(255),
  firstname varchar(255),
  lastname varchar(255),
  fullname varchar(255),
  created_at timestamp default CURRENT_TIMESTAMP,
  homecity_id int
);

CREATE TABLE Cities (
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(255),
  province_id int,
  created_at timestamp
);

CREATE TABLE Countries (
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(255),
  currency varchar(255),
  created_at timestamp
);

CREATE TABLE Provinces (
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(255),
  country_id int,
  created_at timestamp
);

CREATE TABLE Bucketlist (
  id int PRIMARY KEY AUTO_INCREMENT,
  user_id int,
  rest_id int,
  visited boolean,
  added_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Restaurant (
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(255),
  yelp_id varchar (255),
  rating float,
  price varchar(64),
  lon float,
  lat float, 
  city_name varchar(255),
  address varchar(10000),
  website varchar(255),
  review_count int
);

CREATE TABLE Image (
  id int PRIMARY KEY AUTO_INCREMENT,
  user_id int,
  rest_id int,
  created_at timestamp,
  img_location varchar(255)
);

CREATE TABLE Cuisine (
  id int PRIMARY KEY AUTO_INCREMENT,
  rest_id int not null,
  alias varchar(255) not null,
  title varchar(255) not null,
  created_at timestamp default CURRENT_TIMESTAMP
);

ALTER TABLE Bucketlist ADD FOREIGN KEY (user_id) REFERENCES Users (id);

ALTER TABLE Bucketlist ADD FOREIGN KEY (rest_id) REFERENCES Restaurant (id);

ALTER TABLE Cuisine ADD FOREIGN KEY (rest_id) REFERENCES Restaurant (id);

ALTER TABLE Image ADD FOREIGN KEY (rest_id) REFERENCES Restaurant (id);

ALTER TABLE Image ADD FOREIGN KEY (user_id) REFERENCES Users (id);