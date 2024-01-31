import styles from './LineChart.module.css';
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

const dummyData = {
    data:[
        {Date: "20 Aug 2022", Transaction: 500, Revenue: 530},
        {Date: "21 Aug 2022", Transaction: 400, Revenue: 440},
        {Date: "22 Aug 2022", Transaction: 560, Revenue: 450},
        {Date: "23 Aug 2022", Transaction: 230, Revenue: 330},
        {Date: "24 Aug 2022", Transaction: 670, Revenue: 670},
        {Date: "25 Aug 2022", Transaction: 630, Revenue: 430},
        {Date: "26 Aug 2022", Transaction: 1070, Revenue: 1570},
        {Date: "27 Aug 2022", Transaction: 870, Revenue: 370},
        {Date: "28 Aug 2022", Transaction: 970, Revenue: 470},
        {Date: "29 Aug 2022", Transaction: 370, Revenue: 370},
        {Date: "30 Aug 2022", Transaction: 670, Revenue: 670},
        {Date: "31 Aug 2022", Transaction: 570, Revenue: 570},
    ],
    xAxis: "Date",
}

export default function LineChart({data, title, subtitle, totalTitle, totalData, xTitle, yTitle, color, graphAspectRatio, showLegend, lineTickness = 2}) {
    const refDefaultWidth = 680;
    const refDefaultHeight = 410;
    const containerRef = useRef();

    const [containerScale, setContainerScale] = useState(1);

    const [labels, setLabels] = useState([]);
    const [dataPoints, setDataPoints] = useState({});

    useEffect(() => {
        changeContainerScale();
        window.addEventListener('resize', changeContainerScale)

        setLabels(Object.keys(data.data[0]))
    }, [])

    useEffect(() => {
        console.log("containerScale: ", containerScale)
    }, [containerScale])

    useEffect(() => {
        console.log(labels)
        let tempDataPoints = {};
        for(let i = 0; i < labels.length; i++) {
            tempDataPoints[labels[i]] = data.data.map((e, index) => {return e[labels[i]]});
        }
        console.log(tempDataPoints)
        setDataPoints({...tempDataPoints})
    }, [labels])

    let width, height, gradient;
    function getGradient(ctx, chartArea, index) {
        const chartWidth = chartArea.right - chartArea.left;
        const chartHeight = chartArea.bottom - chartArea.top;
        // if (!gradient && width !== chartWidth || height !== chartHeight) {
        if (color[index]) {
            // Create the gradient because this is either the first render
            // or the size of the chart has changed
            width = chartWidth;
            height = chartHeight;
            gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);

            gradient.addColorStop(0, color[index] + "33");
            gradient.addColorStop(0.5, color[index] + "bb");
            gradient.addColorStop(1, color[index]);
        }
        
        return gradient;
    }

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
                {totalTitle?
                    <div className={styles.totalSection} style={{backgroundColor: color}}>
                        <div className={styles.totalTitle} style={{fontSize: `min(12px,${16*containerScale}px)`}}>
                            {totalTitle}
                        </div>
                        <div className={styles.totalData} style={{fontSize: `min(12px,${16*containerScale}px)`}}>
                            {totalData}
                        </div>
                    </div>
                    :null
                }
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
                                type: 'line',
                                label: e,
                                backgroundColor: function(context) {
                                    const chart = context.chart;
                                    const {ctx, chartArea} = chart;
                            
                                    if (!chartArea) {
                                        // This case happens on initial chart load
                                        return;
                                    }
                                    return getGradient(ctx, chartArea, index);
                                    },
                                borderColor: function(context) {
                                    const chart = context.chart;
                                    const {ctx, chartArea} = chart;
                            
                                    if (!chartArea) {
                                        // This case happens on initial chart load
                                        return;
                                    }
                                    return getGradient(ctx, chartArea, index);
                                    },
                                pointRadius: lineTickness,
                                borderWidth: lineTickness,
                                data: dataPoints[e],
                            }
                        } else {
                            console.log("hi")
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