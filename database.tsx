import React from "react";
import { SQLiteProvider } from "expo-sqlite";

type DatabaseProps = {
  children: React.ReactNode;
};

export function Database({ children }: DatabaseProps) {
  return (
    <SQLiteProvider
      databaseName="database.db"
      onInit={async (db) => {
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS User (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            name TEXT NOT NULL,
            surname TEXT NOT NULL,
            dateOfBirth TEXT NOT NULL,
            cpr TEXT NOT NULL UNIQUE,
            isWorker INTEGER NOT NULL DEFAULT 0,
            cardDetails TEXT
          );

          CREATE TABLE IF NOT EXISTS CarList (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            brand TEXT NOT NULL,
            model TEXT NOT NULL,
            year INTEGER NOT NULL,
            price INTEGER NOT NULL,
            isAvailable INTEGER NOT NULL DEFAULT 1
          );

          CREATE TABLE IF NOT EXISTS RentalHistory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            startDate TEXT DEFAULT (CURRENT_TIMESTAMP),
            endDate TEXT,
            UserId INTEGER,
            CarId INTEGER,
            FOREIGN KEY (UserId) REFERENCES User(id),
            FOREIGN KEY (CarId) REFERENCES CarList(id)
          );

          PRAGMA journal_mode=WAL;
        `);
      }}
      options={{ useNewConnection: false }}
    >
      {children}
    </SQLiteProvider>
  );
}