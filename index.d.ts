interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

interface ICategories { 
  [key: string]: string;
}