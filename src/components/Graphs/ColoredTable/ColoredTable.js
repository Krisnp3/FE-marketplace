import { useEffect, useState } from 'react';
import styles from './ColoredTable.module.css';
import Constants from '../../../Global';

export default function ColoredTable({data, totalData, title, customColumnTitleVisual, customCellVisual, cellColors, rowPerPage = 10, titleFontSize = 12, tableHeight}) {

    const dummyData = [
        {kota: "Jakarta", "Total Recipient": 2022, "Total Revenue": 1020232, "order_id": "213", },
        {kota: "Jakarta", "Total Recipient": 1942, "Total Revenue": 1624232, "order_id": "213", },
        {kota: "Jakarta", "Total Recipient": 1832, "Total Revenue": 1623262, "order_id": "213", },
        {kota: "Jakarta", "Total Recipient": 2202, "Total Revenue": 1320234, "order_id": "213", },
        {kota: "Jakarta", "Total Recipient": 2502, "Total Revenue": 1568632, "order_id": "213", },
        {kota: "Jakarta", "Total Recipient": Math.random()*1000 + 1000 , "Total Revenue": Math.random()*1000000 + 1000000, "order_id": "213", },
        {kota: "Jakarta", "Total Recipient": Math.random()*1000 + 1000 , "Total Revenue": Math.random()*1000000 + 1000000, "order_id": "213", },
        {kota: "Jakarta", "Total Recipient": Math.random()*1000 + 1000 , "Total Revenue": Math.random()*1000000 + 1000000, "order_id": "213", },
        {kota: "Jakarta", "Total Recipient": Math.random()*1000 + 1000 , "Total Revenue": Math.random()*1000000 + 1000000, "order_id": "213", },
        {kota: "Jakarta", "Total Recipient": Math.random()*1000 + 1000 , "Total Revenue": Math.random()*1000000 + 1000000, "order_id": "213", },
        {kota: "Jakarta", "Total Recipient": Math.random()*1000 + 1000 , "Total Revenue": Math.random()*1000000 + 1000000, "order_id": "213", },
        {kota: "Jakarta", "Total Recipient": Math.random()*1000 + 1000 , "Total Revenue": Math.random()*1000000 + 1000000, "order_id": "213", },
        {kota: "Jakarta", "Total Recipient": Math.random()*1000 + 1000 , "Total Revenue": Math.random()*1000000 + 1000000, "order_id": "213", },
        {kota: "Jakarta", "Total Recipient": Math.random()*1000 + 1000 , "Total Revenue": Math.random()*1000000 + 1000000, "order_id": "213", },
        {kota: "Jakarta", "Total Recipient": Math.random()*1000 + 1000 , "Total Revenue": Math.random()*1000000 + 1000000, "order_id": "213", },
        {kota: "Jakarta", "Total Recipient": Math.random()*1000 + 1000 , "Total Revenue": Math.random()*1000000 + 1000000, "order_id": "213", },
        {kota: "Jakarta", "Total Recipient": Math.random()*1000 + 1000 , "Total Revenue": Math.random()*1000000 + 1000000, "order_id": "213", },
        {kota: "Jakarta", "Total Recipient": Math.random()*1000 + 1000 , "Total Revenue": Math.random()*1000000 + 1000000, "order_id": "213", },
        {kota: "Jakarta", "Total Recipient": Math.random()*1000 + 1000 , "Total Revenue": Math.random()*1000000 + 1000000, "order_id": "213", },
        // {kota: "Jakarta", "Total Recipient": Math.random()*1000 + 1000 , "Total Revenue": Math.random()*1000000 + 1000000, "order_id": "213", },
    ]

    const dummyCellColors = {
        "kota": {color: "#FFFFFF", gradient: false},
        "Total Recipient": {color: "#de3226", gradient: true},
        "Total Revenue": {color: "#4dbbfa", gradient: true},
    }

    const dummyCustomCellVisual = {
        // "kota": (key, value) => {return "kota " + value},
        "Total Recipient": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, false)}</div>},
        "Total Revenue": (key, value) => {return <div style={{textAlign: 'right'}}>{Constants.formatNumber(value, true, 'IDR')}</div>},
    }

    const [tableData, setTableData] = useState(data?? dummyData);

    const [dataPerKey, setDataPerKey] = useState({});

    const [dataPerKeyFinished, setDataPerKeyFinished] = useState(false);

    const [sortDirection, setSortDirection] = useState(null); //asc / desc
    const [sortKey, setSortKey] = useState(null);

    const [curPage, setCurPage] = useState(0);

    useEffect(() => {

    }, [])

    useEffect(() => {
        setTableData(dummyData);
    }, [data])

    useEffect(() => {
        if (tableData) {
            let tempDataPerKey = {};
            for (let row = 0; row < tableData.length; row++) {
                for (let col = 0; col < Object.keys(tableData[row]).length; col++) {
                    let curColkey = Object.keys(tableData[row])[col]
                    if (tempDataPerKey[curColkey]) {
                        tempDataPerKey[curColkey].push(tableData[row][curColkey]);
                    } else {
                        tempDataPerKey[curColkey] = [tableData[row][curColkey]];
                    }
                }
            }
            setDataPerKey({...tempDataPerKey});
            setDataPerKeyFinished(true);
        }

    }, [tableData])

    useEffect(() => {
        let sortedData = tableData;

        if (sortDirection == 'asc') {
            sortedData.sort((a, b) => {return a[sortKey] - b[sortKey]})
        } else if (sortDirection == 'desc') {
            sortedData.sort((a, b) => {return b[sortKey] - a[sortKey]})
        }
        setTableData([...sortedData])
    }, [sortKey, sortDirection])

    const getCellColor = (key, value) => {
        let colors = cellColors?? dummyCellColors;
        if (colors[key]) {
            if (colors[key].gradient) {
                const minThreshold = 0.3;

                let opacity = "";
                // console.log(dataPerKey[key])
                let maxVal = Math.max(...dataPerKey[key]);
                let minVal = Math.min(...dataPerKey[key]);
                let normalize = (value - minVal) / (maxVal - minVal);

                opacity = Math.floor((normalize*255)*(1-minThreshold) + (255*minThreshold)).toString(16)
                if (opacity.length < 2) {
                    opacity = "0" + opacity;
                }
                return colors[key]?.color + opacity; 
            } else {
                return colors[key]?.color; 
            }
        }
    }

    const sortBy = (key, index) => {
        if (sortKey != key) {
            setSortKey(key);
            setSortDirection('desc');
        } else {
            if (sortDirection == 'asc') {
                setSortDirection('desc')
            } else if(sortDirection == 'desc') {
                setSortDirection('asc');
            } else {
                setSortDirection('desc');
            }
        } 
    } 

    const decreasePage = () => {
        if (curPage > 0) {
            setCurPage(curPage-1);
        }
    }

    const increasePage = () => {
        if (curPage < Math.ceil(tableData.length/rowPerPage)-1) {
            setCurPage(curPage+1);
        }
    }

    return (
        <div>
            {title? 
                <div className={styles.title}>
                    {title}
                </div>
                :null
            }
            <div className={styles.tableContainer} style={{height: tableHeight}}>
                <table cellSpacing={0} width={"100%"} style={{overflowX: "hidden"}}>
                    {customColumnTitleVisual && customColumnTitleVisual['topTable']?
                        <thead className={styles.tableHeader}>
                            {customColumnTitleVisual['topTable']()}
                        </thead>
                        :null
                    }
                    <thead className={styles.tableHeader}>
                        {Object.keys(tableData[0]).map((e, index) => {
                            return (
                                <th className={styles.tableHeaderCell} onClick={() => sortBy(e, index)} style={{fontSize: `${titleFontSize}px`}}>
                                    {customColumnTitleVisual && customColumnTitleVisual[e]? customColumnTitleVisual[e](e, index) : e}
                                    {sortKey==e && sortDirection?
                                        <span style={{marginLeft: '5px'}}>
                                        {sortDirection == 'asc'?
                                            <img src='/assets/icons/sort-icon.png' style={{width: '8px', transform: 'rotate(180deg)'}} />
                                            :
                                            <img src='/assets/icons/sort-icon.png' style={{width: '8px', transform: 'rotate(0deg)'}}/>
                                        }
                                        </span>
                                        :null
                                    }
                                </th>
                            )
                        })}
                    </thead>
                    <tbody style={{overflowY: 'auto'}} >
                        {dataPerKeyFinished && tableData.slice((curPage * rowPerPage), ((curPage+1)*rowPerPage)).map((row, rowIndex) => {
                            return (
                                <tr style={{borderBottom: "#000000 1px solid"}}>
                                    {Object.keys(row).map((cellKey, colIndex) => {
                                        return (
                                            <td className={styles.tableCell} style={{backgroundColor: getCellColor(cellKey, row[cellKey]), tableLayout: 'fixed'}}>
                                                {customCellVisual && customCellVisual[cellKey]? customCellVisual[cellKey](cellKey, row[cellKey]) : row[cellKey]}
                                                {/* {dummyCustomCellVisual[cellKey]? dummyCustomCellVisual[cellKey](cellKey, row[cellKey]): row[cellKey]} */}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                        
                    </tbody>
                    {totalData?
                        <tbody>
                            <tr className={`${styles.totalRow}`}>
                                
                                {Object.keys(tableData[0]).map((cellKey, colIndex) => {
                                    if (colIndex == 0) {
                                        return (
                                            <td className={`${styles.tableCell} ${styles.tableCellTotal}`}>
                                                Grand Total
                                            </td>
                                        )
                                    } else {
                                        return (
                                            <td className={`${styles.tableCell} ${styles.tableCellTotal}`} >
                                                {customCellVisual && customCellVisual[cellKey]? customCellVisual[cellKey](cellKey, totalData? totalData[cellKey]?? "-" : "-") : totalData? totalData[cellKey]?? "-" : "-"}
                                            </td>
                                        )
                                    }
                                })}
                            </tr>
                            
                        </tbody>
                        :null
                    }
                    
                </table>
            </div>
            <div className={styles.paginationCon}>
                    <div className={styles.paginationLeft}>
                        <div className={styles.pageShown}>
                            {`${(rowPerPage*curPage)+1}-${rowPerPage*(curPage+1)>tableData.length? tableData.length: rowPerPage*(curPage+1)} of ${tableData.length}`}
                        </div>
                    </div>
                    <div className={styles.paginationRight}>
                        <div className={styles.paginationRowsPerPage}>
                            Rows per page: {rowPerPage}
                        </div>
                        <div className={styles.pagination}>
                            <div className={`${styles.pageButton} ${curPage <= 0? styles.pageButtonDisabled:''}`} onClick={decreasePage}>
                                <img src='/assets/icons/left-arrow-icon.svg' className={`${curPage <= 0? styles.pageButtonImgDisabled: ''}`}/>
                            </div>
                            <div>
                                {curPage+1}/{Math.ceil(tableData.length/rowPerPage)}
                            </div>
                            <div className={`${styles.pageButton} ${curPage >= Math.ceil(tableData.length/rowPerPage)-1? styles.pageButtonDisabled:''}`} onClick={increasePage}>
                                <img src='/assets/icons/left-arrow-icon.svg' className={`${styles.pageButtonImgRight} ${curPage >= Math.ceil(tableData.length/rowPerPage)-1? styles.pageButtonImgDisabled: ''}`}/>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}