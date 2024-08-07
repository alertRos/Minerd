import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase('mydatabase.db');

export const initializeDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS UserPhotos (id INTEGER PRIMARY KEY AUTOINCREMENT, photo TEXT, phrase TEXT);'
    );
  });
};

export const insertPhoto = (photoUri: string, phrase: string) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO UserPhotos (photo, phrase) VALUES (?, ?);',
      [photoUri, phrase]
    );
  });
};

export const getPhotos = (): Promise<{ id: number; photo: string; phrase: string }[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM UserPhotos;',
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_tx, error) => {
          reject(error);
          return false;
        }
        
      );
    });
  });
};

