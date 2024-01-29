import Button from '../../components/Button/Button';
import styles from './SubscriptionOver.module.css';

export default function SubscriptionOver({}) {
    const backToLogin = () => {
        window.location.assign("/");
    }

    return (
        <div className={styles.container}>
            <div className={styles.subsOver}>
                <div className={styles.title}>
                    Subscription Over
                </div>
                <div className={styles.desc}>
                    Sorry, but your subscription period is over :{"("} <br/>
                    Please contact us to extend your subscription
                </div>
                <Button text={"Back to Login"}
                        onClick={backToLogin}
                />
            </div>
        </div>
    )
}