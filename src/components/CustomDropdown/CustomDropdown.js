import { useEffect, useState } from 'react';
import styles from './CustomDropdown.module.css';
import Constants from '../../Global';

export default function CustomDropdown({onChange ,style, disabled, initialValue, placeholder, canSearch, options, dropdownHeight}) {
    const [value, setValue] = useState(initialValue);
    const [optionsShown, setOptionsShown] = useState(options);

    const [dropdownShow, setDropdownShow] = useState(false);

    let blurTimeout = null;

    useEffect(() => {

    }, [])
    
    useEffect(() => {
        console.log("options: ", options)
        setOptionsShown(options)
    }, [options])

    const onChangeValue = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
        setValue(e.target.value);
    }

    const onClickOption = (option) => {
        console.log(option)
        clearTimeout(blurTimeout);
        if (onChange) {
            onChange(option);
        }
        setValue(option)
    }

    const onClickDropdown = () => {
        setDropdownShow(true);
    }

    const onUnfocus = () => {
        blurTimeout = setTimeout(() => {
            setDropdownShow(false);            
        }, 100);
    }

    const onClickDropdownIcon = () => {
        setDropdownShow(!dropdownShow);
    }

    return (
        <div className={styles.container} onFocus={onClickDropdown} onBlur={onUnfocus}>
            <input className={styles.customInput}
                    style={style}
                    onChange={onChangeValue}
                    // disabled={!canSearch || disabled}
                    value={value}
                    placeholder={placeholder}
                    // onFocus={onClickDropdown}
                    // onBlur={onUnfocus}
            />
            <img src='/assets/icons/left-arrow-icon.svg' 
                className={styles.dropdownIcon}
                // onClick={onClickDropdownIcon}
            />
            {dropdownShow?
                <div className={styles.dropdownCon} style={{maxHeight: dropdownHeight}}>
                    {optionsShown?.map((e, index) => {
                        return (
                            <div className={styles.dropdownItem} onClick={() => {console.log('click'); onClickOption(e)}}>
                                {e}
                            </div>    
                        )
                    })}
                </div>
                :null
            }
            
        </div>
    )
}