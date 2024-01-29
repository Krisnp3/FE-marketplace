import styles from './Card.module.css';

export default function Card({children, appearDelay, width, height, minHeight}) {

    return (
        <div className={styles.container}
            style={{animationDelay: appearDelay, width: width, height: height, minHeight: minHeight}}
        >
            <div className={styles.animatedChild}>
                {children}
            </div>
        </div>
    )

}