import React from 'react';
import {NavLink} from 'react-router-dom';

const NavBar = ({user,emp}) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
            {user && !user.isAdmin &&
            <div className="navbar-brand" to="#">
                Welcome {user.Name}!!
            </div>}

            {user && user.isAdmin &&
            <div className="navbar-brand" to="#">
                Welcome Admin!!
            </div>}

            {!user && <div className="navbar-brand" to="#">
                LNMIIT
            </div>}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    {user && !user.isAdmin &&
                    <React.Fragment>
                        {emp && emp.EmployeeType==="faculty" &&
                        <React.Fragment>    
                            <NavLink className="nav-item nav-link" to="/employee/faculty/personal">Personal</NavLink>
                            <NavLink className="nav-item nav-link" to="/employee/faculty/contact">Contact</NavLink>
                            <NavLink className="nav-item nav-link" to="/employee/faculty/academic">Academic</NavLink>
                            <NavLink className="nav-item nav-link" to="/employee/faculty/publications">Publications</NavLink>
                        </React.Fragment>}

                        {emp && emp.EmployeeType==="scholar" &&
                        <React.Fragment>    
                            <NavLink className="nav-item nav-link" to="/employee/scholar">Details</NavLink>
                        </React.Fragment>}

                        {emp && emp.EmployeeType==="staff" &&
                        <React.Fragment>    
                            <NavLink className="nav-item nav-link" to="/employee/staff/personal">Personal</NavLink>
                            <NavLink className="nav-item nav-link" to="/employee/staff/contact">Contact</NavLink>
                            <NavLink className="nav-item nav-link" to="/employee/staff/academic">Academic</NavLink>
                        </React.Fragment>}
                    </React.Fragment>}
                    
                    {user && user.isAdmin &&
                    <React.Fragment>
                        <NavLink className="nav-item nav-link" to="/admin/employees">Employees</NavLink>
                        <NavLink className="nav-item nav-link" to="/admin/leave-status">Leave Status</NavLink>
                    </React.Fragment>}
                    
                    {user && <NavLink className="nav-item nav-link" to="/logout">Logut</NavLink>}
                    
                    {!user && 
                    <React.Fragment>
                        <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
                        <NavLink className="nav-item nav-link" to="/register">Register</NavLink>
                    </React.Fragment>}
                </div>
            </div>

            {emp && 
            <form className="form-inline my-2 my-lg-0">
                <NavLink className="btn btn-primary my-2 my-sm-0 mx-3" to="/employee/apply-for-leave">Apply For Leave</NavLink>
                <NavLink className="btn btn-primary my-2 my-sm-0" to="/employee/check-leave-status">Check Leave Status</NavLink>
            </form>}
        </nav>
    );
}
 
export default NavBar;