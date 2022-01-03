import React from 'react';
import Joi from 'joi-browser'

import Form from '../common/form';

import staff from '../../services/staffService';
import employee from '../../services/employeeService';
import auth from '../../services/authService';

class StaffForm extends Form {

    staffId = this.props.match.params.id;

    state = {
        data: {
            designation: "",
            department: "",
            dateOfJoining: Date,
            officeExtension:"",
            phone:Number,
            degree:"",
            institute:"",
            year: Number
        },
        user:{},
        errors: {}
    };

    schema = {
        designation: Joi.string().required().label("Designation"),
        department: Joi.string().required().label("Department"),
        dateOfJoining: Joi.date().required().label("Date Of Joining"),
        officeExtension: Joi.string().required().label("Office Extension"),
        phone: Joi.number().required().label("Phone Number"),
        degree: Joi.string().required().label("Degree"),
        institute: Joi.string().required().label("Institute"),
        year: Joi.number().required().label("Year")
    };

    doSubmit = async () => {

        const user = this.state.user;
        const {designation,department,dateOfJoining,officeExtension,phone,degree,institute,year} = this.state.data;
        
        const currentStaff = {
            personal: {
                name: user.Name,
                designation,
                department,
                dateOfJoining
            },
            contact: {
                officeExtension,
                email: user.EMail,
                phone
            },
            academic: {
                highestEducation: {
                    degree,
                    institute,
                    year
                }
            }
        }

        try {

            if(!this.staffId){

                const stfResponse = await staff.saveStaff(currentStaff);

                const currentEmployee = {
                    type: "staff",
                    type_id: stfResponse._id,
                    name: user.Name,
                    email: user.EMail,
                    phone
                };
                
                const empResponse = await employee.saveEmployee(currentEmployee);
                await auth.authenticateEmployee(empResponse.headers["x-emptoken"]);
                
                window.location = "/employee/staff";
            }else{
                currentStaff._id = this.staffId;

                await staff.saveStaff(currentStaff);
                window.location = "/admin/staff";
            }
        } catch (exception) {
            if(exception.response && exception.response.status===400){
                const errors = {...this.state.errors};
                errors.email = exception.response.data;
                this.setState({errors});
            }
        }
    };

    async componentDidMount() {
        if(this.staffId){
            const {data:currentStaff} = await staff.getStaff(this.staffId);
            
            const {name,designation,department,dateOfJoining} = currentStaff.personal;
            const {officeExtension,email,phone} = currentStaff.contact;
            const {degree,institute,year} = currentStaff.academic.highestEducation;

            const data = {
                designation,
                department,
                dateOfJoining,
                officeExtension,
                phone,
                degree,
                institute,
                year
            }

            const user = {
                Name: name,
                EMail: email
            }

            this.setState({user,data});
        }else{
            const user = auth.getCurrentUser();
            this.setState({user});
        }
    }

    render() {

        const user = this.state.user;

        return (
            <div>
                <h1 className="mt-5">Details</h1>
                <hr style={{border:"5px solid black"}}></hr>
                <form onSubmit={this.handleSubmit}>
                    <br></br>
                    <h3>Personal</h3> 
                        <React.Fragment>
                            <div className="form-group">
                                <label className="form-label">Name: {user.Name}</label>
                            </div>
                            <div className="form-group">
                                <label className="form-label">E-Mail: {user.EMail}</label>
                            </div>
                            <br></br>
                        </React.Fragment>
                        {this.renderInput("designation","Designation")}
                        {this.renderInput("department","Department")}
                        {this.renderInput("dateOfJoining","Date Of Joining","date")}
                    <br></br>
                    <hr style={{border:"2.5px solid black"}}></hr>
                    <br></br>
                    <h3>Contact</h3>
                        {this.renderInput("officeExtension","Office Extension")}
                        {this.renderInput("phone","Phone")}
                    <br></br>
                    <hr style={{border:"2.5px solid black"}}></hr>
                    <br></br>
                    <h4>Academic</h4>
                        {this.renderInput("degree","Degree")}
                        {this.renderInput("institute","Institute")}
                        {this.renderInput("year","Year")}
                    <br></br>
                    <hr style={{border:"2.5px solid black"}}></hr>
                    <br></br>
                    {this.staffId ? this.renderButton("Update") : this.renderButton("Register")}
                </form>
            </div>
        );
    }
}
 
export default StaffForm;