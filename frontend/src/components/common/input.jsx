import React from 'react';

const Input = ({name,type,value,label,onChange,error}) => {
    const disclaimer = () => {
        if(label === 'E-Mail' && !error){
            return (
                <div id="emailHelp"
                     className="form-text">
                    We'll never share your {name} with anyone else.
                </div>
            );
        }
    }

    return (
        <div className="form-group">
            <label htmlFor={name}
                   className="form-label">
                {label}
            </label>
            
            <input id={name}
                   value={value}
                   onChange={onChange}
                   type={type}
                   className="form-control">
            </input>
            
            {disclaimer()}

            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}
 
export default Input;