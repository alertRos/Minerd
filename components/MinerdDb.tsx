import * as SQLite from 'expo-sqlite/legacy';

export type Visit = {
  id: number;
  fecha: string;
  titulo: string;
  motivo: string;
  codigo_institucion: string;
  nombre_institucion: string;
  latitud: number;
  longitud: number;
  cedula_director: string;
  nombre_director: string;
  comentario: string;
  foto: string;
  audio: string;
};

export type User = {
  id: number;
  foto: string;
  nombre: string;
  apellido: string;
  matricula: string;
  frase: string;
  signo: string;
};

const db = SQLite.openDatabase('minerd');
//Recuerden inicializar en cada vista donde usen la base de datos
export const initializeDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Usuario (id INTEGER PRIMARY KEY AUTOINCREMENT, foto TEXT, nombre TEXT, apellido TEXT, matricula TEXT, frase TEXT, signo TEXT);'
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Visita (id INTEGER PRIMARY KEY AUTOINCREMENT, fecha TEXT, titulo TEXT, motivo TEXT, codigo_institucion TEXT, nombre_institucion TEXT, latitud REAL, longitud REAL, cedula_director TEXT, nombre_director TEXT, comentario TEXT, foto TEXT, audio TEXT);'
    );
  });
};

//******************************** Usuarios  
export const createUser = (foto: string, nombre: string, apellido: string, matricula: string, frase: string, signo: string) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO Usuario (foto, nombre, apellido, matricula, frase, signo) VALUES (?, ?, ?, ?, ?, ?);',
      [foto, nombre, apellido, matricula, frase, signo],
      () => console.log('Usuario creado exitosamente')
    );
  });
};

export const updateUser = (id: number, foto: string, nombre: string, apellido: string, matricula: string, frase: string, signo: string) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE Usuario SET foto = ?, nombre = ?, apellido = ?, matricula = ?, frase = ?, signo = ? WHERE id = ?;',
      [foto, nombre, apellido, matricula, frase, signo, id],
      () => console.log('Usuario actualizado exitosamente')
    );
  });
};

export const hasUsers = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT COUNT(*) AS count FROM Usuario;', [], (_, { rows: { _array } }) => {
        const count = _array[0].count;
        resolve(count > 0);
      }, (_, error) => {
        reject(error);
        return false;
      });
    });
  });
};

export const getUser = (id: number): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Usuario WHERE id = ?;',
        [id],
        (_, { rows: { _array } }) => {
          resolve(_array.length > 0 ? _array[0] as User : null);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

// ******************* Visitas

export const createVisit = (fecha: string, titulo: string, motivo: string, codigo_institucion: string, nombre_institucion: string, latitud: number, longitud: number, cedula_director: string, nombre_director: string, comentario: string, foto: string, audio: string) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO Visita (fecha, titulo, motivo, codigo_institucion, nombre_institucion, latitud, longitud, cedula_director, nombre_director, comentario, foto, audio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [fecha, titulo, motivo, codigo_institucion, nombre_institucion, latitud, longitud, cedula_director, nombre_director, comentario, foto, audio],
      () => console.log('Visita creada exitosamente')
    );
  });
};

export const updateVisit = (id: number, fecha: string, titulo: string, motivo: string, codigo_institucion: string, nombre_institucion: string, latitud: number, longitud: number, cedula_director: string, nombre_director: string, comentario: string, foto: string, audio: string) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE Visita SET fecha = ?, titulo = ?, motivo = ?, codigo_institucion = ?, nombre_institucion = ?, latitud = ?, longitud = ?, cedula_director = ?, nombre_director = ?, comentario = ?, foto = ?, audio = ? WHERE id = ?;',
      [fecha, titulo, motivo, codigo_institucion, nombre_institucion, latitud, longitud, cedula_director, nombre_director, comentario, foto, audio, id],
      () => console.log('Visita actualizada exitosamente')
    );
  });
};

export const deleteVisit = (id: number) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM Visita WHERE id = ?;',
      [id],
      () => console.log('Visita eliminada exitosamente')
    );
  });
};

export const getVisit = (id: number): Promise<Visit | null> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Visita WHERE id = ?;',
        [id],
        (_, { rows: { _array } }) => {
          resolve(_array.length > 0 ? _array[0] as Visit : null);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const getVisits = (): Promise<Visit[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Visita ORDER BY id DESC;', [], (_, { rows: { _array } }) => {
        resolve(_array as Visit[]);
      }, (_, error) => {
        reject(error);
        return false;
      });
    });
  });
};


//Borrals todo
export const deleteAllData = () => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM Usuario;', [], () => console.log('Todos los usuarios eliminados'));
    tx.executeSql('DELETE FROM Visita;', [], () => console.log('Todas las visitas eliminadas'));
  });
};
