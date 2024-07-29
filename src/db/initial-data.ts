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
        productName: "Floral Summer Dress for Girls",
        subtitle: "Light and comfortable summer dress",
        productDescription: "Light and comfortable summer dress made of 100% high-quality cotton with a colorful floral print. The dress features short sleeves and an A-line silhouette, perfect for hot summer days. Convenient back button closure.",
        image: {
            url: "http://localhost:8080/uploads/1721909152360-Floral-Summer-Dress-for-Girls.png",
        },
        alt: "Floral Summer Dress",
        variants: [
            { size: "2", quantity: 20, price: 222 },
            { size: "4", quantity: 20, price: 222 },
            { size: "6", quantity: 20, price: 222 },
            { size: "8", quantity: 20, price: 222 },
        ],
    },
    {
        productName: "Kids' T-Shirt",
        subtitle: "Light and comfortable kids' t-shirt",
        productDescription: "Light and comfortable kids' t-shirt made of 100% breathable cotton with a subtle star print. The t-shirt comes in various colors with short sleeves, suitable for all seasons.",
        image: {
            url: "http://localhost:8080/uploads/1721908523774-Kids'T-Shirt.png",
        },
        alt: "Kids' T-Shirt",
        variants: [
            { size: "2", quantity: 20, price: 222 },
            { size: "4", quantity: 20, price: 222 },
            { size: "6", quantity: 20, price: 222 },
            { size: "8", quantity: 20, price: 222 },
        ],
    },
    {
        productName: "Kids' Shorts",
        subtitle: "Shorts made of soft and comfortable cotton",
        productDescription: "Shorts made of 100% soft and comfortable cotton, with side pockets and a drawstring waist for perfect fit. Available in various colors, suitable for summer activities and outdoor play.",
        image: {
            url: "http://localhost:8080/uploads/1721810118501-Kids'Shorts.png",
        },
        alt: "Kids' Shorts",
        variants: [
            { size: "2", quantity: 20, price: 222 },
            { size: "4", quantity: 20, price: 222 },
            { size: "6", quantity: 20, price: 222 },
            { size: "8", quantity: 20, price: 222 },
        ],
    },
    {
        productName: "Waterproof Kids' Rain Boots",
        subtitle: "Comfortable and durable rain boots",
        productDescription: "High-quality waterproof rain boots designed for kids. These boots are made from durable rubber material, featuring a comfortable lining and a non-slip sole. Perfect for keeping little feet dry during rainy days. Available in a variety of fun colors.",
        image: {
            url: "http://localhost:8080/uploads/1721810002900-Waterproof-Kids'Rain-Boots.png",
        },
        alt: "Waterproof Kids' Rain Boots",
        variants: [
            { size: "22", quantity: 20, price: 222 },
            { size: "24", quantity: 20, price: 222 },
            { size: "26", quantity: 20, price: 222 },
            { size: "28", quantity: 20, price: 222 },
        ],
    },
    {
        productName: "Eco-friendly sandals",
        subtitle: "Lightweight and breathable sandals",
        productDescription: "High-quality eco-friendly sandals designed for kids. These sandals are made from sustainable materials, featuring a comfortable footbed and adjustable straps. Perfect for keeping little feet cool and comfortable during summer days. Available in a variety of vibrant colors.",
        image: {
            url: "http://localhost:8080/uploads/1721809608552-Kids'Sandals.png",
        },
        alt: "Eco-friendly sandals",
        variants: [
            { size: "22", quantity: 20, price: 222 },
            { size: "24", quantity: 20, price: 222 },
            { size: "26", quantity: 20, price: 222 },
            { size: "28", quantity: 20, price: 222 },
        ],
    },
    {
        productName: "Kids' Insulated Jacket",
        subtitle: "Warm and cozy insulated jacket for kids",
        productDescription: "This high-quality insulated jacket is designed to keep kids warm and comfortable in cold weather. Made from durable and eco-friendly materials, it features a soft inner lining, a hood, and zippered pockets. Available in various sizes and colors, perfect for outdoor activities during the winter season.",
        image: {
            url: "http://localhost:8080/uploads/1721809737798-Kids'Insulated-Jacket.png",
        },
        alt: "Kids' Shorts",
        variants: [
            { size: "2", quantity: 20, price: 222 },
            { size: "4", quantity: 20, price: 222 },
            { size: "6", quantity: 20, price: 222 },
            { size: "8", quantity: 20, price: 222 },
        ],
    },
];

export { users, products };