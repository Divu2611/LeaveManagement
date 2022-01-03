import React from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HorizontalTable from '../common/horizontalTable';

const Staff = ({staffs,onDelete}) => {

    const columns = [
        {
            key: 1,
            label: "Employee ID",
            content: (staff) => {
                        return <Link to={`/admin/staff/${staff._id}`}>{staff._id}</Link>
                    }
        },
        {
            key: 2,
            label: "Name",
            property: "personal.name"
        },
        {
            key: 3,
            label: "EMail-ID",
            property: "contact.email"
        },
        {
            key: 4,
            label: "Designation",
            property: "personal.designation"
        },
        {
            key: 5,
            label: "Department",
            property: "personal.department"
        },
        {
            key: 6,
            content: (staff) => {
                        return (
                            <button onClick={() => onDelete(staff)}
                                    className="btn btn-danger btn-sm mx-2">
                                Delete
                            </button>
                        )
                    }
        }
    ]

    if(!staffs.length){
        return(
            <div className="tableheading mt-5">
                <h3>No Staffs</h3>
            </div>
        );
    }
    return (
        <React.Fragment>
            
            <ToastContainer/>
            <div className="mt-5">
                <HorizontalTable data={staffs} columns={columns}/>
            </div>
        </React.Fragment>
    );
}
 
export default Staff;