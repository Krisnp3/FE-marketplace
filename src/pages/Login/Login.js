import { useState } from 'react';
import Button from '../../components/Button/Button';
import styles from './Login.module.css';
import axios from 'axios';

export default function Login({}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onLogin = () => {
        if (!checkData()) {
            return;
        }
        let data = {
            email: email,
            password: password
        }

        // axios

        window.location.assign('/stores')
    }

    const checkData = () => {

        return true;
    }

    return (
        <div className={styles.container}>
            <div className={styles.login}>
                <div className={styles.title}>
                    Login
                </div>
                <div className={styles.formInput}>
                    <div className={styles.inputTitle}>
                        Username
                    </div>
                    <input className={styles.input}
                            value={email}
                            onChange={onChangeEmail}
                    />
                </div>
                <div className={styles.formInput}>
                    <div className={styles.inputTitle}>
                        Password
                    </div>
                    <input className={styles.input}
                            value={password}
                            onChange={onChangePassword}
                            type='password'
                    />
                </div>
                <Button text={"Login"}
                        style={{
                            marginTop: '20px'
                        }}
                        onClick={onLogin}
                />
            </div>
        </div>
    )
}