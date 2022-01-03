import React from 'react';
const _ = require('lodash');

const HorizontalTableBody = ({data,columns}) => {

    const renderCellContent = (item,column) => {

        if(column.label==="Status"){            
            const status = column.property(item);     
            const css = status === 'Approved' ? "success" : status === 'Rejected' ? "danger" : status === "Pending" ? "warning" : "";
            
            return <div className={"btn btn-" + (css)}>{status}</div>;
        }else if(column.content){
            return column.content(item);
        }
        return _.get(item,column.property);
    }

    return (
        <tbody>
            {data.map(item => (
                <tr key={item._id}>
                    {columns.map(column => (
                        column &&
                        <td key={column.key}
                            className={"col-md-auto"}>
                            {renderCellContent(item,column)}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}
 
export default HorizontalTableBody;