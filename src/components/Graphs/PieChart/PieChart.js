import styles from './PieChart.module.css';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    registerables as registerablesJS
} from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import {
    Chart,
    getDatasetAtEvent,
    getElementAtEvent,
    getElementsAtEvent,
} from 'react-chartjs-2';

ChartJS.register(...registerablesJS);
ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip
);  

const dummy = {
    "Discount": Math.random() * 5000 + 1000,
    "Cashback": Math.random() * 5000 + 1000,
    "Other (null)": Math.random() * 5000 + 1000,
    "Discount + Cashback": Math.random() * 5000 + 1000,
}

export default function PieChart({data = dummy, title, subtitle, totalTitle, totalData, colors}) {
    const refDefaultWidth = 680;
    const refDefaultHeight = 410;
    const containerRef = useRef();

    const [containerScale, setContainerScale] = useState(1);

    const [labels, setLabels] = useState(Object.keys(data));
    const [dataset, setDataset] = useState([]);

    useEffect(() => {
        if (containerRef.current) {
            setContainerScale(containerRef.current.offsetWidth/refDefaultWidth);
        }
        window.addEventListener('resize', () => {setContainerScale(containerRef.current?.offsetWidth/refDefaultWidth);})

        
    }, [])

    useEffect(() => {
        if (labels.length) {
            let tempDataset = []
            for (let i = 0; i < labels.length; i++) {
                tempDataset.push(data[labels[i]]);
            }
            setDataset([...tempDataset])
        }
    }, [labels])

    return (
        <div ref={containerRef} style={{height: "170px", paddingBottom: "30px"}}> 
            <div className={styles.titleRow}>
                <div className={styles.titleCol}>
                    <div className={styles.title} style={{fontSize: 30*containerScale}}>
                        {title}
                    </div>
                    <div className={styles.subtitle} style={{fontSize: 18*containerScale}}>
                        {subtitle}
                    </div>
                </div>
                <div className={styles.totalSection}>
                    <div className={styles.totalTitle} style={{fontSize: 20*containerScale}}>
                        {totalTitle}
                    </div>
                    <div className={styles.totalData} style={{fontSize: 20*containerScale}}>
                        {totalData}
                    </div>
                </div>
            </div>
            <Chart 
                type='pie'
                data={ {
                    labels: labels,
                    datasets: [
                        {
                            data: dataset,
                            backgroundColor: colors
                        },
                        
                    ],
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'right',
                            labels: {
                                usePointStyle: true
                           
                            }
                        }
                    },
                }}
            />
        </div>
    )
}