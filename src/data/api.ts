const API_URL = "https://fakestoreapi.com";

export async function getAllProducts() {
    try {
  const response = await fetch(`${API_URL}/products`);
  const data = await response.json();
  return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function getProductsByCategory(category: string) {
  try {
  const response = await fetch(`${API_URL}/products/category/${category}`);
  const data = await response.json();
  return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function getProductById(id: number) {
  try {
  const response = await fetch(`${API_URL}/products/${id}`);
  const data = await response.json();
  return data;
  }
  catch (error) {
    console.log(error);
    return JSON.stringify(error);
    }
}
 
export async function handleLogin({
  username,
  password,
}: ILoginUser) {
  try {
    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      })
  });
    const data = await response.json();
    console.log(data);
  return data;
  }
  catch (error) {
    console.log(error);
    throw new Error('Error en la autenticación. Por favor, verifica tus credenciales e intenta de nuevo.');
    }
}