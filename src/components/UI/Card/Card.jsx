import styles from "./Card.module.css";

function Card({ as, children, className, ...props }) {
  const Tag = as || "div";

  const cardClassName = className ? `${className} ${styles.card}` : styles.card;

  return (
    <Tag {...props} className={cardClassName}>
      {children}
    </Tag>
  );
}

export default Card;
