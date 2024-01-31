import styles from './LineBarChart.module.css';
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

export default function LineBarChart({data, title, subtitle, totalTitle, totalData, color, graphAspectRatio}) {
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
                    <div className={styles.title} style={{fontSize: `min(20px,${26*containerScale}px)`}}>
                        {title}
                    </div>
                    <div className={styles.subtitle} style={{fontSize: `min(20px,${14*containerScale}px)`}}>
                        {subtitle}
                    </div>
                </div>
                {totalTitle? 
                    <div className={styles.totalSection}>
                        <div className={styles.totalTitle} style={{fontSize: `min(20px,${16*containerScale}px)`}}>
                            {totalTitle}
                        </div>
                        <div className={styles.totalData} style={{fontSize: `min(20px,${16*containerScale}px)`}}>
                            {totalData}
                        </div>
                    </div>
                    :null
                }
            </div>
            <Chart 
                data={{
                    labels: data.label,
                    datasets: data.data.map((e, index) => {
                        return {
                            type: e.type,
                            label: e.label,
                            backgroundColor: color? color[index]: '#2D4059',
                            borderColor: color? color[index]: '#2D4059',
                            pointRadius: 2,
                            data: e.data,
                            yAxisID: `y${index}`
                        }
                    })
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    aspectRatio: graphAspectRatio?? 2,
                    elements: {
                        bar: {
                            borderWidth: 2,
                        }
                    },
                    scales: {
                        y0: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                        },
                    }
                }}
            />
        </div>
    )
}