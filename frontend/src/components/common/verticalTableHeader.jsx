import React from 'react';

const VerticalTableHeader = ({heading}) => {
    return (
        <thead>
            <tr className="tableHeading">
                <h3>
                    <th className="text-center">{heading}</th>
                </h3>
            </tr>
        </thead>
    );
}
 
export default VerticalTableHeader;