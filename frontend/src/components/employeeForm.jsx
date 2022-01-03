import React from 'react';
import { Link } from 'react-router-dom';

import faculty from '../images/faculty.png';
import staff from '../images/staff.png';
import scholar from '../images/scholar.png';

const EmployeeRegisteration = ({user}) => {
    return (
        <React.Fragment>

            <div className="row row-cols-1 row-cols-md-3 g-4 mt-5">
                <Link to={!user.isAdmin ? "/user/faculty" : "/admin/faculty"} style={{color:"#000", textDecoration:"none"}}>
                    <div className="col">
                        <div className="card h-100">
                        <img src={faculty} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">Faculty</h5>
                        </div>
                        </div>
                    </div>
                </Link>

                <Link to={!user.isAdmin ? "/user/staff" : "/admin/staff"} style={{color:"#000", textDecoration:"none"}}>
                    <div className="col">
                        <div className="card h-100">
                        <img src={staff} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">Staff</h5>
                        </div>
                        </div>
                    </div>
                </Link>

                <Link to={!user.isAdmin ? "/user/scholar" : "/admin/scholar"} style={{color:"#000", textDecoration:"none"}}>
                    <div className="col">
                        <div className="card h-100">
                        <img src={scholar} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">Scholar</h5>
                        </div>
                        </div>
                    </div>
                </Link>
            </div>
        </React.Fragment>
    );
}
 
export default EmployeeRegisteration;