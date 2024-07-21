import { Schema } from 'mongoose';
import { ICart } from '../../@types/@types';
// import { cartItemSchema } from './cartItem-schema';


export const cartSchema = new Schema<ICart>({
    userId: { type: String, required: true },
    items: [{
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        productName: { type: String, required: true },
        price: { type: Number, required: true },
        size: { type: Number, required: true }
    }]
});


