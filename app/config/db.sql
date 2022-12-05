-- user
CREATE TABLE user(
   id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
   email    VARCHAR(60) NOT NULL UNIQUE,
   password VARCHAR(60) NOT NULL,
   fullname VARCHAR(60) NOT NULL,
   account_type     INT(11) NOT NULL,
   number   CHAR(11) NOT NULL,
   balance  NUMERIC(9,2) NOT NULL,
   isAdmin  BOOLEAN  NOT NULL
);

INSERT INTO user VALUES (1, "admin@admin.com", "123", "Bowler Admin", 2, "2341SDER124", 50000, true);

CREATE TABLE account_type (
   id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
   type_name VARCHAR(60) NOT NULL,
   );

-- inserting account type
INSERT INTO account_type (type_name) VALUES ("current account");
INSERT INTO account_type (type_name) VALUES ("savings account");
INSERT INTO account_type (type_name) VALUES ("salary account");
INSERT INTO account_type (type_name) VALUES ("retirement account");

-- transactions
CREATE TABLE transaction(
   id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
   amount NUMERIC(9,2) NOT NULL,
   type   INT(11) NOT NULL,
   date   DATETIME  NOT NULL,
   sender INT(11) NOT NULL,
   receiver INT(11) NOT NULL
);

-- transaction type
CREATE TABLE transaction_type (
   trans_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
   transaction VARCHAR(60) NOT NULL
   );

-- inserting account type
INSERT INTO transaction_type (transaction) VALUES ("deposit");
INSERT INTO transaction_type (transaction) VALUES ("withdrawal");
INSERT INTO transaction_type (transaction) VALUES ("transfer");
