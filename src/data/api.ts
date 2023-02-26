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