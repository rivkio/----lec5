import { IProductInput } from "../@types/@types";

const users = [
    {
        isAdmin: true,
        cart: [],
        name: {
            first: "RivkiO",
            middle: "",
            last: "Oz",
        },
        phone: "0507123012",
        email: "rivkio@gmail.com",
        password: "Abc!123Abc",
        address: {
            state: "IL",
            country: "Israel",
            city: "Tel aviv",
            street: "Shoham",
            houseNumber: 5,
            zip: "8920435",
        },
        isBusiness: true,
    },
    {
        isAdmin: false,
        cart: [],
        name: {
            first: "Avi",
            middle: "",
            last: "Oz",
        },
        phone: "0507123013",
        email: "avi@gmail.com",
        password: "Abc!123Abc",
        address: {
            state: "IL",
            country: "Israel",
            city: "Ramat gan",
            street: "Shoham",
            houseNumber: 6,
            zip: "8920436",
        },
        isBusiness: true,
    },
    {
        isAdmin: false,
        cart: [],
        name: {
            first: "Dassi",
            middle: "",
            last: "Madmon",
        },
        phone: "0507123014",
        email: "dassi@gmail.com",
        password: "Abc!123Abc",
        address: {
            state: "IL",
            country: "Israel",
            city: "Holon",
            street: "Shoham",
            houseNumber: 7,
            zip: "8920437",
        },
        isBusiness: false,
    },
];
const products: IProductInput[] = [
    {
        productName: "Classic Blue Jeans",
        subtitle: "Versatile and stylish blue jeans",
        productDescription: "Timeless slim-fit blue jeans made from durable denim. Features button and zipper closure. Perfect for everyday wear.",
        image: {
            url: "https://apinodeproject-2.onrender.com/uploads/11.png",
        },
        alt: "Classic Blue Jeans",
        variants: [
            { size: "2", quantity: 20, price: 170 },
            { size: "4", quantity: 20, price: 170 },
            { size: "6", quantity: 20, price: 170 },
            { size: "8", quantity: 20, price: 170 },
        ],
    },
    {
        productName: "Checked Button-Up Shirt",
        subtitle: "Classic checked pattern shirt",
        productDescription: "A timeless checked button-up shirt made from soft, durable fabric. Ideal for casual and smart-casual looks.",
        image: {
            url: "https://apinodeproject-2.onrender.com/uploads/6.png",
        },
        alt: "Checked Button-Up Shirt",
        variants: [
            { size: "2", quantity: 20, price: 150 },
            { size: "4", quantity: 20, price: 150 },
            { size: "6", quantity: 20, price: 150 },
            { size: "8", quantity: 20, price: 150 },
        ],
    },
    {
        productName: "Girls' Elegant Dress",
        subtitle: "Stylish dress for special occasions",
        productDescription: "Elegant girls' dress with a round neckline and flared skirt, made from soft jersey fabric. Perfect for formal events..",
        image: {
            url: "https://apinodeproject-2.onrender.com/uploads/8.png",
        },
        alt: "Girls' Elegant Dress",
        variants: [
            { size: "2", quantity: 20, price: 210 },
            { size: "4", quantity: 20, price: 210 },
            { size: "6", quantity: 20, price: 210 },
            { size: "8", quantity: 20, price: 210 },
        ],
    },
    {
        productName: "Long Sleeves Cozy Top",
        subtitle: "Comfortable and stylish long sleeves top",
        productDescription: "This cozy long sleeve top is made from soft, breathable fabric,  making it a versatile wearing on its own. Perfect for cooler weather.",
        image: {
            url: "https://apinodeproject-2.onrender.com/uploads/13.png",
        },
        alt: "Long Sleeve Cozy Top",
        variants: [
            { size: "2", quantity: 20, price: 160 },
            { size: "4", quantity: 20, price: 160 },
            { size: "6", quantity: 20, price: 160 },
            { size: "8", quantity: 20, price: 160 },
        ],
    },
    {
        productName: "Chic Flared Sleeve Top",
        subtitle: "Stylish top with elegant flared sleeves",
        productDescription: "Chic top with flared sleeves and a relaxed fit. Made from breathable fabric, perfect for casual occasions. Available in various sizes.",
        image: {
            url: "https://apinodeproject-2.onrender.com/uploads/15.png",
        },
        alt: "Chic Flared Sleeve Top",
        variants: [
            { size: "2", quantity: 20, price: 140 },
            { size: "4", quantity: 20, price: 140 },
            { size: "6", quantity: 20, price: 140 },
            { size: "8", quantity: 20, price: 140 },
        ],
    },
    {
        productName: "Girls' Denim Dress",
        subtitle: "Chic and durable denim dress for girls",
        productDescription: "Stylish denim dress with short sleeves, and an adjustable belt. Made from high-quality denim fabric, suitable for everyday wear.",
        image: {
            url: "https://apinodeproject-2.onrender.com/uploads/7.png",
        },
        alt: "Girls' Denim Dress",
        variants: [
            { size: "2", quantity: 20, price: 180 },
            { size: "4", quantity: 20, price: 180 },
            { size: "6", quantity: 20, price: 180 },
            { size: "8", quantity: 20, price: 180 },
        ],
    },
    {
        productName: "Floral Summer Dress for Girls",
        subtitle: "Light and comfortable summer dress",
        productDescription: "Summer dress made of 100% cotton with a colorful floral print, long sleeves, and an A-line silhouette. Features a back button closure.",
        image: {
            url: "https://apinodeproject-2.onrender.com/uploads/12.png",
        },
        alt: "Floral Summer Dress",
        variants: [
            { size: "2", quantity: 20, price: 150 },
            { size: "4", quantity: 20, price: 150 },
            { size: "6", quantity: 20, price: 150 },
            { size: "8", quantity: 20, price: 150 },
        ],
    },
    {
        productName: "Kids' Collared Shirt",
        subtitle: "Comfortable and stylish collared shirt",
        productDescription: "Breathable cotton collared shirt for kids. Perfect for casual and formal occasions. Available in various sizes.",
        image: {
            url: "https://apinodeproject-2.onrender.com/uploads/16.png",
        },
        alt: "Kids' Collared Shirt",
        variants: [
            { size: "2", quantity: 20, price: 130 },
            { size: "4", quantity: 20, price: 130 },
            { size: "6", quantity: 20, price: 130 },
            { size: "8", quantity: 20, price: 130 },
        ],
    },
    {
        productName: "Simple White T-Shirt",
        subtitle: "Basic white tee",
        productDescription: "Comfortable and versatile white t-shirt with short sleeves. Made from soft, breathable cotton. Perfect for everyday wear.",
        image: {
            url: "https://apinodeproject-2.onrender.com/uploads/10.png",
        },
        alt: "Simple White T-Shirt",
        variants: [
            { size: "2", quantity: 30, price: 99 },
            { size: "4", quantity: 25, price: 99 },
            { size: "6", quantity: 20, price: 99 },
            { size: "8", quantity: 15, price: 99 },
        ],
    },
];

export { users, products };