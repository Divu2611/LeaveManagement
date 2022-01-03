import React from 'react';

const HorizontalTableHeader = ({columns}) => {

    return ( 
        <thead>
            <tr>
                {columns.map(column => (
                    column &&
                    <th key={column.key}
                        className="col-md-auto">
                        {column.label}
                    </th> 
                ))}
            </tr>
        </thead>
    );
}
 
export default HorizontalTableHeader;