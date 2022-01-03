import React from 'react';
import Joi from 'joi-browser';

import auth from '../services/authService';
import Form from './common/form';

class LoginForm extends Form {
    
    state = {
        data: {
            email: "",
            password: ""
        },

        errors: {}
    };

    schema = {
        email: Joi.string().required().label('E-Mail'),
        password: Joi.string().min(8).required().label('Password')
    };

    doSubmit = async () => {
        try {
            await auth.authenticate(this.state.data)
            
            const user = auth.getCurrentUser();
            const employee = auth.getCurrentEmployee();

            window.location = user.isAdmin ? '/admin' : employee ? `/employee/${employee.EmployeeType}` : '/user';
        } catch (exception) {
            if(exception.response && exception.response.status===400){
                const errors = {...this.state.errors};
                errors.email = exception.response.data;
                this.setState({errors});
            }
        }
    }

    render() { 
        return (
            <div className="login-right-container">
                <h1 className="mt-5">Login</h1>
                <form className="ui form" onSubmit={this.handleSubmit}>
                    {this.renderInput("email","E-Mail")}
                    {this.renderInput("password","Password","password")}
                    {this.renderButton("Login")}
                </form>
            </div>
        );
    }
}
 
export default LoginForm;