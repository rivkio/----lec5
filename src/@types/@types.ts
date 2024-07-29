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
    url: string;
};

export type IUserInput = {
    email: string;
    phone: string;
    password: string;
    address: IAddress;
    name: IName;
};

export type IUser = IUserInput & {
    _id?: string;
    createdAt: Date;
    isAdmin: boolean;
    cart?: ICart[];
};

// טיפוס עבור גרסאות של מוצר
export type IVariant = {
    _id?: string;
    size: string;
    quantity: number;
    price: number;
};

// טיפוס עבור פריט בעגלת קניות
export interface ICartItem {
    productId: string;
    variantId: string;
    productName: string;
    price: number;
    size: string;
    quantity: number;
    image: IImage;
}

export interface ICart {
    userId: string;
    items: ICartItem[];
}

export interface ICart extends Document {
    userId: string; 
    items: ICartItem[];
};

export interface ICartWithTotals extends ICart {
    totalQuantity: number;
    totalPrice: number;
};

export type ILogin = {
    email: string;
    password: string
};

export type IJWTPayload = {
    _id: string,
    isAdmin: boolean,
};


export type IProductInput = {
    productName: string;
    subtitle: string;
    productDescription: string;
    // price: number;
    // color: string;
    // sizes: string[];
    // model: string;
    image?: IImage;
    alt: string;
    // category: string;
    // quantity: number;
    variants: IVariant[];
};

export type IProduct = IProductInput & {
    _id: string;
    barcode: number,
    createdAt: Date,
    shoppingCart: string[],
    // quantity: number,
    sold: number,
    userId: string,
};


// export type IIsBusiness = {
//     isBusiness: boolean
// };


export type IOrderProduct = {
    productId: string;
    quantity: number;
    size: string;
    productName: string;
    price: number;
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



export type IUpdateUserType = {
    name: {
        first: string;
        middle: string;
        last: string;
    };
    phone: string;
    address: {
        state: string;
        country: string;
        city: string;
        street: string;
        houseNumber: number;
        zip: number;
    };
};


