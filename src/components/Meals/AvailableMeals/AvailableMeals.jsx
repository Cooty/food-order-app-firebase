import useSWR from "swr";
import styles from "./AvailableMeals.module.css";
import Card from "../../UI/Card/Card";
import MealItem from "../MealItem/MealItem";

const fetcher = (url) => fetch(url).then((res) => res.json());

function AvailableMeals() {
    const { data, error } = useSWR(
        `${import.meta.env.VITE_DB_URL}/meals.json`,
        fetcher
    );

    return (
        <Card className={styles.meals} as="section">
            {error && <p>Something went wrong! :(</p>}
            {!data && !error && <p>Loading...</p>}
            {!error && data ? (
                <ul>
                    {Object.keys(data).map((key) => (
                        <MealItem
                            key={key}
                            name={data[key].name}
                            description={data[key].description}
                            price={data[key].price}
                            id={key}
                        />
                    ))}
                </ul>
            ) : null}
        </Card>
    );
}

export default AvailableMeals;
