import React from 'react';
import Joi from 'joi-browser';

import Input from './input';
import Select from './select';

class Form extends React.Component {

    state = {
        data: {},
        errors: {}
    };

    validate = () => {
        const option = {abortEarly: false};
        const {error} = Joi.validate(this.state.data, this.schema, option);
        
        if(!error){
            return null;
        }

        const errors = {};

        for(let item of error.details){
            errors[item.path] = item.message;
        }

        return errors;
    }

    validateProperty = ({id,value}) => {

        const obj = {[id] : value};
        const subSchema = {[id]:this.schema[id]};
        const {error} = Joi.validate(obj,subSchema);

        if(!error){
            return null;
        }

        return error.details[0].message;
    }

    handleSubmit = event => {
        event.preventDefault();
        
        const error = this.validate()
        this.setState({errors : error || {}});

        if(error){
            return;
        }

        this.doSubmit();
    }

    handleChange = ({currentTarget: input}) => {
        
        const errors = this.state.errors;
        const errorMessage = this.validateProperty(input);
        if(errorMessage) errors[input.id] = errorMessage;
        else delete errors[input.id];

        const data = this.state.data;
        data[input.id] = input.value;

        this.setState({data,errors});
    }

    renderInput = (name,label,type="text") => {
        const {data,errors} = this.state;

        return (
            <div className="mb-3">
                <Input name={name}
                       type={type}
                       value={data[name]}
                       label={label}
                       onChange={this.handleChange}
                       error={errors[name]}/>
            </div>
        );
    }

    renderSelect = (name,label,options) => {
        const {data,errors} = this.state;

        return (
            <div className="mb-3">
                <Select name={name}
                        value={data[name]}
                        label={label}
                        onChange={this.handleChange}
                        options={options}
                        error={errors[name]}/>
            </div>
        );
    }

    renderButton = label => {
        return (
            <button disabled={this.validate()}
                    type="submit"
                    className="btn btn-primary">
                {label}
            </button>
        );
    }
}
 
export default Form;