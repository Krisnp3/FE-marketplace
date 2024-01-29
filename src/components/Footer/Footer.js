import styles from './Footer.module.css';

export default function Footer({}) {

    return (
        <div className={styles.container}>
            <div className={styles.footer}> 
                <div className={styles.copyright}>
                    Copyright © 2023 Devdat.ai All Rights Reserved.
                </div>
            </div>
        </div>
    )
}