



-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table mesages
-- 
-- ---
DROP DATABASE IF EXISTS chatterbox;

CREATE DATABASE chatterbox;

USE chatterbox;

DROP TABLE IF EXISTS messages;
    
CREATE TABLE messages (
  id TINYINT NOT NULL AUTO_INCREMENT,
  id_user TINYINT,
  text VARCHAR(500) ,
  id_roomname TINYINT ,
  PRIMARY KEY (id)
);

-- ---
-- Table Users
-- 
-- ---

DROP TABLE IF EXISTS Users;
    
CREATE TABLE Users (
  id TINYINT NOT NULL AUTO_INCREMENT,
  username VARCHAR(20) ,
  PRIMARY KEY (id)
);

-- ---
-- Table roomname
-- 
-- ---

DROP TABLE IF EXISTS roomname;
    
CREATE TABLE roomname (
  id TINYINT NOT NULL AUTO_INCREMENT DEFAULT NULL,
  roomname VARCHAR(40) ,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE mesages ADD FOREIGN KEY (id_user) REFERENCES Users (id);
ALTER TABLE mesages ADD FOREIGN KEY (id_roomname) REFERENCES roomname (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE mesages ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Users ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE roomname ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

 INSERT INTO messages (id_user,text,id_roomname) VALUES
 (1,'eff off',1);
  INSERT INTO messages (id_user,text,id_roomname) VALUES
 (2,'hello',1);
  INSERT INTO messages (id_user,text,id_roomname) VALUES
 (1,'dammit',1);
  INSERT INTO messages (id_user,text,id_roomname) VALUES
 (1,'boohoo',1);
  INSERT INTO messages (id_user,text,id_roomname) VALUES
 (2,'BE HAPPY',1);
 INSERT INTO Users (username) VALUES
 ('angryBOB');
 INSERT INTO Users (username) VALUES
 ('happyALICE');
 INSERT INTO roomname (roomname) VALUES
 ('lobby');

 --select * from messages join users where id_user = users.id;
 --elect * from messages join users where id_user = users.id and id_user = 2;
 --select * from messages join users where  id_user = users.id and ( id_user = 2   or  text = "eff off" )

