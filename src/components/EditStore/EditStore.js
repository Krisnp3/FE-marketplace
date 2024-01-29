import Button from '../Button/Button';
import CustomTextInput from '../CustomTextInput/CustomTextInput';
import CustomDropdown from '../CustomDropdown/CustomDropdown';
import styles from './EditStore.module.css';
import Constants from '../../Global';

export default function EditStore({onChange, storeData, removeStore}) {

    const onClickAdd = () => {
        if (onChange) {
            onChange();
        }
    }

    const onClickRemove = () => {
        if (onChange) {
            onChange();
        }
    }

    const onClickCancel = () => {
        if (onChange) {
            onChange();
        }
    }
    
    const onChangeMarketplace = () => {

    }

    const onChangeApiKey = () => {

    }

    const onChangeStoreName = () => {

    }

    return (
        <div className={styles.container}>
            <div className={styles.editStore}>
                <div className={styles.editItemCol}>
                    <div className={styles.editItemTitle}>
                        MARKETPLACE
                    </div>
                    <CustomDropdown onChange={onChangeMarketplace}
                                    disabled={removeStore}
                                    initialValue={storeData["MARKETPLACE"]?? ""}
                                    canSearch={false}
                                    options={Constants.dummyMarketplace}
                    />
                </div>
                <div className={styles.editItemCol}>
                    <div className={styles.editItemTitle}>
                        API KEY
                    </div>
                    <CustomTextInput onChange={onChangeApiKey}
                                    disabled={removeStore}
                                    initialValue={storeData["API KEY"]?? ""}
                    />
                </div>
                <div className={styles.editItemCol}>
                    <div className={styles.editItemTitle}>
                        STORE NAME
                    </div>
                    <CustomTextInput onChange={onChangeStoreName}
                                    disabled={removeStore}
                                    initialValue={storeData["STORE NAME"]?? ""}
                    />
                </div>
                <div className={styles.buttonRow}>
                    {removeStore?
                        <Button text={"Remove Store"} onClick={onClickRemove}/>
                        :
                        <Button text={"Add"} onClick={onClickAdd}/>
                    }
                    <Button text={"Cancel"} onClick={onClickCancel}/>

                </div>
            </div>
        </div>
    )
}