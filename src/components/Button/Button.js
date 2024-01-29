import styles from './Button.module.css';

export default function Button({text, style, onClick, onHover, disabled}) {

    const onClickBtn = () => {
        if (!disabled) {
            onClick();
        } 
    }

    return (
        <div className={styles.container} style={style} onClick={onClickBtn} onMouseEnter={onHover}> 
            {text}
        </div>
    )
}