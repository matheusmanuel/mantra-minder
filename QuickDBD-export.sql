-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE IF NOT EXISTS Mantras (
      mantraID INTEGER UNIQUE,
      mantraTitle VARCHAR(255) NOT NULL,
      mantraText TEXT NOT NULL,
      isActive BOOLEAN NOT NULL,
      playOnStartup BOOLEAN NOT NULL,
      displayTime VARCHAR(20) NOT NULL,
      PRIMARY KEY ("mantraID" AUTOINCREMENT)
  );