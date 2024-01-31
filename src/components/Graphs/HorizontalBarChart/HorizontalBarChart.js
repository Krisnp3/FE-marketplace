import styles from './HorizontalBarChart.module.css';
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
import DummyDatas from '../../../Dummies';

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

export default function HorizontalBarChart({data = DummyDatas.Overview.PromoType, title, subtitle, totalTitle, totalData, barColor, graphAspectRatio}) {
    const refDefaultWidth = 680;
    const refDefaultHeight = 410;
    const containerRef = useRef();

    const [containerScale, setContainerScale] = useState(1);

    useEffect(() => {
        if (containerRef.current) {
            setContainerScale(containerRef.current.offsetWidth/refDefaultWidth);
        }
        window.addEventListener('resize', () => {setContainerScale(containerRef.current.offsetWidth/refDefaultWidth);})
    }, [])

    useEffect(() => {
        
    }, [])

    return (
        <div ref={containerRef}>
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
                data={ {
                    labels: data.label,
                    datasets: data.data.map((e, index) => {
                        return {
                            type: 'bar',
                            label: e.label,
                            backgroundColor: barColor? barColor[index]: '#2D4059',
                            pointRadius: 2,
                            data: e.data,
                        }
                    })
                    
                    // [
                    //     {
                    //         type: 'bar',
                    //         label: 'Observed',
                    //         backgroundColor: barColor?? '#2D4059',
                    //         pointRadius: 2,
                    //         data: [2,3,4,5,6],
                    //     },
                    //     {
                    //         type: 'bar',
                    //         label: 'Observed',
                    //         backgroundColor: barColor?? '#000000',
                    //         pointRadius: 2,
                    //         data: [2,3,4,5,6],
                    //     },
                    // ],
                        
                }}
                options={{
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: true,
                    aspectRatio: graphAspectRatio?? 2,
                    elements: {
                        bar: {
                            borderWidth: 2,
                        }
                    },
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            stacked: true
                        }
                    }
                }}
            />
        </div>
    )
}