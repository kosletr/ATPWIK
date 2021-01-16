import { getCategories } from "./fakeCategoryService";

const products = [
  {
    _id: "0121ca3eeb7f6fbccd471820",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Cars" },
    title: "Red Porsche1",
    price: "2000",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://www.newsauto.gr/wp-content/uploads/2020/12/201230103742_Ferrari-SUVs-1.jpg",
    description: "Too Long Description",
    owner: {
      _id: "5fffedc16c5fa415a058317e",
      username: "kosletr",
    },
  },
  {
    _id: "0221ca3eeb7f6fbccd471820",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Cars" },
    title: "Blue Porsche2",
    price: "2000",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Porsche-Cayenne.png",
    description: "Too Long Description",
    owner: {
      _id: "5fffedc16c5fa415a058317e",
      username: "kosletr",
    },
  },
  {
    _id: "0321ca3eeb7f6fbccd471820",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Phones" },
    title: "iphone1",
    price: "2000",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://www.newsauto.gr/wp-content/uploads/2020/12/201230103742_Ferrari-SUVs-1.jpg",
    description: "Too Long Description",
    owner: {
      _id: "5fffedc16c5fa415a058317e",
      username: "kosletr",
    },
  },
  {
    _id: "0421ca3eeb7f6fbccd471820",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Phones" },
    title: "Black Phone",
    price: "2000",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Porsche-Cayenne.png",
    description: "Too Long Description",
    owner: {
      _id: "5fffedc16c5fa415a058317e",
      username: "kosletr",
    },
  },
  {
    _id: "0521ca3eeb7f6fbccd471820",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Phones" },
    title: "Iphone 12",
    price: "2000",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://www.newsauto.gr/wp-content/uploads/2020/12/201230103742_Ferrari-SUVs-1.jpg",
    description: "Too Long Description",
    owner: {
      _id: "5fffedc16c5fa415a058317e",
      username: "kosletr",
    },
  },
  {
    _id: "0621ca3eeb7f6fbccd471820",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Phones" },
    title: "Blue phone",
    price: "2000",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Porsche-Cayenne.png",
    description: "Too Long Description",
    owner: {
      _id: "5fffedc16c5fa415a058317e",
      username: "kosletr",
    },
  },
  {
    _id: "0721ca3eeb7f6fbccd471820",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Phones" },
    title: "Blue iphone2",
    price: "2000",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Porsche-Cayenne.png",
    description: "Too Long Description",
    owner: {
      _id: "5fffedc16c5fa415a058317e",
      username: "kosletr",
    },
  },
  {
    _id: "0821ca3eeb7f6fbccd471820",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Phones" },
    title: "iphone9",
    price: "2000",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Porsche-Cayenne.png",
    description: "Too Long Description",
    owner: {
      _id: "5fffedc16c5fa415a058317e",
      username: "kosletr",
    },
  },
  {
    _id: "0921ca3eeb7f6fbccd471820",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Phones" },
    title: "iphonetest",
    price: "2000",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Porsche-Cayenne.png",
    description: "Too Long Description",
    owner: {
      _id: "5fffedc16c5fa415a058317e",
      username: "kosletr",
    },
  },
  {
    _id: "1021ca3eeb7f6fbccd471820",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Cars" },
    title: "green ferarri",
    price: "2000",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Porsche-Cayenne.png",
    description: "Too Long Description",
    owner: {
      _id: "5fffedc16c5fa415a058317e",
      username: "kosletr",
    },
  },
  {
    _id: "1121ca3eeb7f6fbccd471820",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Cars" },
    title: "is JBondsCar",
    price: "2000",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Porsche-Cayenne.png",
    description: "Too Long Description",
    owner: {
      _id: "6000b9b4724ded55a8ca7273",
      username: "aspadimi",
    },
  },
  {
    _id: "1221ca3eeb7f6fbccd471820",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Other" },
    title: "randomNames",
    price: "2000",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Porsche-Cayenne.png",
    description: "Too Long Description",
    owner: {
      _id: "6000b9b4724ded55a8ca7273",
      username: "aspadimi",
    },
  },
  {
    _id: "1321ca3eeb7f6fbccd471820",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Other" },
    title: "who are you",
    price: "2000",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Porsche-Cayenne.png",
    description: "Too Long Description",
    owner: {
      _id: "6000b9b4724ded55a8ca7273",
      username: "aspadimi",
    },
  },
  {
    _id: "1421ca3eeb7f6fbccd471820",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Other" },
    title: "randmon title",
    price: "2000",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Porsche-Cayenne.png",
    description: "Too Long Description",
    owner: {
      _id: "6000b9b4724ded55a8ca7273",
      username: "aspadimi",
    },
  },
  {
    _id: "1521ca3eeb7f6fbccd471820",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Other" },
    title: "Blue hello world",
    price: "2000",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Porsche-Cayenne.png",
    description: "Too Long Description",
    owner: {
      _id: "6000b9b4724ded55a8ca7273",
      username: "aspadimi",
    },
  },
  {
    _id: "1621ca3eeb7f6fbccd471820",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Other" },
    title: "random other",
    price: "2000",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Porsche-Cayenne.png",
    description: "Too Long Description",
    owner: {
      _id: "6000b9b4724ded55a8ca7273",
      username: "aspadimi",
    },
  },
];

const likedProducts = ["1a", "3a", "5a", "6a", "12a"];

export function getProducts() {
  return products;
}

export function saveProduct(product) {
  let productInDb = products.find((p) => p._id === product._id) || {};
  productInDb.title = product.title;
  productInDb.category = getCategories().find(
    (g) => g._id === product.categoryId
  );
  productInDb.price = product.price;
  productInDb.shortDesc = product.shortDesc;
  productInDb.imageURL = product.imageURL;
  productInDb.description = product.description;
  productInDb.owner = product.owner;

  if (!productInDb._id) {
    productInDb._id = Date.now().toString();
    products.push(productInDb);
  }
}

export function getProduct(productId) {
  return products.find((p) => p._id === productId) || {};
}

export function getLikedProductIds() {
  return likedProducts;
}

export function addLikeToProduct(productId) {
  likedProducts.push(productId);
}

export function removeLikeFromProduct(productId) {
  const index = likedProducts.indexOf(productId);
  if (index > -1) likedProducts.splice(index, 1);
}

export function getUserProducts(ownerId) {
  return products.filter((p) => p.owner._id === ownerId) || [];
}

export function deleteProduct(productId) {
  const index = products.indexOf(productId);
  products.splice(index, 1);
}
