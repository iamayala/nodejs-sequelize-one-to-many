-- user
CREATE TABLE user(
   email    VARCHAR(60) NOT NULL PRIMARY KEY,
   password VARCHAR(60) NOT NULL,
   fullname VARCHAR(60) NOT NULL,
   type     VARCHAR(60) NOT NULL,
   number   CHAR(11) NOT NULL,
   balance  NUMERIC(9,2) NOT NULL,
   isAdmin  BOOLEAN  NOT NULL
);

-- transactions
CREATE TABLE transaction(
   title  VARCHAR(60) NOT NULL PRIMARY KEY,
   amount NUMERIC(9,2) NOT NULL,
   type   VARCHAR(5) NOT NULL,
   date   DATE  NOT NULL
);

-- budget
CREATE TABLE budget(
   title  VARCHAR(255) NOT NULL PRIMARY KEY,
   amount NUMERIC(9,2) NOT NULL
);