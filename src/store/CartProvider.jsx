import { useReducer } from "react";
import CartContext from "./cart-context";
import cartReducer from "./cart-reducer";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

function CartProvider(props) {
    const [cartState, cartDispatcher] = useReducer(
        cartReducer,
        defaultCartState
    );
    const addItemHandler = (item) => {
        cartDispatcher({ type: "ADD_ITEM", item });
    };
    const removeItemHandler = (id) => {
        cartDispatcher({ type: "REMOVE_ITEM", id });
    };
    const clearHandler = () => {
        cartDispatcher({ type: "CLEAR" });
    };
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearCart: clearHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;
