const products = [
  {
    id: "1",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Cars" },
    title: "Red Porsche1",
    price: "2000euros",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://www.newsauto.gr/wp-content/uploads/2020/12/201230103742_Ferrari-SUVs-1.jpg",
    description: "Long Description",
    liked: false,
  },
  {
    id: "2",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Cars" },
    title: "Blue Porsche2",
    price: "2000euros",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Porsche-Cayenne.png",
    description: "Long Description",
    liked: false,
  },
  {
    id: "3",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Phones" },
    title: "iphone1",
    price: "2000euros",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://www.newsauto.gr/wp-content/uploads/2020/12/201230103742_Ferrari-SUVs-1.jpg",
    description: "Long Description",
    liked: false,
  },
  {
    id: "4",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Phones" },
    title: "Black Phone",
    price: "2000euros",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Porsche-Cayenne.png",
    description: "Long Description",
    liked: false,
  },
  {
    id: "5",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Phones" },
    title: "Iphone 12",
    price: "2000euros",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://www.newsauto.gr/wp-content/uploads/2020/12/201230103742_Ferrari-SUVs-1.jpg",
    description: "Long Description",
    liked: false,
  },
  {
    id: "6",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Phones" },
    title: "Blue phone",
    price: "2000euros",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Porsche-Cayenne.png",
    description: "Long Description",
    liked: false,
  },
  {
    id: "7",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Phones" },
    title: "Blue iphone2",
    price: "2000euros",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Porsche-Cayenne.png",
    description: "Long Description",
    liked: false,
  },
  {
    id: "8",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Phones" },
    title: "iphone9",
    price: "2000euros",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Porsche-Cayenne.png",
    description: "Long Description",
    liked: false,
  },
  {
    id: "9",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Phones" },
    title: "iphonetest",
    price: "2000euros",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Porsche-Cayenne.png",
    description: "Long Description",
    liked: false,
  },
  {
    id: "10",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Cars" },
    title: "green ferarri",
    price: "2000euros",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Porsche-Cayenne.png",
    description: "Long Description",
    liked: false,
  },
  {
    id: "11",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Cars" },
    title: "is JBondsCar",
    price: "2000euros",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Porsche-Cayenne.png",
    description: "Long Description",
    liked: false,
  },
  {
    id: "12",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Other" },
    title: "randomNames",
    price: "2000euros",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Porsche-Cayenne.png",
    description: "Long Description",
    liked: false,
  },
  {
    id: "13",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Other" },
    title: "who are you",
    price: "2000euros",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Porsche-Cayenne.png",
    description: "Long Description",
    liked: false,
  },
  {
    id: "14",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Other" },
    title: "randmon title",
    price: "2000euros",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Porsche-Cayenne.png",
    description: "Long Description",
    liked: false,
  },
  {
    id: "15",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Other" },
    title: "Blue hello world",
    price: "2000euros",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Porsche-Cayenne.png",
    description: "Long Description",
    liked: false,
  },
  {
    id: "16",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Other" },
    title: "random other",
    price: "2000euros",
    shortDesc: "This is a very nice car.",
    imageURL:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/vhs/Porsche-Cayenne.png",
    description: "Long Description",
    liked: false,
  },
];

export function getProducts() {
  return products;
}
