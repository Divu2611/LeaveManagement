import React from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HorizontalTable from '../common/horizontalTable';

const Scholar = ({scholars,onDelete}) => {

    const columns = [
        {
            key: 1,
            label: "Employee ID",
            content: (scholar) => {
                        return <Link to={`/admin/scholar/${scholar._id}`}>{scholar._id}</Link>
                    }
        },
        {
            key: 2,
            label: "Name",
            property: "name"
        },
        {
            key: 3,
            label: "Roll No.",
            property: "rollNo"
        },
        {
            key: 4,
            label: "E-Mail",
            property: "email"
        },
        {
            key: 6,
            content: (scholar) => {
                        return (
                            <button onClick={() => onDelete(scholar)}
                                    className="btn btn-danger btn-sm mx-2">
                                Delete
                            </button>
                        )
                    }
        }
    ]

    if(!scholars.length){
        return(
            <div className="tableheading mt-5">
                <h3>No Scholars</h3>
            </div>
        );
    }
    return (
        <React.Fragment>
            
            <ToastContainer/>
            <div className="mt-5">
                <HorizontalTable data={scholars} columns={columns}/>
            </div>
        </React.Fragment>
    );
}
 
export default Scholar;