import React from 'react';
import Joi from 'joi-browser'

import Form from '../common/form';

import scholar from '../../services/scholarService';
import employee from '../../services/employeeService';
import auth from '../../services/authService';

class ScholarForm extends Form {

    scholarId = this.props.match.params.id;

    state = {
        data: {
            rollNo:"",
            phone:Number,
            yearAdmission: Number,
            researchArea:""
        },
        user:{},
        errors: {}
    };

    schema = {
        rollNo: Joi.string().required().label("Roll No."),
        phone: Joi.number().required().label("Phone Number"),
        yearAdmission: Joi.number().required().label("Admission Year"),
        researchArea: Joi.string().required().label("Area of Research")
    };

    doSubmit = async () => {

        const user = this.state.user;
        const {rollNo,phone,yearAdmission,researchArea} = this.state.data;
        
        const currentScholar = {
            name: user.Name,
            rollNo,
            email: user.EMail,
            phone,
            yearAdmission,
            researchArea
        }

        try {

            if(!this.scholarId){

                const sacResponse = await scholar.saveScholar(currentScholar);

                const currentEmployee = {
                    type: "scholar",
                    type_id: sacResponse._id,
                    name: user.Name,
                    email: user.EMail,
                    phone
                };
                
                const empResponse = await employee.saveEmployee(currentEmployee);
                await auth.authenticateEmployee(empResponse.headers["x-emptoken"]);
                
                window.location = "/employee/scholar";
            }else{
                currentScholar._id = this.scholarId;

                await scholar.saveScholar(currentScholar);
                window.location = "/admin/scholar";
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
        if(this.scholarId){
            const {data:currentScholar} = await scholar.getScholar(this.scholarId);
            
            const {name,rollNo,email,phone,yearAdmission,researchArea} = currentScholar;

            const data = {
                rollNo,
                phone,
                yearAdmission,
                researchArea
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
                    <React.Fragment>
                        <div className="form-group">
                            <label className="form-label">Name: {user.Name}</label>
                        </div>
                        <div className="form-group">
                            <label className="form-label">E-Mail: {user.EMail}</label>
                        </div>
                        <br></br>
                    </React.Fragment>
                    {this.renderInput("rollNo","Roll No.")}
                    {this.renderInput("phone","Phone")}
                    {this.renderInput("yearAdmission","Admission Year")}
                    {this.renderInput("researchArea","Research Area")}
                    <br></br>
                    <hr style={{border:"2.5px solid black"}}></hr>
                    <br></br>
                    {this.scholarId ? this.renderButton("Update") : this.renderButton("Register")}
                </form>
            </div>
        );
    }
}
 
export default ScholarForm;