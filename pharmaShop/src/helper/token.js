export async function authenticateUser(email, password) {
  try {
    const response = await axios.post(
      "http://localhost:8080/token",
      {},
      {
        email: email,
        password: password,
      }
    );

    const token = response.data.token;
    console.log(token);

    return token;
  } catch (error) {
    throw new Error("La autenticación falló");
  }
}
