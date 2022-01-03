import React from 'react';
import Joi from 'joi-browser'

import Form from '../common/form';

import faculty from '../../services/facultyService';
import employee from '../../services/employeeService';
import auth from '../../services/authService';

class FacultyForm extends Form {

    facultyId = this.props.match.params.id;

    state = {
        data: {
            dateOfBirth: Date,
            designation: "",
            department: "",
            office:"",
            city:"",
            state:"",
            country:"",
            phone:Number,
            degree:"",
            institute:"",
            year: Number,
            researchArea:""
        },
        user:{},
        errors: {}
    };

    schema = {
        dateOfBirth: Joi.date().required().label("Date Of Birth"),
        designation: Joi.string().required().label("Designation"),
        department: Joi.string().required().label("Department"),
        office: Joi.string().required().label("Office No."),
        city: Joi.string().required().label("City"),
        state: Joi.string().required().label("State"),
        country: Joi.string().required().label("Country"),
        phone: Joi.number().required().label("Phone Number"),
        degree: Joi.string().required().label("Degree"),
        institute: Joi.string().required().label("Institute"),
        year: Joi.number().required().label("Year"),
        researchArea: Joi.string().required().label("Research Area"),
        publications: Joi.array().items(Joi.string()).label("Publications")
    };

    doSubmit = async () => {

        const user = this.state.user;
        const {dateOfBirth,designation,department,office,city,state,country,phone,degree,institute,year,researchArea,publications} = this.state.data;
        
        const currentFaculty = {
            personal: {
                name: user.Name,
                dateOfBirth,
                designation,
                department
            },
            contact: {
                address:{
                    office,
                    city,
                    state,
                    country
                },
                email: user.EMail,
                phone
            },
            academic: {
                highestEducation: {
                    degree,
                    institute,
                    year
                }
            },
            publications: {
                researchArea,
                publications
            }
        }

        try {

            if(!this.facultyId){

                const facResponse = await faculty.saveFaculty(currentFaculty);

                const currentEmployee = {
                    type: "faculty",
                    type_id: facResponse._id,
                    name: user.Name,
                    email: user.EMail,
                    phone
                };
                
                const empResponse = await employee.saveEmployee(currentEmployee);
                await auth.authenticateEmployee(empResponse.headers["x-emptoken"]);
                
                window.location = "/employee/faculty";
            }else{
                currentFaculty._id = this.facultyId;

                await faculty.saveFaculty(currentFaculty);
                window.location = "/admin/faculty";
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
        if(this.facultyId){
            const {data:currentFaculty} = await faculty.getFaculty(this.facultyId);
            
            const {name,dateOfBirth,designation,department} = currentFaculty.personal;
            const {address,email,phone} = currentFaculty.contact;
            const {city,state,office,country} = address;
            const {degree,institute,year} = currentFaculty.academic.highestEducation;
            const {researchArea,publications} = currentFaculty.publications;

            const data = {
                dateOfBirth,
                designation,
                department,
                office,
                city,
                state,
                country,
                phone,
                degree,
                institute,
                year,
                researchArea,
                publications
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
                        {this.renderInput("dateOfBirth","Date Of Birth","date")}
                        {this.renderInput("designation","Designation")}
                        {this.renderInput("department","Department")}
                    <br></br>
                    <hr style={{border:"2.5px solid black"}}></hr>
                    <br></br>
                    <h3>Contact</h3>
                        <h5>Address</h5>
                            {this.renderInput("office","Office")}
                            {this.renderInput("city","City")}
                            {this.renderInput("state","State")}
                            {this.renderInput("country","Country")}
                        <hr style={{border:"1.25px solid black"}}></hr>
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
                    <h4>Publications</h4>
                        {this.renderInput("researchArea","Research Area")}
                        {this.renderInput("publications","Publications")}
                    <br></br>
                    <hr style={{border:"2.5px solid black"}}></hr>
                    <br></br>
                    {this.facultyId ? this.renderButton("Update") : this.renderButton("Register")}
                </form>
            </div>
        );
    }
}
 
export default FacultyForm;