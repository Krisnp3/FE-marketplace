import { useEffect, useState } from 'react';
// import Table from '../../components/Table/Table';
import styles from './Stores.module.css';
// import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Table from '../../components/Table/Table';
import Button from '../../components/Button/Button';
import EditStore from '../../components/EditStore/EditStore';
import Api from '../../helper/ApiCalls/Api';

// const CustomTableCell = styled(theme => ({
//     head: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//     },
//     body: {
//       fontSize: 14,
//     },
// }))(TableCell);
  

export default function Stores({isComparison, comparisonDataUpdate}) {
    const dummyStores = [
        {"PICK": false, "MARKETPLACE": "TOKOPEDIA", "API KEY": "1234455", "STORE NAME": "Flimty Jakarta", "ACTION": 0},
        {"PICK": false, "MARKETPLACE": "SHOPEE", "API KEY": "1234455", "STORE NAME": "Flimty Jakarta", "ACTION": 1},
        {"PICK": false, "MARKETPLACE": "BLIBLI", "API KEY": "1234455", "STORE NAME": "Flimty Bandung", "ACTION": 2},
        {"PICK": false, "MARKETPLACE": "SHOPEE", "API KEY": "1234455", "STORE NAME": "Flimty Surabaya", "ACTION": 3},
        {"PICK": false, "MARKETPLACE": "SHOPEE", "API KEY": "1234455", "STORE NAME": "Flimty Surabaya", "ACTION": 4},
        {"PICK": false, "MARKETPLACE": "SHOPEE", "API KEY": "1234455", "STORE NAME": "Flimty Surabaya", "ACTION": 5},
        {"PICK": false, "MARKETPLACE": "SHOPEE", "API KEY": "1234455", "STORE NAME": "Flimty Surabaya", "ACTION": 6},
        {"PICK": false, "MARKETPLACE": "BLIBLI", "API KEY": "1234455", "STORE NAME": "Flimty Surabaya", "ACTION": 7},
        {"PICK": false, "MARKETPLACE": "TOKOPEDIA", "API KEY": "1234455", "STORE NAME": "Flimty Surabaya", "ACTION": 8},
        {"PICK": false, "MARKETPLACE": "SHOPEE", "API KEY": "1234455", "STORE NAME": "Flimty Surabaya", "ACTION": 9},
        {"PICK": false, "MARKETPLACE": "BLIBLI", "API KEY": "1234455", "STORE NAME": "Flimty Surabaya", "ACTION": 10},
        {"PICK": false, "MARKETPLACE": "SHOPEE", "API KEY": "1234455", "STORE NAME": "Flimty Surabaya", "ACTION": 11},
        {"PICK": false, "MARKETPLACE": "TOKOPEDIA", "API KEY": "1234455", "STORE NAME": "Flimty Surabaya", "ACTION": 12},
        {"PICK": false, "MARKETPLACE": "TOKOPEDIA", "API KEY": "1234455", "STORE NAME": "Flimty Surabaya", "ACTION": 13},
        {"PICK": false, "MARKETPLACE": "SHOPEE", "API KEY": "1234455", "STORE NAME": "Flimty Surabaya", "ACTION": 14},
    ];

    const [storeList, setStoreList] = useState([]);

    const [storeListShown, setStoreListShown] = useState([]);
    const [curPage, setCurPage] = useState(0);
    const [pageLength, setPageLength] = useState(10);


    const [editOn, setEditOn] = useState(false);
    const [editStoreId, setEditStoreId] = useState(-1);
    const [editStoreData, setEditStoreData] = useState({});
    const [removeOn, setRemoveOn] = useState(false);

    const [selectedStores, setSelectedStore] = useState([]);
    const [selectedStoresErr, setSelectedStoreErr] = useState("");

    const [tableScale, setTableScale] = useState(1);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchStores();
        onWindowResize();
        window.addEventListener('resize', onWindowResize)
    }, [])

    useEffect(() => {
        changePage();
    }, [storeList])

    useEffect(() => {
        changePage();
    }, [curPage])

    useEffect(() => {
        console.log(selectedStores)
    }, [selectedStores])

    const fetchStores = () => {
        setIsLoading(true);

        //axios
        // Api.apiGet('/', onFetchStoreSuccess, onFetchStoreFailed, true)

        setTimeout(() => {
            onFetchStoreSuccess([]);
        }, 2000);
    }

    const onFetchStoreSuccess = (res) => {
        setStoreList(dummyStores);
        setIsLoading(false);
    }

    const onFetchStoreFailed = (err) => {
        setIsLoading(false);
    }

    const onWindowResize = () => {
        if (window.innerWidth > 950) {
            setTableScale(1);
        } else {
            setTableScale(window.innerWidth/950);
        }
    }

    const changePage = () => {
        let tempStoreListShown = [];
        for (let i = pageLength*curPage; i < pageLength*(curPage + 1); i++) {
            if (storeList[i]) {
                tempStoreListShown.push(storeList[i]);
            } else {
                // tempStoreListShown.push({})
            }
        }
        if (tempStoreListShown.length > 0) {
            setStoreListShown([...tempStoreListShown]);
        }
    }

    const decreasePage = () => {
        if (curPage > 0) {
            setCurPage(curPage-1);
        }
    }

    const increasePage = () => {
        if (curPage < Math.ceil(storeList.length/pageLength)-1) {
            setCurPage(curPage+1);
        }
    }

    const onClickAddMarket = () => {
        setEditOn(true);
    }

    const onClickEditStore = (data) => {
        setEditStoreData(data);
        setEditOn(true);
    }

    const onClickRemoveStore = (data) => {
        setEditStoreData(data)
        setRemoveOn(true);
    }

    const onEditClose = () => {
        setEditOn(false);
        setRemoveOn(false);
        setEditStoreData({})
    }

    const onPickStore = (e, dataIndex) => {
        
        let temp = storeListShown;
        temp[dataIndex].PICK = e.target.checked;
        setStoreListShown([...temp]);

        temp = selectedStores;
        if (e.target.checked) {
            if (!temp.includes(storeListShown[dataIndex])) {
                temp.push(storeListShown[dataIndex])
            }
        } else {
            // temp.remove(storeListShown[dataIndex])
            const index = temp.indexOf(storeListShown[dataIndex]);
            if (index > -1) {           // only splice array when item is found
                temp.splice(index, 1);  // 2nd parameter means remove one item only
            }
        }
        setSelectedStore([...temp])
    }

    const onPickAllStores = (e) => {
        let temp = storeListShown;

        for (let i = 0; i < temp.length; i++) {
            onPickStore(e, i);
        }
        

    }

    const onClickShowAnalytics = () => {
        if (selectedStores.length < 1) {
            setSelectedStoreErr("Please choose at least 1 store");
            return ;
        } else if (selectedStores.length > 1) {
            setSelectedStoreErr("More than 1 store analytics is not available yet");
            return ;
        } else {
            setSelectedStoreErr("")
        }

        if (isComparison && comparisonDataUpdate) {
            comparisonDataUpdate(selectedStores);
        } else {
            window.location.assign('/analytics');
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.tableContainer} style={{transform: `scale(${tableScale})`}}>
                <div className={styles.tableTopBar}>
                    <Button text={<div className={styles.addButtonText}><img src='/assets/icons/add-icon.svg'/>Add Marketplace Data</div>}
                            style={{
                                width: 'min-content'
                            }}
                            onClick={onClickAddMarket}
                    />
                    <div>
                        <input className='' placeholder='Search..'/>
                    </div>
                </div>
                <Table data={storeListShown} 
                        dataColumns={["PICK", "MARKETPLACE", "API KEY", "STORE NAME", "ACTION"]} 
                        cellPadding={"10px 20px"}
                        cellHeight={"25px"}
                        cellWidth={['50px', '200px', '300px', '300px', '100px']}
                        fontSize={"16px"}
                        titleBackgroundColor={"#F4F7FC"}
                        titleColor={"#464F60"}
                        cellBackgroundColor={["#FFFFFF", "#F9FAFC"]}
                        cellBackgroundColorHover={"#b8b6b6"}
                        cellJustifyText={"left"}
                        width={900}
                        // height={300}
                        isLoading={isLoading}
                        customTitleVisual={{
                            "PICK": (val, index) => {
                                return (
                                    <div className={styles.marketplaceCell}>
                                        <input type='checkbox' onChange={(e) => onPickAllStores(e)}/>
                                    </div>
                                )
                            },
                        }}
                        customDataVisual={{
                            "PICK": (val, index) => {
                                return (
                                    <div className={styles.marketplaceCell}>
                                        <input type='checkbox' onChange={(e) => {onPickStore(e, index)}} checked={val}/>
                                    </div>
                                )
                            },
                            "MARKETPLACE": (val, index) => {
                                return (
                                    <div className={styles.marketplaceCell}>
                                        {val}
                                    </div>
                                )
                            },

                            "ACTION": (val, index) => {
                                return (
                                    <div className={styles.actionRow}>
                                        <img src='/assets/icons/edit-icon.svg' onClick={() => {onClickEditStore(storeListShown[index])}}/>
                                        <img src='/assets/icons/trash-icon.svg' onClick={() => {onClickRemoveStore(storeListShown[index])}}/>
                                    </div>
                                )
                            }
                        }}
                    />
                {/* <Paper className={styles.tableRoot}>
                    <Table className={styles.table}>
                        <TableHead className={styles.tableHead}>
                            <TableRow>
                                <TableCell align="center">MARKETPLACE</TableCell>
                                <TableCell align="center">API KEY</TableCell>
                                <TableCell align="center">STORE NAME</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {storeList.map(row => (
                            <TableRow className={styles.row} key={row.id}>
                                <TableCell align="center">{row.MARKETPLACE}</TableCell>
                                <TableCell align="center">{row["API KEY"]}</TableCell>
                                <TableCell align="center">{row["STORE NAME"]}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Paper> */}
                <div className={styles.paginationCon}>
                    <div className={styles.paginationLeft}>
                        <div className={styles.pageShown}>
                            {`${(pageLength*curPage)+1}-${pageLength*(curPage+1)>storeList.length? storeList.length: pageLength*(curPage+1)} of ${storeList.length}`}
                        </div>
                    </div>
                    <div className={styles.paginationRight}>
                        <div className={styles.paginationRowsPerPage}>
                            Rows per page: {pageLength}
                        </div>
                        <div className={styles.pagination}>
                            <div className={`${styles.pageButton} ${curPage <= 0? styles.pageButtonDisabled:''}`} onClick={decreasePage}>
                                <img src='/assets/icons/left-arrow-icon.svg' className={`${curPage <= 0? styles.pageButtonImgDisabled: ''}`}/>
                            </div>
                            <div>
                                {curPage+1}/{Math.ceil(storeList.length/pageLength)}
                            </div>
                            <div className={`${styles.pageButton} ${curPage >= Math.ceil(storeList.length/pageLength)-1? styles.pageButtonDisabled:''}`} onClick={increasePage}>
                                <img src='/assets/icons/left-arrow-icon.svg' className={`${styles.pageButtonImgRight} ${curPage >= Math.ceil(storeList.length/pageLength)-1? styles.pageButtonImgDisabled: ''}`}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.showAnalytics}>
                    <Button text={"Show Analytics"}
                            style={{
                                width: '880px'
                            }}
                            onClick={onClickShowAnalytics}
                    />
                    <div className={styles.analyticsError}>
                        {selectedStoresErr}
                    </div>
                </div>
            </div>
            {editOn?
                <EditStore onChange={onEditClose} 
                            removeStore={false}
                            storeData={editStoreData}
                />
                : 
                null            
            }
            {removeOn?
                <EditStore onChange={onEditClose} 
                            removeStore={true}
                            storeData={editStoreData}
                />
                : 
                null            
            }
        </div>
    )
}