import { useEffect } from 'react';
import DummyDatas from '../../../Dummies';
import Constants from '../../../Global';
import Card from '../../../components/Card/Card';
import BarChart from '../../../components/Graphs/BarChart/BarChart';
import ColoredTable from '../../../components/Graphs/ColoredTable/ColoredTable';
import HorizontalBarChart from '../../../components/Graphs/HorizontalBarChart/HorizontalBarChart';
import LineChart from '../../../components/Graphs/LineChart/LineChart';
import PieChart from '../../../components/Graphs/PieChart/PieChart';
import styles from './Overview.module.css';

export default function Overview({data, onScroll}) {

    useEffect(() => {
        if (onScroll) {
            onScroll(onScrollFunc);
        }
    }, [])

    const onScrollFunc = () => {
        // console.log("page 0 onscrollfunc")
    }


    return (
        <div className={styles.container}>
            <Card width={"calc(50% - 32px)"} appearDelay={"0.5s"}>
                <LineChart title={"Total Transactions"}
                            subtitle={"Completed Transactions Only"}
                            totalTitle={"Completed Transactions"}
                            totalData={Constants.formatNumber(Constants.sumData(data.Transactions.data, "Transaction"), false)}
                            xTitle={""}
                            yTitle={""}
                            color={['#0452d9']}
                            data={data.Transactions}
                            showLegend={false}
                />
            </Card>
            <Card width={"calc(50% - 32px)"} appearDelay={"1s"}>
                <LineChart title={"Total Revenue"}
                            subtitle={"Completed Transactions Only"}
                            totalTitle={"Total Revenue"}
                            totalData={Constants.formatNumber(Constants.sumData(data.Revenue.data, "Revenue"), true, 'IDR')}
                            xTitle={""}
                            yTitle={""}
                            color={['#128c3f']}
                            data={data.Revenue}
                            showLegend={false}
                />
            </Card>
            
            
            <div className={styles.row} style={{width: "calc(40% - 12px)"}}>
                <Card width={"calc(50% - 27px)"} appearDelay={"1.5s"} style={{alignItems: "start"}}>
                    <div className={styles.smallCardValue}>{Constants.formatNumber(data.OrderStatus["Completed"] + data.OrderStatus["In-Progress"] + data.OrderStatus["Cancelled"], false)}</div>
                    <div className={styles.smallCardTitle}>All Orders</div>
                </Card>
                <Card width={"calc(50% - 27px)"} appearDelay={"1.5s"}>
                    <div className={styles.smallCardValue}>{Constants.formatNumber(data.OrderStatus["Completed"], false)}</div>
                    <div className={styles.smallCardTitle}>Completed</div>
                </Card>
                <Card width={"calc(50% - 27px)"} appearDelay={"1.5s"}>
                    <div className={styles.smallCardValue}>{Constants.formatNumber(data.OrderStatus["In-Progress"], false)}</div>
                    <div className={styles.smallCardTitle}>In-Progress</div>
                </Card>
                <Card width={"calc(50% - 27px)"} appearDelay={"1.5s"}>
                    <div className={styles.smallCardValue}>{Constants.formatNumber(data.OrderStatus["Cancelled"], false)}</div>
                    <div className={styles.smallCardTitle}>Canceled</div>
                </Card>
                <Card width={"100%"} appearDelay={"2s"}>
                    <PieChart title={"Orders Status"}
                              data={data.OrderStatus}
                                // subtitle={"Completed Transactions Only"}
                                // totalTitle={"Completed Transactions"}
                                // totalData={155344}
                              colors={Constants.colorHorBarChart}
                    />
                </Card>
            </div>
            <Card width={"calc(30% - 37px)"} height={"100%"} appearDelay={"2.5s"}>
                <HorizontalBarChart title={"Promo Type"}
                                    barColor={Constants.colorHorBarChart}
                                    graphAspectRatio={0.7}
                />
            </Card>
            <Card width={"calc(30% - 37px)"} height={"100%"} appearDelay={"3s"}>
                <HorizontalBarChart title={"Shipping Expedition"}
                                    barColor={Constants.colorHorBarChart}
                                    graphAspectRatio={0.7}
                                    data={data.ShippingExpedition}
                />
            </Card>


            <Card width={"calc(45% - 32px)"} appearDelay={"3.5s"} minHeight={345}>
                <div className={styles.bigCardTitle}>
                    Buyer's Overview
                </div>
                <div className={styles.bigCardRow}>
                    <div className={styles.bigCardSubsectionLeft}>
                        <div className={styles.bigCardSubtitle}>
                            Total Buyers
                        </div>
                        <div className={styles.bigCardSubValue}>
                            {Constants.formatNumber(data.BuyerOverview.TotalBuyer, true)}
                        </div>
                    </div>
                    <div className={styles.bigCardSubsectionRight}>
                        <div className={styles.bigCardSubtitle}>
                            Completed Purchase
                        </div>
                        <div className={styles.bigCardSubValue}>
                            {Constants.formatNumber(data.BuyerOverview.CompletedPurchase, true)}
                        </div>
                    </div>
                </div>
                <div className={styles.bigCardRow}>
                    <div className={styles.bigCardSubsectionLeft}>
                        <div className={styles.bigCardSubtitle}>
                            Canceled Purchase
                        </div>
                        <div className={styles.bigCardSubValue}>
                            {Constants.formatNumber(data.BuyerOverview.CancelledPurchase, true)}
                        </div>
                    </div>
                    <div className={styles.bigCardSubsectionRight}>
                        <div className={styles.bigCardSubtitle}>
                            In Progress
                        </div>
                        <div className={styles.bigCardSubValue}>
                            {Constants.formatNumber(data.BuyerOverview.InProgressPurchase, true)}
                        </div>
                    </div>
                </div>

                <div className={styles.bigCardTitle}>
                    Buying Habit Overview
                </div>
                <div className={styles.bigCardRow}>
                    <div className={styles.bigCardSubsectionLeft}>
                        <div className={styles.bigCardSubtitle}>
                            Avg. Purchases per Buyer
                        </div>
                        <div className={styles.bigCardSubValue}>
                            {Constants.formatNumber(data.BuyerOverview.AvgPurchasePerBuyer, true)}
                        </div>
                    </div>
                    <div className={styles.bigCardSubsectionRight}>
                        <div className={styles.bigCardSubtitle}>
                            Avg. Revenue per Buyer
                        </div>
                        <div className={styles.bigCardSubValue}>
                            {Constants.formatNumber(data.BuyerOverview.AvgRevenuePerBuyer, true, 'IDR')}
                        </div>
                    </div>
                </div>
                <div className={styles.bigCardRow}>
                    <div className={styles.bigCardSubsectionLeft}>
                        <div className={styles.bigCardSubtitle}>
                            Promo Used
                        </div>
                        <div className={styles.bigCardSubValue}>
                            {Constants.formatNumber(data.BuyerOverview.PromoUsed, true)}
                        </div>
                    </div>
                    <div className={styles.bigCardSubsectionRight}>
                        <div className={styles.bigCardSubtitle}>
                            Average Order Value
                        </div>
                        <div className={styles.bigCardSubValue}>
                            {Constants.formatNumber(data.BuyerOverview.AvgOrderValue, true, 'IDR')}
                        </div>
                    </div>
                </div>
            </Card>
            <Card width={"calc(55% - 32px)"} appearDelay={"4s"} minHeight={345}>
                <ColoredTable data={data.OrderDistribution} 
                              title={"Order Distribution by Area"}
                              rowPerPage={1000}
                              tableHeight={270}
                              cellColors={{   
                                    "Recipient Region": {color: "#FFFFFF", gradient: false},
                                    "Total Recipient": {color: Constants.colors[0], gradient: true},
                                    "Total Revenue": {color: Constants.colors[1], gradient: true},
                                    "Orders Completed" : {color: Constants.colors[2], gradient: true},
                                    "Orders Cancelled" : {color: Constants.colors[3], gradient: true},
                                    "Orders Rejected" : {color: Constants.colors[4], gradient: true},
                                    "Avg. Order Value" : {color: Constants.colors[5], gradient: true},
                                    "Avg. Order Quantity" : {color: Constants.colors[6], gradient: true},
                                }}
                              customCellVisual={{
                                    "Total Recipient": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                                    "Total Revenue": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, true, 'IDR')}</div>},
                                    "Orders Completed" : (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                                    "Orders Cancelled" : (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                                    "Orders Rejected" : (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                                    "Avg. Order Value" : (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, true, 'IDR')}</div>},
                                    "Avg. Order Quantity" : (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                                }}
                                titleFontSize={10}
                />
            </Card>

            <Card width={"calc(100%)"} appearDelay={"4.5s"}>
                <ColoredTable data={data.ProductPerformance} 
                              title={"Product Performance"}
                              cellColors={{
                                "Product Name": {color: "#FFFFFF", gradient: false},
                                "Avg. Product Price": {color: Constants.colors[0], gradient: true},
                                "Product Quantity": {color: Constants.colors[1], gradient: true},
                                "Total Revenue": {color: Constants.colors[2], gradient: true},
                                "Orders Completed": {color: Constants.colors[3], gradient: true},
                                "Purchase Revenue": {color: Constants.colors[4], gradient: true},
                                "Order Cancelled": {color: Constants.colors[5], gradient: true},
                              }}
                              customCellVisual={{
                                "Avg. Product Price": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                                "Product Quantity": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                                "Total Revenue": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, true, 'IDR')}</div>},
                                "Orders Completed": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                                "Purchase Revenue": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, true, 'IDR')}</div>},
                                "Order Cancelled": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                              }}
                />
            </Card>

            <Card width={"calc(100%)"} appearDelay={"5s"}>
                <ColoredTable data={data.PromoPerformance} 
                              title={"Promo Performance"}
                              cellColors={{
                                "Promo Name": {color: "#FFFFFF", gradient: false},
                                "Total Order": {color: Constants.colors[0], gradient: true},
                                "Order Completed": {color: Constants.colors[1], gradient: true},
                                "Order Cancelled": {color: Constants.colors[2], gradient: true},
                                "Order In Progress": {color: Constants.colors[3], gradient: true},
                              }}
                              customCellVisual={{
                                "Total Order": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                                "Order Completed": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                                "Order Cancelled": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                                "Order In Progress": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                              }}
                />
            </Card>

            <Card width={"calc(100%)"} appearDelay={"5.5s"}>
                <ColoredTable data={DummyDatas.Overview.PromoTypeRegion.data} 
                              title={"Promo Type (Discount vs Cashback) by region"}
                              totalData={DummyDatas.Overview.PromoTypeRegion.total}
                              cellColors={{
                                "Recipient Region": {color: "#FFFFFF", gradient: false},
                                "Total Discount": {color: Constants.colors[0], gradient: true},
                                "Total Order Disount": {color: Constants.colors[1], gradient: true},
                                // "Avg. Discount": {color: Constants.colors[1], gradient: true},
                                "Total Cashback": {color: Constants.colors[2], gradient: true},
                                "Total Order Cashback": {color: Constants.colors[3], gradient: true},
                                // "Avg. Cashback": {color: Constants.colors[1], gradient: true},
                                // "Total Grand total": {color: Constants.colors[3], gradient: true},
                                // "Total Order Grand total": {color: Constants.colors[4], gradient: true},
                                // "Avg. Grand total": {color: Constants.colors[1], gradient: true},
                              }}
                              customColumnTitleVisual={{
                                "topTable": () => {
                                    return [
                                        <th colSpan={1}>
                                            
                                        </th>,
                                        <th colSpan={3} style={{borderBottom: '#000000 1px solid'}}>
                                            Discount
                                        </th>,
                                        <th colSpan={3} style={{borderBottom: '#000000 1px solid'}}>
                                            Cashback
                                        </th>,
                                        <th colSpan={3} style={{borderBottom: '#000000 1px solid'}}>
                                            Grand total
                                        </th>,
                                    ]
                                },
                                // "Recipient Region": (key, value) => {return <div style={{textAlign: 'left'}}>{value}</div>},
                                "Total Discount": (value, index) => {
                                    return (
                                        <div style={{textAlign: 'right'}}>
                                            total
                                        </div>
                                    )
                                },
                                "Total Order Disount": (value, index) => {
                                    return (
                                        <div style={{textAlign: 'right', whiteSpace: 'nowrap'}}>
                                            total order
                                        </div>
                                    )
                                },
                                "Avg. Discount": (value, index) => {
                                    return (
                                        <div style={{textAlign: 'right'}}>
                                            avg
                                        </div>
                                    )
                                },
                                "Total Cashback": (value, index) => {
                                    return (
                                        <div style={{textAlign: 'right', borderLeft: '#000000 1px solid' , marginLeft: '-10px'}}>
                                            total
                                        </div>
                                    )
                                },
                                "Total Order Cashback": (value, index) => {
                                    return (
                                        <div style={{textAlign: 'right', whiteSpace: 'nowrap'}}>
                                            total order
                                        </div>
                                    )
                                },
                                "Avg. Cashback": (value, index) => {
                                    return (
                                        <div style={{textAlign: 'right'}}>
                                            avg
                                        </div>
                                    )
                                },
                                "Total Grand total": (value, index) => {
                                    return (
                                        <div style={{textAlign: 'right', borderLeft: '#000000 1px solid' , marginLeft: '-5px'}}>
                                            total
                                        </div>
                                    )
                                },
                                "Total Order Grand total": (value, index) => {
                                    return (
                                        <div style={{textAlign: 'right', whiteSpace: 'nowrap'}}>
                                            total order
                                        </div>
                                    )
                                },
                                "Avg. Grand total": (value, index) => {
                                    return (
                                        <div style={{textAlign: 'right'}}>
                                            avg
                                        </div>
                                    )
                                },}}
                              customCellVisual={{
                                "Recipient Region": (key, value) => {return <div style={{textAlign: 'left'}}>{value}</div>},
                                "Total Discount": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                                "Total Order Disount": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                                "Avg. Discount": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, true)}</div>},
                                "Total Cashback": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                                "Total Order Cashback": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                                "Avg. Cashback": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, true)}</div>},
                                "Total Grand total": (key, value) => {return <div style={{textAlign: 'right', borderLeft: '#000000 1px solid'}}>{Constants.formatNumber(value, false)}</div>},
                                "Total Order Grand total": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
                                "Avg. Grand total": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, true)}</div>},
                              }}
                              
                />
            </Card>
        </div>
    )
}