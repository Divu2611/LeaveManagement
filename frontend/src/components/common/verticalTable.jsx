import React from 'react';

import VerticalTableHeader from './verticalTableHeader';
import VerticalTableBody from './verticalTablebody';

const VerticalTable = ({data,heading}) => {
    return (
        <table className="mt-5 table">
            <VerticalTableHeader heading={heading}/>
            <VerticalTableBody data={data}/>
        </table>
    );
}
 
export default VerticalTable;