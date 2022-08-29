import classes from "./CartItem.module.css";
import formatPrice from "../../../utils/format-price";

const CartItem = (props) => {
    return (
        <li className={classes["cart-item"]}>
            <div>
                <h2>{props.name}</h2>
                <div className={classes.summary}>
                    <span className={classes.price}>
                        {formatPrice(props.price)}
                    </span>
                    <span className={classes.amount}>x {props.amount}</span>
                </div>
            </div>
            <div className={classes.actions}>
                <button onClick={props.onRemove}>−</button>
                <button onClick={props.onAdd}>+</button>
            </div>
        </li>
    );
};

export default CartItem;
