const getItemInCartIndex = (items, id) =>
    items.findIndex((item) => item.id === id);

const addItemToCart = (state, action) => {
    const newTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
    const itemInCartIndex = getItemInCartIndex(state.items, action.item.id);
    let newItems;
    if (itemInCartIndex === -1) {
        newItems = state.items.concat(action.item);
    } else {
        const updatedItems = [...state.items];
        updatedItems[itemInCartIndex].amount =
            updatedItems[itemInCartIndex].amount + action.item.amount;
        newItems = [...updatedItems];
    }

    return {
        items: newItems,
        totalAmount: newTotalAmount,
    };
};

const removeItemFromCart = (state, action) => {
    const itemInCartIndex = getItemInCartIndex(state.items, action.id);
    if (itemInCartIndex === -1) {
        return;
    }
    let updatedItems;

    if (state.items[itemInCartIndex].amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
        state.items[itemInCartIndex].amount--;
        updatedItems = [...state.items];
    }

    return {
        items: updatedItems,
        totalAmount: state.totalAmount - state.items[itemInCartIndex].price,
    };
};

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            return addItemToCart(state, action);
        case "REMOVE_ITEM":
            return removeItemFromCart(state, action);
        case "CLEAR":
            return defaultCartState;
        default:
            return defaultCartState;
    }
};

export default cartReducer;
