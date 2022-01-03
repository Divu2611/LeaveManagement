import React from 'react';
import Joi, { errors } from 'joi-browser';

import {register} from '../services/userService';
import auth from '../services/authService';
import Form from './common/form';

class RegisterationForm extends Form {
    state = {
        data: {
            email: "",
            password: "",
            name: ""
        },

        errors: {}
    };

    schema = {
        email: Joi.string().email().label("E-Mail").required(),
        password: Joi.string().min(8).label("Password"),
        name: Joi.string().required().label("Name")
    };

    doSubmit = async () => {
        try{
            const response = await register(this.state.data);
            auth.loginAfterRegister(response.headers["x-authtoken"]);

            window.location = "/user";
        }catch(ex){
            if(ex.response && ex.response.status===400){
                const errors = {...this.state.errors};
                errors.email = ex.response.data;
                this.setState({errors});
            }
        }
    };

    render() { 
        return (
            <div>
                <h1 className="mt-5">Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("email","E-Mail")}
                    {this.renderInput("password","Password","password")}
                    {this.renderInput("name","Name")}
                    {this.renderButton("Register")}
                </form>
            </div>
        );
    }
}
 
export default RegisterationForm;