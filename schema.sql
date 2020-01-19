DROP DATABASE IF EXISTS buckeatlist_db ;

CREATE DATABASE buckeatlist_db;

USE buckeatlist_db;

CREATE TABLE Users (
  id int PRIMARY KEY AUTO_INCREMENT,
  encrypted_pw varchar(255),
  emailaddress varchar(255),
  firstname varchar(255),
  lastname varchar(255),
  created_at timestamp,
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
  created_at timestam
);

CREATE TABLE Bucketlist (
  id int PRIMARY KEY AUTO_INCREMENT,
  user_id int,
  rest_id int,
  visited boolean
);

CREATE TABLE Resturant (
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(255),
  yelp_id int,
  rating int,
  price int,
  lang int,
  lat int,
  cuisine varchar(255),
  city_id int,
  address varchar(255),
  website varchar(255),
  review_count int,
  hoursOfOp varchar(255)
);

CREATE TABLE Image (
  id int PRIMARY KEY AUTO_INCREMENT,
  user_id int,
  rest_id int,
  created_at timestamp,
  img_location varchar(255)
);

CREATE TABLE Categories (
  id int PRIMARY KEY AUTO_INCREMENT,
  title varchar,
  alias varchar
  );

ALTER TABLE Users ADD FOREIGN KEY (homecity_id) REFERENCES Cities (id);

ALTER TABLE Provinces ADD FOREIGN KEY (country_id) REFERENCES Countries (id);

ALTER TABLE Cities ADD FOREIGN KEY (province_id) REFERENCES Provinces (id);

ALTER TABLE Bucketlist ADD FOREIGN KEY (user_id) REFERENCES Users (id);

ALTER TABLE Bucketlist ADD FOREIGN KEY (rest_id) REFERENCES Resturant (id);

ALTER TABLE Resturant ADD FOREIGN KEY (city_id) REFERENCES Cities (id);

ALTER TABLE Image ADD FOREIGN KEY (rest_id) REFERENCES Resturant (id);

ALTER TABLE Image ADD FOREIGN KEY (user_id) REFERENCES Users (id);