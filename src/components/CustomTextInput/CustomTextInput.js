import { useState } from 'react';
import styles from './CustomTextInput.module.css';

export default function CustomTextInput({onChange ,style, disabled, initialValue, placeholder}) {
    const [value, setValue] = useState(initialValue);

    const onChangeValue = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
        setValue(e.target.value);
    }

    return (
        <input className={styles.customInput}
                style={style}
                onChange={onChangeValue}
                disabled={disabled}
                value={value}
                placeholder={placeholder}
        />
    )
}