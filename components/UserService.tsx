import { useState, useEffect } from 'react';

type User = {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  fecha_nacimiento: string;
  token: string;
}

export const useUser = (cedula: string, clave: string) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (cedula && clave) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`https://adamix.net/minerd/def/iniciar_sesion.php?cedula=${cedula}&clave=${clave}`);
          const result = await response.json();

          if (result.exito) {
            setUser(result.datos);
          } else {
            throw new Error(result.mensaje);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [cedula, clave]);

  return user;
};
