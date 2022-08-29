import { useContext } from "react";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
import formatPrice from "../../../utils/format-price";

function MealItem({ name, description, price, id }) {
    const onAddToCartHandler = (amount) => {
        cartContext.addItem({
            amount,
            id,
            name,
            price,
        });
    };
    const cartContext = useContext(CartContext);

    return (
        <li className={styles.meal}>
            <div>
                <h3>{name}</h3>
                <div className={styles.description}>{description}</div>
                <div className={styles.price}>{formatPrice(price)}</div>
            </div>
            <div>
                <MealItemForm id={id} onAddToCart={onAddToCartHandler} />
            </div>
        </li>
    );
}

export default MealItem;
