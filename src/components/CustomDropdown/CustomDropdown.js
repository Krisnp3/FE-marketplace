import { useEffect, useState } from 'react';
import styles from './CustomDropdown.module.css';
import Constants from '../../Global';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
    marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    
    '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
    },
}));
  

export default function CustomDropdown({onChange ,style, disabled, initialValue, placeholder, canSearch, options, dropdownHeight, width}) {

    const [value, setValue] = React.useState(initialValue?? placeholder?? '');
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    useEffect(() => {
        if (onChange) {
            onChange(value);
        }
    }, [value])

    return (
    <div>
        <FormControl variant="standard"
            className={styles.customInput}
            style={{...style, maxHeight: dropdownHeight, width: width}}
        >
            <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={value}
                onChange={handleChange}
                input={<BootstrapInput />}
                placeholder={placeholder}
                style={{textAlign: 'left'}}
                classes={{icon:classes.icon, iconOpen:classes.iconOpen,select:classes.selectSelect}}
        
            >
                <MenuItem value={placeholder}>
                    {placeholder}
                </MenuItem>
                {options.map((e, index) => {
                    return (
                        <MenuItem value={e}>
                            {e}
                        </MenuItem>
                    )
                })}
            </Select>
        </FormControl>
        
    </div>
    );
}