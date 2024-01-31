import styles from './BubbleChart.module.css';
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

export default function BubbleChart({data, title, subtitle, totalTitle, totalData, xTitle, yTitle, color, graphAspectRatio, showLegend}) {
    const refDefaultWidth = 680;
    const refDefaultHeight = 410;
    const containerRef = useRef();

    const [containerScale, setContainerScale] = useState(1);

    const [labels, setLabels] = useState([]);
    const [dataPoints, setDataPoints] = useState({});

    useEffect(() => {
        changeContainerScale();
        window.addEventListener('resize', changeContainerScale)

        setLabels(data.labels)
    }, [])

    useEffect(() => {
        // console.log("containerScale: ", containerScale)
    }, [containerScale])

    useEffect(() => {
        // console.log("data points: ", labels)
        let tempDataPoints = {};

        let min = Infinity;
        let max = 0;
        for(let i = 0; i < data.data.length; i++) {
            if (data.data[i][data.yAxis] < min) {
                min = data.data[i][data.yAxis];
            }
            if (data.data[i][data.yAxis] > max) {
                max = data.data[i][data.yAxis];
            }
        }

        for(let i = 0; i < data.data.length; i++) {
            let radius = 13 * ((data.data[i][data.yAxis] - min) / (max - min)) + 2
            let point = {x: data.data[i][data.xAxis], y: data.data[i][data.yAxis], r: radius};
            if (tempDataPoints[data.data[i].label]) {
                tempDataPoints[data.data[i].label].push(point);
            } else {
                tempDataPoints[data.data[i].label] = [point];
            }
        }
        setDataPoints({...tempDataPoints})
    }, [labels])

    const changeContainerScale = () => {
        if (containerRef.current) {
            if (containerRef.current.offsetWidth/refDefaultWidth < 1) {
                setContainerScale(containerRef.current.offsetWidth/refDefaultWidth);
            } else {
                setContainerScale(1);
            }
        }
    }

    return (
        <div ref={containerRef}>
            <div className={styles.titleRow}>
                <div className={styles.titleCol}>
                    <div className={styles.title} style={{fontSize: `min(20px,${26*containerScale}px)`}}>
                        {title}
                    </div>
                    <div className={styles.subtitle} style={{fontSize: `min(12px,${14*containerScale}px)`}}>
                        {subtitle}
                    </div>
                </div>
                {/* <div className={styles.totalSection} style={{backgroundColor: color}}>
                    <div className={styles.totalTitle} style={{fontSize: `min(12px,${16*containerScale}px)`}}>
                        {totalTitle}
                    </div>
                    <div className={styles.totalData} style={{fontSize: `min(12px,${16*containerScale}px)`}}>
                        {totalData}
                    </div>
                </div> */}
            </div>
            <Chart
                data={ {
                    labels: dataPoints[data.xAxis],
                    datasets: labels.filter((e) => {
                        if (e != data && e != data.xAxis) {
                            return true;
                        } else {
                            return false
                        }
                    }).map((e, index) => {
                        if (e != data && e != data.xAxis) {
                            return {
                                type: 'bubble',
                                label: e,
                                backgroundColor: color[index],
                                borderColor: color[index],
                                
                                data: dataPoints[e],
                                // data: [{
                                //     x: 20,
                                //     y: 30,
                                //     r: 15
                                //   }, {
                                //     x: 40,
                                //     y: 10,
                                //     r: 10
                                //   }],
                            }
                        } else {
                            
                        }
                    })
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    aspectRatio: graphAspectRatio?? 2,
                    plugins: {
                        legend: {
                            display: showLegend
                        }
                    },
                    scales: {
                        x: {
                          display: true,
                          title: {
                            display: xTitle!=="",
                            text: xTitle?? 'Date',
                            // color: '#911',
                            font: {
                              family: 'Poppins',
                              size: 10,
                              weight: 'normal',
                            //   lineHeight: 1.2,
                            },
                            // padding: {top: 20, left: 0, right: 0, bottom: 0}
                          },
                          ticks: {
                            font: {
                                size: 8
                            }
                          }
                        },
                        y: {
                          display: true,
                          title: {
                            display: yTitle !== "",
                            text: yTitle?? 'Value',
                            // color: '#191',
                            font: {
                              family: 'Poppins',
                              size: 10,
                              style: 'normal',
                            //   lineHeight: 1.2
                            },
                            // padding: {top: 30, left: 0, right: 0, bottom: 0}
                          }
                        }
                    }
                }}
            />
        </div>
    )
}