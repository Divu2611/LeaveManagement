import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

import LoginForm from './components/loginForm';
import Logout from './components/logout';
import RegisterationForm from './components/registerForm';
import EmployeeRegisteration from './components/employeeForm';
import FacultyForm from './components/faculty/facultyForm';
import ScholarForm from './components/scholar/scholarForm';
import StaffForm from './components/staff/staffForm';

import Faculties from './components/faculty/faculties';
import Scholars from './components/scholar/scholars';
import Staffs from './components/staff/staffs'

import PersonalFaculty from './components/faculty/personal';
import ContactFaculty from './components/faculty/contact';
import AcademicFaculty from './components/faculty/academic';
import Publications from './components/faculty/publications';

import ScholarDetails from './components/scholar/scholarDetails';

import PersonalStaff from './components/staff/personal';
import ContactStaff from './components/staff/contact';
import AcademicStaff from './components/staff/academic';

import ApplyForLeave from './components/applyForLeave';
import LeaveStatus from './components/leaveStatus';

import NotFound from './components/not-found';

import NavBar from './components/common/navbar';

import auth from './services/authService';

class App extends React.Component {
  state= {}

  render() {
    
    const user = auth.getCurrentUser();
    const emp = auth.getCurrentEmployee();

    return (
      <React.Fragment>
        <NavBar user={user} emp={emp}/>
        
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/register" component={RegisterationForm}/>
            

            <Route path="/user/faculty" component={FacultyForm}/>
            <Route path="/user/scholar" component={ScholarForm}/>
            <Route path="/user/staff" component={StaffForm}/>
            <Route path="/user"
                   render={props => <EmployeeRegisteration {...props} user={user}/>}
            />


            <Route path="/employee/faculty/personal" component={PersonalFaculty}/>
            <Route path="/employee/faculty/contact" component={ContactFaculty}/>
            <Route path="/employee/faculty/academic" component={AcademicFaculty}/>
            <Route path="/employee/faculty/publications" component={Publications}/>

            <Route path="/employee/scholar" component={ScholarDetails}/>

            <Route path="/employee/staff/personal" component={PersonalStaff}/>
            <Route path="/employee/staff/contact" component={ContactStaff}/>
            <Route path="/employee/staff/academic" component={AcademicStaff}/>


            <Route path="/employee/apply-for-leave" component={ApplyForLeave}/>
            <Route path="/employee/check-leave-status" 
                   render={props => <LeaveStatus {...props} user={user}/>}
            />


            <Route path="/admin/employees" 
                   render={props => <EmployeeRegisteration {...props} user={user}/>}
            />


            <Route path="/admin/faculty/:id" component={FacultyForm}/>
            <Route path="/admin/faculty" 
                   render={props => <Faculties {...props} emp={emp}/>}
            />

            <Route path="/admin/scholar/:id" component={ScholarForm}/>
            <Route path="/admin/scholar" 
                   render={props => <Scholars {...props} emp={emp}/>}
            />

            <Route path="/admin/staff/:id" component={StaffForm}/>
            <Route path="/admin/staff" 
                   render={props => <Staffs {...props} emp={emp}/>}
            />


            <Route path="/admin/leave-status" 
                   render={props => <LeaveStatus {...props} user={user}/>}
            />


            <Route path="/admin" 
                   render={props => <EmployeeRegisteration {...props} user={user}/>}
            />


            <Route path="/not-found" component={NotFound}/>


            <Redirect exact from="/employee/faculty" to="/employee/faculty/personal"/>
            <Redirect exact from="/employee/staff" to="/employee/staff/personal"/>
            <Redirect exact from="/admin" to="/admin/employees"/>


            <Redirect to="/not-found"/>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}
 
export default App;