const axios = require("axios");
const { MongoClient, ObjectId } = require("mongodb");


const client = new MongoClient("mongodb://localhost:27017");
async function run(docs) {
    try {
        await client.connect();
        const database = client.db("testApp");

        

        const result = await database.collection("products").insertMany(docs);
        console.log(`${result.insertedCount} documents were inserted`);
    } finally {
        await client.close();
    }
}

async function GetProducts() {
    try {
        const { data: products } = await axios.get('https://fakestoreapi.com/products');
        const { data: categories } = await axios.get('https://fakestoreapi.com/products/categories');
        return [products, categories];
    } catch (error) {
        console.log(error);
    }
}

function createUsers() {
    const users = [
        { firstname: "Johh", lastname: "Rambo", username: "johnrambo", password: "123456", email: "johnrambo@email.com" },
        { firstname: "George", lastname: "Doe", username: "georgedoe", password: "123456", email: "georgedoe@email.com" },
        { firstname: "Jack", lastname: "Hero", username: "jackhero", password: "123456", email: "jackhero@email.com" },
        { firstname: "Maria", lastname: "Dibi", username: "mariadibi", password: "123456", email: "mariadibi@email.com" },
    ];

    const userIds = [];
    userIds.push(users.forEach(createUser))
    return userIds;
}

async function createUser(user) {
    axios.post('http://localhost:3001/api/auth/register', user)
}

function renameKey(object, old_key, new_key) {
    if (old_key !== new_key) {
        Object.defineProperty(object, new_key,
            Object.getOwnPropertyDescriptor(object, old_key));
        delete object[old_key];
    }
}

(async function () {
    const owners = [
        "61bde408b82f5d3ad4cf59b8",
        "61c0886f7f94bed3c639d9bb",
        "61d0188502b24aa22071a2f8",
        "61d018a302b24aa22071a2fb"
    ]

    const categoriesObject = {
        "men's clothing": "61d01dcd2ee66c8de25a4173",
        "jewelery": "61d01de92ee66c8de25a417e",
        "electronics": "61d01df12ee66c8de25a4189",
        "women's clothing": "61d01dfa2ee66c8de25a4194",
    }

    function modifyProduct(product) {
        product.title = product.title.slice(0, 20);
        renameKey(product, "image", "imageURL");

        delete product.id;
        delete product.rating;

        product.category = ObjectId(categoriesObject[product.category]);
        product.shortDesc = product.description.slice(0, 20);
        product.owner = ObjectId(owners[Math.floor(Math.random() * owners.length)]);
    }

    const [products, categories] = await GetProducts();
    products.forEach(modifyProduct);

    // createUsers();
    console.log(products);
    console.log(categories);
    run(products).catch(console.dir);

}())

