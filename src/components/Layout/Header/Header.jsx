import meals from "../../../assets/meals.jpg";
import styles from "./Header.module.css";

import HeaderCartButton from "./HeaderCartButton/HeaderCartButton";

function Header(props) {
    return (
        <>
            <header className={styles.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton
                    label="Your Cart"
                    onClick={props.onShowCart}
                />
            </header>
            <div className={styles["main-image"]}>
                <img src={meals} alt="React Meals" />
            </div>
        </>
    );
}

export default Header;
