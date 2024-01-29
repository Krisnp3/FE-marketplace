import { useEffect } from 'react';
import DummyDatas from '../../../Dummies';
import Constants from '../../../Global';
import Card from '../../../components/Card/Card';
import LineBarChart from '../../../components/Graphs/LineBarChart/LineBarChart';
import LineChart from '../../../components/Graphs/LineChart/LineChart';
import PieChart from '../../../components/Graphs/PieChart/PieChart';
import styles from './Sales.module.css';

export default function Sales({data, onScroll}) {

    useEffect(() => {
        if (onScroll) {
            onScroll(onScrollFunc);
        }
    }, [])

    const onScrollFunc = () => {
        console.log("page 1 onscrollfunc")
    }

    return (
        <div className={styles.container}>
            <Card width={"100%"} appearDelay={"0.5s"}>
                <LineChart title={"Total Transactions"}
                            subtitle={"Transaction by Order Status Category"}
                            totalTitle={"Completed Transactions"}
                            totalData={Constants.formatNumber(5623, false)}
                            xTitle={""}
                            yTitle={""}
                            color={Constants.colors}
                            data={data.Transactions}
                            graphAspectRatio={4}
                />
            </Card>
            <Card width={"100%"} appearDelay={"1s"}>
                <LineChart title={"Total Revenue"}
                            subtitle={"Completed Transactions Only"}
                            totalTitle={"Total Revenue"}
                            totalData={Constants.formatNumber(155344, true, 'IDR')}
                            xTitle={""}
                            yTitle={""}
                            color={Constants.colors}
                            data={data.Revenue}
                            graphAspectRatio={4}
                />
            </Card>

            <div className={styles.row} style={{width: "calc(50% - 32px)"}}>
                <Card width={"calc(50% - 27px)"} appearDelay={"1.5s"} style={{alignItems: "start"}}>
                    <div className={styles.smallCardValue}>{Constants.formatNumber(22803, true)}</div>
                    <div className={styles.smallCardTitle}>All Orders</div>
                </Card>
                <Card width={"calc(50% - 27px)"} appearDelay={"1.5s"}>
                    <div className={styles.smallCardValue}>{Constants.formatNumber(11139, true)}</div>
                    <div className={styles.smallCardTitle}>Completed</div>
                </Card>
                <Card width={"calc(50% - 27px)"} appearDelay={"1.5s"}>
                    <div className={styles.smallCardValue}>{Constants.formatNumber(11454, true)}</div>
                    <div className={styles.smallCardTitle}>In-Progress</div>
                </Card>
                <Card width={"calc(50% - 27px)"} appearDelay={"1.5s"}>
                    <div className={styles.smallCardValue}>{Constants.formatNumber(210, true)}</div>
                    <div className={styles.smallCardTitle}>Canceled</div>
                </Card>
                <Card width={"100%"} appearDelay={"2s"}>
                    <PieChart title={"Orders Status"}
                                // subtitle={"Completed Transactions Only"}
                                // totalTitle={"Completed Transactions"}
                                // totalData={155344}
                    />
                </Card>
            </div>

            <Card width={"calc(50% - 32px)"} appearDelay={"2.5s"}>
                <LineBarChart title={"Total Orders and Order Value by Day of Week"}
                            // subtitle={"Completed Transactions Only"}
                            totalTitle={""}
                            totalData={""}
                            xTitle={""}
                            yTitle={""}
                            color={[Constants.colors[1], Constants.colors[2]]}
                            data={data.OrdersByDay}
                            graphAspectRatio={1.25}
                />
            </Card>

            <Card width={"calc(100%)"} appearDelay={"3s"}>
                <LineBarChart title={"Order Count and Order Value by Hours"}
                            // subtitle={"Completed Transactions Only"}
                            totalTitle={""}
                            totalData={""}
                            xTitle={""}
                            yTitle={""}
                            color={[Constants.colors[3], Constants.colors[4]]}
                            data={data.OrdersByHour}
                            graphAspectRatio={4}
                />
            </Card>
            <Card width={"calc(100%)"} appearDelay={"3.5s"}>
                <LineBarChart title={"Order Count and Average Order Value by Day of Month (1-31)"}
                            // subtitle={"Completed Transactions Only"}
                            totalTitle={""}
                            totalData={""}
                            xTitle={""}
                            yTitle={""}
                            color={[Constants.colors[0], Constants.colors[1]]}
                            data={data.OrdersByDayOfMonth}
                            graphAspectRatio={4}
                />
            </Card>

        </div>
    )
}