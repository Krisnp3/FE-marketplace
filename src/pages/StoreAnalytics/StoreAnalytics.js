import { useEffect, useState } from 'react';
import styles from './StoreAnalytics.module.css';
import Button from '../../components/Button/Button';
import Stores from '../Stores/Stores';
import AnalyticsPage from './AnalyticsPage/AnalyticsPage';
import Constants from '../../Global';
import CustomDropdown from '../../components/CustomDropdown/CustomDropdown';
import CustomDateInputRange from '../../components/CustomDateInputRange/CustomDateInputRange';

export default function StoreAnalytics({}) {
    const dummyIframe1 = "https://lookerstudio.google.com/embed/reporting/4285d3d5-ae92-4510-aa1e-64048d24f63c/page/p_e3y21sun3c";
    const dummyIframe2 = "https://lookerstudio.google.com/embed/reporting/9e79c233-cfdf-479a-8d96-6647bf77f441/page/p_e3y21sun3c";

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [kecamatan, setKecamatan] = useState([]);
    const [kelurahan, setKelurahan] = useState([]);

    const [filterProvince, setFilterProvince] = useState([]);
    const [filterCity, setFilterCity] = useState([]);
    const [filterKecamatan, setFilterKecamatan] = useState([]);
    const [filterKelurahan, setFilterKelurahan] = useState([]);

    const [firstIframe, setFirstIframe] = useState(dummyIframe1)
    const [secondIframe, setSecondIframe] = useState("")
    const [isComparison, setIsComparison] = useState(false);

    useEffect(() => {
       getProvinces();
    }, [])

    useEffect(() => {        
        // console.log("provinces", provinces)
    }, [provinces])

    useEffect(() => {
        for (let i = 0; i < filterProvince; i++) {
            getCities();
        }
    }, [filterProvince])

    const onClickCompare = () => {
        setIsComparison(true);
    }

    const onClickCancel = () => {
        setIsComparison(false);
    }

    const onComparisonDataUpdate = (data) => {
        setIsComparison(false);
        setSecondIframe(dummyIframe2);
    }

    const getProvinces = async () => {
        Constants.getProvinces(setProvinces.bind(this))
    }

    const getCities = async () => {
        Constants.getCities(setCities.bind(this))
    }

    const onChooseProvince = (option) => {
        setFilterProvince([option])
    }

    return (
        <div>
            <div className={styles.topBar}>
                <div className={styles.filterCon}>
                    <CustomDropdown options={provinces.map((e) => {return e.text})} 
                                    placeholder={"Province"}
                                    dropdownHeight={300}
                                    onChange={onChooseProvince}
                                    width={150}
                    />
                    <CustomDropdown options={cities.map((e) => {return e.text})} 
                                    placeholder={"City"}
                                    dropdownHeight={300}
                                    width={150}
                    />
                    <CustomDropdown options={kecamatan.map((e) => {return e.text})} 
                                    placeholder={"Kecamatan"}
                                    dropdownHeight={300}
                                    width={150}
                    />
                    <CustomDropdown options={kelurahan.map((e) => {return e.text})} 
                                    placeholder={"Kelurahan"}
                                    dropdownHeight={300}
                                    width={150}
                    />

                    <CustomDateInputRange placeholder={"Date"}   
                                          initialValue={{start: (new Date() - 1000 * 3600 * 24 * 7), end: new Date()}}
                    />
                </div>
                <Button text={"Compare"}
                        style={{
                            width: '200px'
                        }}
                        onClick={onClickCompare}
                />
            </div>
            <div className={styles.comparisonRow}>
                <div className={styles.iframeCard}>
                    {/* <iframe className={styles.iframe} src={firstIframe} frameborder="0" style={{border:0}}></iframe> */}
                    <AnalyticsPage isComparing={isComparison}/>
                </div>
                {secondIframe?
                    <div className={styles.iframeCard}>
                        {/* <iframe className={styles.iframe} src={secondIframe} frameborder="0" style={{border:0}}></iframe>  */}
                        <AnalyticsPage isComparing={isComparison}/>
                    </div>
                    :null
                }
            </div>
            {isComparison?
                <div className={styles.storesPopup}>
                    <div className={styles.backgroundCancel} onClick={onClickCancel}/>
                    <div className={styles.storesContainer}>
                        <Stores isComparison={true} comparisonDataUpdate={onComparisonDataUpdate}/>
                    </div>
                </div>
                :null
            }
        </div>
    )
}