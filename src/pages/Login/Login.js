import { useState } from 'react';
import Button from '../../components/Button/Button';
import styles from './Login.module.css';
import axios from 'axios';
import Api from '../../helper/ApiCalls/Api';

export default function Login({}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onLogin = () => {
        setIsLoading(true);
        if (!checkData()) {
            setIsLoading(false);
            return;
        }
        let data = {
            email: email,
            password: password
        }

        // axios
        // Api.apiPost('/login', data, onLoginSuccess, onLoginFailed, false, 'application/json');

        setTimeout(() => {
            onLoginSuccess([]);
        }, 2000);
    }

    const onLoginSuccess = (res) => {
        setIsLoading(false)
        window.location.assign('/stores')
    }

    const onLoginFailed = (err) => {
        setIsLoading(false)
    }

    const checkData = () => {
        if (email) {

        } else {
            return false;
        }

        if (password) {
            
        } else {
            return false;
        }

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
                <Button text={isLoading? <img src='/assets/loading/loading-white.png' height={24}/> : "Login"}
                        style={{
                            marginTop: '20px'
                        }}
                        onClick={onLogin}
                        disabled={isLoading}
                />
            </div>
        </div>
    )
}