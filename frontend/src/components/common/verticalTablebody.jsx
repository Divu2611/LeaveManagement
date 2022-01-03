import React from 'react';

const VerticalTableBody = ({data}) => {

    return (
        <tbody>
            {data.map(item => (
                <tr key={item.key}>
                    <th>{item.attribute}</th>
                    <td>{item.value}</td>
                </tr>
            ))}
        </tbody>
    );
}
 
export default VerticalTableBody;