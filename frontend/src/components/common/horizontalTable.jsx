import React from 'react';

import HorizontalTableHeader from './horizontalTableHeader';
import HorizontalTableBody from './horizontalTableBody';

const HorizontalTable = ({data,columns}) => {
    return (
        <table className="table">
            <HorizontalTableHeader columns={columns}/>
            <HorizontalTableBody data={data} columns={columns}/>
        </table>
    );
}
 
export default HorizontalTable;