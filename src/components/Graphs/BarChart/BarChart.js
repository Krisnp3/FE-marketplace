import styles from './BarChart.module.css';
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

export default function BarChart({data, title, subtitle, totalTitle, totalData, barColor, graphAspectRatio}) {
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
        // console.log("this, ", containerRef.current.offsetWidth)
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
                <div className={styles.totalSection}>
                    <div className={styles.totalTitle} style={{fontSize: `min(20px,${16*containerScale}px)`}}>
                        {totalTitle}
                    </div>
                    <div className={styles.totalData} style={{fontSize: `min(20px,${16*containerScale}px)`}}>
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
                    // indexAxis: 'y',
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