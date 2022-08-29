import { forwardRef } from "react";
import styles from "./Input.module.css";

function Input({ id, label, ...props }, ref) {
    return (
        <div className={styles.input}>
            {label && <label htmlFor={id}>{label}</label>}
            <input id={id} {...props} ref={ref} />
        </div>
    );
}

export default forwardRef(Input);
