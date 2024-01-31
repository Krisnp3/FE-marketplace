

import { useEffect, useRef, useState } from 'react';
import DummyDatas from '../../../Dummies';
import Constants from '../../../Global';
import Card from '../../../components/Card/Card';
import ColoredTable from '../../../components/Graphs/ColoredTable/ColoredTable';
import HorizontalBarChart from '../../../components/Graphs/HorizontalBarChart/HorizontalBarChart';
import LineChart from '../../../components/Graphs/LineChart/LineChart';
import ClusterMap from '../../../components/Graphs/Maps/ClusterMap/ClusterMap';
import HeatMap from '../../../components/Graphs/Maps/HeatMap/HeatMap';
import styles from './Geographic.module.css';
import MapGL, {Source, Layer} from 'react-map-gl';

export default function Geographic({data, onScroll, curPage}) {
    const containerRef = useRef(null);

    const [mapsScroll, setMapScroll] = useState([
        {scroll: 0, scrollBottom: 600, show: true},
        {scroll: 0, scrollBottom: 600, show: true},
        {scroll: 0, scrollBottom: 600, show: true},
        {scroll: 850, scrollBottom: 2100, show: false},
        {scroll: 850, scrollBottom: 2100, show: false},
        {scroll: 850, scrollBottom: 2100, show: false},
        {scroll: 2300, scrollBottom: 3500, show: false},
        {scroll: 2300, scrollBottom: 3500, show: false},
        {scroll: 2300, scrollBottom: 3500, show: false},
    ])

    const mapThreshold = 6;
    var mapShown = 0;

    useEffect(() => {

        if (onScroll) {
            onScroll(updateMapOnScroll)
        }
    }, [])
    
    const updateMapOnScroll = (scrollTop, page) => {
        // console.log("page3: ", curPage)
        // if (curPage != 3) {
        //     return;
        // }
        let tempMapScroll = mapsScroll;
        let tempMapShown = 0;
        let mapChanged = false;
        for (let i = 0; i < tempMapScroll.length; i++) {
            if (tempMapScroll[i].scroll <= scrollTop && tempMapScroll[i].scrollBottom >= scrollTop) {
                if (!tempMapScroll[i].show) {
                    mapChanged = true;
                }
                tempMapScroll[i].show = true;
                tempMapShown++;
            }
            else {
                if (tempMapScroll[i].show) {
                    mapChanged = true;
                }
                tempMapScroll[i].show = false;
            }

        }
        console.log(mapsScroll, tempMapScroll)
        if (mapChanged) {
            console.log("map change")
            setMapScroll([...tempMapScroll]);
        }
    }

    return (
        <div className={styles.container}>
            {/* city */}
            <div className={styles.titles}>
                City Level Breakdown
            </div>

            <Card width={`100%`} height={300}>
                {mapsScroll[0].show?
                    <ClusterMap data={data.CityCluster} height={260}/>
                    :null
                }
            </Card>

            <Card width={`calc(50% - 32px)`} height={200}>
                {mapsScroll[1].show?
                    <HeatMap data={data.CityHeatMapRevenue} initialZoom={2.6} height={170} colorVariable={"Total Revenue"}/>
                    :null
                }
            </Card>
            <Card width={`calc(50% - 32px)`} height={200}>
                {mapsScroll[2].show?
                    <HeatMap data={data.CityHeatMapQuantity} initialZoom={2.6} height={170} colorVariable={"Avg. Order Value"}/>
                    :null
                }
            </Card>

            <Card width={`calc(100%)`}>
                <LineChart title={""}
                            subtitle={""}
                            totalTitle={""}
                            totalData={""}
                            xTitle={""}
                            yTitle={"Total Revenue"}
                            color={Constants.colors}
                            data={data.CityRevenue}
                            graphAspectRatio={4}
                            lineTickness={2}
                />
            </Card>

            <Card width={`calc(100%)`}>
                <LineChart title={""}
                            subtitle={""}
                            totalTitle={""}
                            totalData={""}
                            xTitle={""}
                            yTitle={"Product Quantity"}
                            color={Constants.colors}
                            data={data.CityQuantity}
                            graphAspectRatio={4}
                            lineTickness={2}
                />
            </Card>

            <Card width={`calc(100%)`}>
                <ColoredTable data={data.CityProductPerformance} 
                            //   title={"Product Performance"}
                              cellColors={{
                                "Kota": {color: "#FFFFFF", gradient: false},
                                "Avg. Product Price": {color: Constants.colors[2], gradient: true},
                                "Product Quantity": {color: Constants.colors[3], gradient: true},
                                "Total Revenue": {color: Constants.colors[4], gradient: true},
                                "Orders Completed": {color: Constants.colors[0], gradient: true},
                                "Purchase Revenue": {color: Constants.colors[1], gradient: true},
                                "Order Cancelled": {color: Constants.colors[2], gradient: true},
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
            
            {/* Kecamatan */}
            <div className={styles.titles}>
                Kecamatan Level Breakdown
            </div>

            <Card width={`100%`} height={300}>
                {mapsScroll[3].show?
                    <ClusterMap data={data.KecamatanCluster} height={260}/>
                    :null
                }
            </Card>

            <Card width={`calc(50% - 32px)`} height={200}>
                {mapsScroll[4].show?
                    <HeatMap data={data.KecamatanHeatMapRevenue} initialZoom={2.6} height={170} colorVariable={"Total Revenue"}/>
                    :null
                }
            </Card>
            <Card width={`calc(50% - 32px)`} height={200}>
                {mapsScroll[5].show?
                    <HeatMap data={data.KecamatanHeatMapQuantity} initialZoom={2.6} height={170} colorVariable={"Avg. Order Value"}/>
                    :null
                }
            </Card>

            <Card width={`calc(100%)`}>
                <LineChart title={""}
                            subtitle={""}
                            totalTitle={""}
                            totalData={""}
                            xTitle={""}
                            yTitle={"Total Revenue"}
                            color={Constants.colors}
                            data={data.KecamatanRevenue}
                            graphAspectRatio={4}
                            lineTickness={1}
                />
            </Card>

            <Card width={`calc(100%)`}>
                <LineChart title={""}
                            subtitle={""}
                            totalTitle={""}
                            totalData={""}
                            xTitle={""}
                            yTitle={"Product Quantity"}
                            color={Constants.colors}
                            data={data.KecamatanQuantity}
                            graphAspectRatio={4}
                            lineTickness={1}
                />
            </Card>

            <Card width={`calc(100%)`}>
                <ColoredTable data={data.KecamatanProductPerformance} 
                            //   title={"Product Performance"}
                              cellColors={{
                                "Kota": {color: "#FFFFFF", gradient: false},
                                "Avg. Product Price": {color: Constants.colors[2], gradient: true},
                                "Product Quantity": {color: Constants.colors[3], gradient: true},
                                "Total Revenue": {color: Constants.colors[4], gradient: true},
                                "Orders Completed": {color: Constants.colors[0], gradient: true},
                                "Purchase Revenue": {color: Constants.colors[1], gradient: true},
                                "Order Cancelled": {color: Constants.colors[2], gradient: true},
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

            {/* Kelurahan */}
            <div className={styles.titles}>
                Kelurahan Level Breakdown
            </div>

            <Card width={`100%`} height={300}>
                {mapsScroll[6].show?
                    <ClusterMap data={data.KelurahanCluster} height={260}/>
                    :null
                }
            </Card>

            <Card width={`calc(50% - 32px)`} height={200}>
                {mapsScroll[7].show?
                    <HeatMap data={data.KelurahanHeatMapRevenue} initialZoom={2.6} height={170} colorVariable={"Total Revenue"}/>
                    :null
                }
            </Card>
            <Card width={`calc(50% - 32px)`} height={200}>
                {mapsScroll[8].show?
                    <HeatMap data={data.KelurahanHeatMapQuantity} initialZoom={2.6} height={170} colorVariable={"Avg. Order Value"}/>
                    :null
                }
            </Card>

            <Card width={`calc(100%)`}>
                <LineChart title={""}
                            subtitle={""}
                            totalTitle={""}
                            totalData={""}
                            xTitle={""}
                            yTitle={"Total Revenue"}
                            color={Constants.colors}
                            data={data.KelurahanRevenue}
                            graphAspectRatio={4}
                            lineTickness={1}
                />
            </Card>

            <Card width={`calc(100%)`}>
                <LineChart title={""}
                            subtitle={""}
                            totalTitle={""}
                            totalData={""}
                            xTitle={""}
                            yTitle={"Product Quantity"}
                            color={Constants.colors}
                            data={data.KelurahanQuantity}
                            graphAspectRatio={4}
                            lineTickness={1}
                />
            </Card>

            <Card width={`calc(100%)`}>
                <ColoredTable data={data.KelurahanProductPerformance} 
                            //   title={"Product Performance"}
                              cellColors={{
                                "Kota": {color: "#FFFFFF", gradient: false},
                                "Avg. Product Price": {color: Constants.colors[2], gradient: true},
                                "Product Quantity": {color: Constants.colors[3], gradient: true},
                                "Total Revenue": {color: Constants.colors[4], gradient: true},
                                "Orders Completed": {color: Constants.colors[0], gradient: true},
                                "Purchase Revenue": {color: Constants.colors[1], gradient: true},
                                "Order Cancelled": {color: Constants.colors[2], gradient: true},
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

            <div className={styles.titles}>
                Jabodetabek vs Non Jabodetabek | Java Island vs Non Java Island
            </div>
            <Card width={`calc(60% - 32px)`}>
                <LineChart title={""}
                            subtitle={""}
                            totalTitle={""}
                            totalData={""}
                            xTitle={""}
                            yTitle={""}
                            color={Constants.colors}
                            data={data.JabodetabekRevenueComparison}
                            graphAspectRatio={2}
                            lineTickness={1}
                />
            </Card>
            <Card width={"calc(40% - 32px)"} minHeight={265}>
                <div className={styles.bigCardTitle}>
                    Buyer's Overview
                </div>
                <div className={styles.bigCardRow}>
                    <div className={styles.bigCardSubsectionLeft}>
                        <div className={styles.bigCardSubtitle}>
                            Total Revenue
                        </div>
                        <div className={styles.bigCardSubValue}>
                            {Constants.formatNumber(data.ComparisonTotal.TotalRevenue, true, 'IDR')}
                        </div>
                    </div>
                    <div className={styles.bigCardSubsectionRight}>
                        <div className={styles.bigCardSubtitle}>
                            Non Jabodetabek Revenue
                        </div>
                        <div className={styles.bigCardSubValue}>
                            {Constants.formatNumber(data.ComparisonTotal.NonJabodetabekRevenue, true, 'IDR')}
                        </div>
                    </div>
                </div>
                <div className={styles.bigCardRow}>
                    <div className={styles.bigCardSubsectionLeft}>
                        <div className={styles.bigCardSubtitle}>
                         Jabodetabek Revenue
                        </div>
                        <div className={styles.bigCardSubValue}>
                            {Constants.formatNumber(data.ComparisonTotal.JabodetabekRevenue, true, 'IDR')}
                        </div>
                    </div>
                    <div className={styles.bigCardSubsectionRight}>
                        <div className={styles.bigCardSubtitle}>
                            Non Pulau Jawa Revenue
                        </div>
                        <div className={styles.bigCardSubValue}>
                            {Constants.formatNumber(data.ComparisonTotal.NonJawaRevenue, true, 'IDR')}
                        </div>
                    </div>
                </div>
                <div className={styles.bigCardSubsectionLeft}>
                        <div className={styles.bigCardSubtitle}>
                            Pulau Jawa Revenue
                        </div>
                        <div className={styles.bigCardSubValue}>
                            {Constants.formatNumber(data.ComparisonTotal.JawaRevenue, true, 'IDR')}
                        </div>
                    </div>

            </Card>

            <div className={styles.titles}>
                Shipping Expedition and Destination
            </div>
            <Card width={"calc(40% - 32px)"} height={"100%"} appearDelay={"3s"}>
                <HorizontalBarChart title={"Shipping Expedition"}
                                    barColor={Constants.colors}
                                    graphAspectRatio={1}
                                    data={data.ShippingExpedition}
                />
            </Card>
            <Card width={`calc(60% - 32px)`}>
                <ColoredTable data={data.ShippingExpeditionDestination} 
                              title={"Shipping Expedition by Recipient Destination"}
                              rowPerPage={1000}
                              tableHeight={300}
                              cellColors={
                                Constants.mapToObject(new Map( 
                                    Object.keys(data.ShippingExpeditionDestination[0]).map((e, index) => {
                                        if (e == 'Province') {
                                            // return [e, {color: Constants.colors[index], gradient: false}];
                                            return [null, {color: Constants.colors[index], gradient: false}]
                                        } else {
                                            return [e, {color: Constants.colors[4], gradient: true}];
                                        }
                                })))
                              }
                              customCellVisual={
                                Constants.mapToObject(new Map( 
                                    Object.keys(data.ShippingExpeditionDestination[0]).map((e, index) => {
                                        if (e == 'Province') {
                                            // return [e, {color: Constants.colors[index], gradient: false}];
                                            return [e, (key, value) => {return <div style={{textAlign: 'center', textOverflow: 'ellipsis'}}>{value}</div>}]
                                        } else {
                                            return [e, (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>}];
                                        }
                                })))
                              }
                />
            </Card>
        </div>
    )
}
