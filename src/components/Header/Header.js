import globalStyles from '../../GlobalStyles.module.css';
import styles from './Header.module.css';


export default function Header({}) {

    const onClickLogo = () => {
        window.location.assign('/stores');
    }

    const onClickLogout = () => {
        window.location.assign('/');
    }

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <div className={styles.leftNavbar}>
                    <div className={styles.title} onClick={onClickLogo}>
                        Marketplace Analytics Hub
                    </div>
                </div>
                <div className={styles.rightNavbar}>
                    <div className={styles.helloUser}>
                        Hello, Admin
                    </div>
                    <img src='/assets/icons/profile-icon.svg' onClick={onClickLogout}/>
                </div>
            </div>
        </div>
    )
}