import { useEffect } from 'react';
import DummyDatas from '../../../Dummies';
import Constants from '../../../Global';
import Card from '../../../components/Card/Card';
import BarChart from '../../../components/Graphs/BarChart/BarChart';
import BubbleChart from '../../../components/Graphs/BubbleChart/BubbleChart';
import ColoredTable from '../../../components/Graphs/ColoredTable/ColoredTable';
import LineBarChart from '../../../components/Graphs/LineBarChart/LineBarChart';
import LineChart from '../../../components/Graphs/LineChart/LineChart';
import PieChart from '../../../components/Graphs/PieChart/PieChart';
import styles from './Product.module.css';

export default function Product({data, onScroll}) {

    useEffect(() => {
        if (onScroll) {
            onScroll(onScrollFunc);
        }
    }, [])

    const onScrollFunc = () => {
        console.log("page 2 onscrollfunc")
    }


    return (
        <div className={styles.container}>
            <Card width={"calc(100%)"} appearDelay={"0.5s"}>
                <ColoredTable data={data.ProductPerformance} 
                              title={"Product Performance"}
                              cellColors={{
                                "Product Name": {color: "#FFFFFF", gradient: false},
                                "Avg. Product Price": {color: Constants.colors[2], gradient: true},
                                "Product Quantity": {color: Constants.colors[3], gradient: true},
                                "Total Revenue": {color: Constants.colors[4], gradient: true},
                                "Orders Completed": {color: Constants.colors[0], gradient: true},
                                "Purchase Revenue": {color: Constants.colors[1], gradient: true},
                                "Order Cancelled": {color: Constants.colors[2], gradient: true},
                                "Lost Revenue (cancelled/rejected)": {color: Constants.colors[3], gradient: true},
                              }}
                              customCellVisual={{
                                "Avg. Product Price": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                                "Product Quantity": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                                "Total Revenue": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, true, 'IDR')}</div>},
                                "Orders Completed": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                                "Purchase Revenue": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, true, 'IDR')}</div>},
                                "Order Cancelled": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                                "Lost Revenue (cancelled/rejected)": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, true, "IDR")}</div>},
                              }}
                />
            </Card>

            <Card width={"100%"} appearDelay={"1s"}>
                <BarChart title={"Top 10 Products Proportion in Each Place"}
                            subtitle={""}
                            totalTitle={""}
                            totalData={""}
                            xTitle={""}
                            yTitle={""}
                            barColor={Constants.colors}
                            data={data.ProductProportion}
                            graphAspectRatio={4}
                />
            </Card>


            <Card width={"100%"} appearDelay={"1s"}>
                <BubbleChart title={"The Relation between Product Price & Order Quantity"}
                            subtitle={""}
                            totalTitle={""}
                            totalData={""}
                            xTitle={"Product Price"}
                            yTitle={"Order Quantity"}
                            color={Constants.colors}
                            data={data.PriceQuantityRelation}
                            graphAspectRatio={4}
                />
            </Card>

            <Card width={"calc(40% - 32px)"} appearDelay={"2s"}>
                <PieChart title={"Promo Type Proportion"}
                            data={data.PromoProportion}
                            colors={Constants.colors}
                />
            </Card>
            <Card width={"calc(60% - 32px)"} appearDelay={"2.5s"}>
                <BarChart title={"Promo Type Propotion by each Destination Place"}
                            subtitle={""}
                            totalTitle={""}
                            totalData={""}
                            xTitle={""}
                            yTitle={""}
                            barColor={Constants.colors}
                            data={data.PromoTypeProportion}
                            graphAspectRatio={3}
                />
            </Card>       

            <Card width={"calc(100%)"} appearDelay={"3s"}>
                <ColoredTable data={data.PromoPerformance} 
                              title={"Order Status by Promo Name"}
                              cellColors={{
                                "Promo Name": {color: "#FFFFFF", gradient: false},
                                "Total Order": {color: Constants.colors[3], gradient: true},
                                "Order Completed": {color: Constants.colors[4], gradient: true},
                                "Order Cancelled": {color: Constants.colors[1], gradient: true},
                                "Order In Progress": {color: Constants.colors[2], gradient: true},
                                "Avg. Order Value": {color: Constants.colors[0], gradient: true},
                              }}
                              customCellVisual={{
                                "Total Order": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                                "Order Completed": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                                "Order Cancelled": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                                "Order In Progress": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                                "Avg. Order Value": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                              }}
                />
            </Card>

            {/* <Card width={"calc(100%)"} appearDelay={"3.5s"}>
                <ColoredTable data={data.OrderDistribution} 
                              title={"Promo Type"}
                />
            </Card>    */}
        </div>
    )
}