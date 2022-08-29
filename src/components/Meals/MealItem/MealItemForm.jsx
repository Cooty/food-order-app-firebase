import { useRef, useState } from "react";
import Input from "../../UI/Input/Input";
import styles from "./MealItemForm.module.css";

const maxOrderAmount = 5;
const defaultValue = 1;
const validateInput = (value) =>
    value.length !== 0 && value <= maxOrderAmount && value >= defaultValue;

function MealItemForm({ id, onAddToCart }) {
    const inputRef = useRef();
    const [isValid, setIsValid] = useState(true);
    const submitHandler = (e) => {
        e.preventDefault();
        const value = +inputRef.current.value.trim();

        if (!validateInput(value)) {
            setIsValid(false);
            return;
        }
        setIsValid(true);
        onAddToCart(value);
        inputRef.current.value = defaultValue;
    };

    return (
        <form className={styles.form} onSubmit={submitHandler} noValidate>
            <Input
                ref={inputRef}
                type="number"
                label="Amount"
                id={`amount_${id}`}
                min={defaultValue}
                max={maxOrderAmount}
                step={1}
                defaultValue={defaultValue}
            />
            <button type="submit">+ Add</button>
            {!isValid && <p>Please enter a valid amount (1-5)</p>}
        </form>
    );
}

export default MealItemForm;
