export type IName = {
    first: string;
    middle?: string;
    last: string;
};

export type IAddress = {
    street: string;
    city: string;
    state?: string;
    zip?: string;
    country: string;
    houseNumber: number;
};

export type IImage = {
    alt: string;
    url: string;
};

export type IUserInput = {
    email: string;
    phone: string;
    password: string;
    isBusiness: boolean;
    address: IAddress;
    name: IName;
    image?: IImage;
};

export type IUser = IUserInput & {
    createdAt: Date;
    isAdmin: boolean;
    orders: object[];
};

export type ILogin = {
    email: string;
    password: string
};

export type IJWTPayload = {
    _id: string,
    isAdmin: boolean,
    isBusiness: boolean
};

export type IProductInput = {
    productName: string;
    subtitle: string;
    productDescription: string;
    price: number;
    color: string;
    sizes: number[];
    model: string;
    ages: number[];
    web: string;
    image: IImage;
    category: string;
    quantity: number;
};

export type IProduct = IProductInput & {
    productId: string,
    barcode: number,
    createdAt: Date,
    shoppingCart: string[],
    quantity: number,
    sold: number,
    userId: string,
};

export type IIsBusiness = {
    isBusiness: boolean
};



export type IOrderProduct = {
    productId: string;
    quantity: number;
    age: number;
    productName: string;
    price: number;
    barcode: number;
};

export type IOrder = {
    userId: string;
    products: IOrderProduct[];
    totalAmount: number;
    status: string;
    createdAt: Date;
    orderNumber: string;
};


export interface SalesByDateQuery {
    startDate: string;
    endDate: string;
};