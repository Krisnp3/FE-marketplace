import { useEffect, useState } from 'react';
import styles from './CustomDateInputRange.module.css';
import Constants from '../../Global';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

export default function CustomDateInputRange({onChange ,style, disabled, initialValue, placeholder, canSearch, options, dropdownHeight}) {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [optionsShown, setOptionsShown] = useState(options);

    useEffect(() => {

    }, [])
    
    useEffect(() => {
        console.log("options: ", options)
        setOptionsShown(options)
    }, [options])

    const onChangeValue = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end)
        if (onChange) {
            onChange(start, end);
        }
    }

    return (
        <div className={styles.container}>
            {/* <input type='date'
                    className={styles.customInput}
                    style={style}
                    onChange={onChangeValue}
                    value={value}
                    placeholder={placeholder}
            /> */}
            <ReactDatePicker
                    className={styles.customInput}
                    selected={startDate}
                onChange={onChangeValue}
                selectsRange
                showIcon
                startDate={startDate}
                endDate={endDate}
                disabled={disabled}
                // inline
            />
        </div>
    )
}