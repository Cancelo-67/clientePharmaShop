import axios from "axios";

// Función para autenticar al usuario y obtener el token
export async function authenticateUser(email, password) {
  try {
    const credentials = `${email}:${password}`;
    const base64Credentials = btoa(credentials);

    const config = {
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    };

    // Asegúrate de utilizar la URL y el método correctos según tu configuración
    const response = await axios.post(
      "http://localhost:8080/token",
      null,
      config
    );

    console.log("Autenticación exitosa:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error en la autenticación:", error);
    throw error; // Lanza el error para que se pueda manejar en el componente que utiliza esta función
  }
}
