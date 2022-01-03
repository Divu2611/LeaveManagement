import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HorizontalTable from './common/horizontalTable';

const Status = ({leaves,user,onStatusChange}) => {

    const columns = [
       {
            key: 1,
            label: "Leave Type",
            property: "leave"
        },
        user.isAdmin && {
            key : 2,
            label: "EMail-ID",
            property: "employee.email"
        },
        user.isAdmin && {
            key: 3,
            label: "Employee",
            property: "employee.type"
        },
        {
            key: 4,
            label: "Start Date",
            property: "startDate"
        },
        {
            key: 5,
            label: "End Date",
            property: "endDate"
        },
        {
            key: 6,
            label: "Reason",
            property: "reason"
        },
        {
            key: 7,
            label: "Status",
            property: (record) => {
                        if(record.status === 'Approved' || record.status === 'Rejected')    return record.status;
                        else if(record.status === 'Pending'){
                            if(user.isAdmin){
                                return (
                                    <React.Fragment>
                                        <button onClick={() => onStatusChange("Approved",record)}
                                                className="btn btn-success btn-sm mx-2">
                                            Approve
                                        </button>
                                        
                                        <button onClick={() => onStatusChange("Rejected",record)}
                                                className="btn btn-danger btn-sm mx-2">
                                            Reject
                                        </button>
                                    </React.Fragment>
                                )
                            }else{
                                return "Pending";
                            }
                        }
                    }
        }
    ];

    return (
        <React.Fragment>
            <ToastContainer/>
            <HorizontalTable data={leaves} columns={columns}/>
        </React.Fragment>
    );
}
 
export default Status;