interface Product {
  [x: string]: any;
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

interface IUser {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  },
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    }
  },
  phone: string;
}

interface ISignUpUser {
  username: string;
  password: string;
  confirmPassword?: string;
}

interface ILoginUser extends ISignUpUser { 

}