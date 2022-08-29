import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

function Backdrop(props) {
    return <div className={styles.backdrop} onClick={props.onClick} />;
}

function ModalOverlay(props) {
    return (
        <article className={styles.modal}>
            <div>{props.children}</div>
        </article>
    );
}

const overlayRoot = document.getElementById("overlay-root");

function Modal(props) {
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop onClick={props.onBackdropClick} />,
                overlayRoot
            )}
            {ReactDOM.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                overlayRoot
            )}
        </>
    );
}

export default Modal;
