import React from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HorizontalTable from '../common/horizontalTable';

const Faculty = ({faculties,onDelete}) => {

    const columns = [
        {
            key: 1,
            label: "Employee ID",
            content: (faculty) => {
                        return <Link to={`/admin/faculty/${faculty._id}`}>{faculty._id}</Link>
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
            content: (faculty) => {
                        return (
                            <button onClick={() => onDelete(faculty)}
                                    className="btn btn-danger btn-sm mx-2">
                                Delete
                            </button>
                        )
                    }
        }
    ]

    if(!faculties.length){
        return(
            <div className="tableheading mt-5">
                <h3>No Faculties</h3>
            </div>
        );
    }
    return (
        <React.Fragment>
            
            <ToastContainer/>
            <div className="mt-5">
                <HorizontalTable data={faculties} columns={columns}/>
            </div>
        </React.Fragment>
    );
}
 
export default Faculty;