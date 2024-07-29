import Product from '../db/models/product-model';
import { ICart, ICartWithTotals } from '../@types/@types';
import CartModel from '../db/models/cart-model';
import BizProductsError from '../errors/BizProductsError';


export const cartService = {
    getCartById: async (userId: string): Promise<ICartWithTotals | null> => {
        try {
            const cart = await CartModel.findOne({ userId }).populate('items.variantId');

            if (!cart) {
                return null;
            }
            // חישוב כמות מוצרים סך הכל והמחיר של כל המוצרים יחד
            const totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
            const totalPrice = cart.items.reduce((total, item) => total + (item.quantity * item.price), 0);

            // הוספת חישובים למידע המוחזר
            return {
                ...cart.toObject(),
                totalQuantity,
                totalPrice
            } as ICartWithTotals; // שינוי טיפוס המידע המוחזר

        } catch (error) {
            console.error("Error fetching cart:", error); // Debugging
            throw new BizProductsError(400, 'Error fetching cart');
        }
    },


    addProductToCart: async (
        userId: string,
        productId: string,
        variantId: string,
        quantity: number,
        size: string

    ): Promise<ICart | null> => {
        // First, find the cart for the user
        let cart = await CartModel.findOne({ userId });

        // Check if the product exists in the database
        const product = await Product.findById(productId);
        if (!product) {
            throw new BizProductsError(404, 'Product not found');
        }

        const variant = product.variants.find(v => v._id.toString() === variantId);
        if (!variant) {
            console.error(`Variant not found for variantId: ${variantId}`);
            throw new BizProductsError(404, 'Variant not found');
        }

        // If no cart exists, create a new cart
        if (!cart) {
            cart = new CartModel({
                userId,
                items: [
                    {
                        productId,
                        variantId,
                        quantity,
                        size,
                        productName: product.productName,
                        price: variant.price,
                        image: product.image
                    },
                ],
            });
        }
        // If the cart exists, check if the product already exists in the cart
        else {
            const itemIndex = cart.items.findIndex(
                item => item.productId === productId && item.size === size && item.variantId === variantId
            );

            // If the product exists, update the quantity
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            }

            // If the product does not exist, add it to the cart
            else {
                cart.items.push({
                    productId,
                    variantId,
                    quantity,
                    size,
                    productName: product.productName,
                    price: variant.price,
                    image: product.image
                });
            }
        }
        // Save the cart to the database
        await cart.save();
        return cart;
    },


    removeProductFromCart: async (userId: string, variantId: string): Promise<ICart | null> => {
        // מצא את העגלה על פי userId
        const cart = await CartModel.findOne({ userId });

        if (!cart) {
            throw new BizProductsError(404, 'Cart not found');
        }
        // סנן את המוצרים כדי להסיר את כל המוצרים עם אותו variantId
        cart.items = cart.items.filter((item) => item.variantId !== variantId);

        await cart.save();
        return cart;
    },


    //update quantity in cart
    updateQuantityInCart: async (userId: string, productId: string, variantId: string, quantity: number): Promise<ICart | null> => {
        const cart = await CartModel.findOne({ userId });
        if (!cart) {
            throw new BizProductsError(404, 'Cart not found');
        }
        const itemIndex = cart.items.findIndex((item) => item.variantId === variantId);
        if (itemIndex === -1) {
            throw new BizProductsError(404, 'Product not found in cart');
        }
        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        return cart;
    },


    clearCart: async (userId: string): Promise<ICart | null> => {
        const cart = await CartModel.findOne({ userId });

        if (!cart) {
            throw new BizProductsError(404, 'Cart not found');
        }

        cart.items = [];
        await cart.save();
        return cart;
    },


};

