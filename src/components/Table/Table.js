import { useState } from 'react';
import "./Table.css"

// customDataVisual={{
//     columnName: (value, rowIndex) => { return <div></div>}
// }}

function Table(props) { // props: data, customDataVisual, dataColumns, cellPadding
    const onMouseOverCell = (event) => {
        let row = document.getElementsByClassName(event.target.className.split(" ")[0]);
        for (let i = 0; i < row.length; i++) {
            row[i].style.backgroundColor = props.cellBackgroundColorHover;
        }
    }

    const onMouseOutCell = (event) => {
        let className = event.target.className.split(" ")[0];
        let index = parseInt(className.split("w")[1]);
        let row = document.getElementsByClassName(className);
        let color = props.cellBackgroundColor[index%props.cellBackgroundColor.length];
        for (let i = 0; i < row.length; i++) {
            row[i].style.backgroundColor = color;
        }
    }


    return (
        <div className="table" 
            style={{
                fontSize: props.fontSize,
                width: `${props.width}px`,
                maxHeight: `${props.height}px`,
                minHeight: `${props.minHeight}px`,
            }}
            onClick={props.onClick}
        >
            
            {props.dataColumns? props.dataColumns.map((val, colIndex) => {
                return (
                    <div className="column" style={{width: props.cellWidth? (props.cellWidth.length? props.cellWidth[colIndex] : props.cellWidth) : `${props.width/props.dataColumns.length}px`}}>
                        <div className='cell' style={{padding: props.cellPadding, backgroundColor: props.titleBackgroundColor, color: props.titleColor, height: props.titleHeight}}>
                            {/* {val} */}
                            {props.customTitleVisual && props.customTitleVisual[val]? props.customTitleVisual[val](val, colIndex) : val}
                        </div>
                        
                        {props.data? 
                        
                        props.data.map((dataVal, rowIndex) => {
                            return (
                                <div className={`row${rowIndex} cell`} 
                                    key={rowIndex}
                                    style={{padding: props.cellPadding, 
                                            height: props.cellHeight, 
                                            // width: props.cellWidth?.length? props.cellWidth[colIndex] : props.cellWidth,
                                            textAlign: props.cellJustifyText,
                                            backgroundColor: props.cellBackgroundColor[rowIndex%props.cellBackgroundColor.length],
                                            whiteSpace: 'nowrap',
                                            display: 'flex',
                                            justifyContent: 'left'
                                            }}
                                    onMouseOver={onMouseOverCell}
                                    onMouseOut={onMouseOutCell}
                                    >
                                    {props.customDataVisual && props.customDataVisual[val]? props.customDataVisual[val](dataVal[val], rowIndex) : dataVal[val]}
                                </div>
                            )})
                            :null
                        }
                    </div>
                )
            }):null}
        </div>
    );
}

export default Table;
