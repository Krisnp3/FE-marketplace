import styles from './Button.module.css';

export default function Button({text, style, onClick, onHover}) {


    return (
        <div className={styles.container} style={style} onClick={onClick} onMouseEnter={onHover}> 
            {text}
        </div>
    )
}