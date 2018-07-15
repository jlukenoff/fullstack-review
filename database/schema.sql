DROP DATABASE repositories;
CREATE DATABASE repositories;

USE repositories;

CREATE TABLE repos (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(40),
  owner VARCHAR(40),
  ownerUrl VARCHAR(80),
  description VARCHAR(160),
  url VARCHAR(80),
  forksCount INT,
  defaultBranch VARCHAR(40),
  avatarUrl VARCHAR(80),
  fullName VARCHAR(40),
  PRIMARY KEY (id)
);

