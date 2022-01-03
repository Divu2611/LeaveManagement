import React from 'react';
import Joi from 'joi-browser';

import Form from './common/form';

import auth from '../services/authService';
import emp from '../services/employeeService';
import record from '../services/recordService';
import leave from '../services/leaveService';

import calculateLeaveCount from '../utils/calculateLeaveCount';

class ApplyForLeave extends Form {
    state = {
        data: {
            leave: "",
            startDate: String,
            endDate: String
        },

        leaves: [],
        errors: {}
    }

    schema = {
        leave: Joi.string().required().label("Leave").valid("Casual Leave","Unpaid Leave","Privileged Leave"),
        startDate: Joi.string().required().label("Start Date"),
        endDate: Joi.string().required().label("End Date"),
        reason: Joi.string().label("Reason")
    }

    componentDidMount = async () => {
        var {data} = await leave.getLeaves();
        
        const {TypeID} = auth.getCurrentEmployee();
        const {data:leaveCount} = await emp.getEmployee(TypeID);
        
        const {casualLeave,unPaidLeave,privilegedLeave} = leaveCount.leaves;;

        data[0].count = casualLeave;
        data[1].count = privilegedLeave;
        data[2].count = unPaidLeave;

        const leaves = [...data];
        
        this.setState({leaves});
    }

    doSubmit = async () => {

        const {leave,startDate,endDate,reason} = this.state.data;
        const status = leave !== "Casual Leave" ? "Pending" : null;
        const {ID,TypeID} = auth.getCurrentEmployee();

        const {data:currentEmployee} = await emp.getEmployee(TypeID);
        const {_id,type,name,email,phone,type_id} = currentEmployee;
        var {casualLeave, unPaidLeave, privilegedLeave} = currentEmployee.leaves;

        const currentRecord = {
            employeeId: ID,
            leave,
            startDate,
            endDate,
            reason,
            status,
        };

        if(leave === 'Casual Leave'){
            casualLeave -= calculateLeaveCount(startDate,endDate);

            const updatedEmployee = {
                _id,
                type,
                name,
                email,
                phone,
                type_id,
                leaves: {
                    casualLeave,
                    unPaidLeave,
                    privilegedLeave
                }
            };

            await emp.saveEmployee(updatedEmployee);
        }
        
        await record.saveRecord(currentRecord);
        this.props.history.replace(`/employee/check-leave-status`);
    }

    render() {

        const leaves = this.state.leaves;

        return (
            <div>
                <div className="my-5">
                    {leaves.map(leave => (
                        <h5 key={leave._id}
                            style={{color: leave.count ? 'green' : 'red'}}>
                            {leave.type}s reamining : {leave.count}
                        </h5>
                    ))}
                </div>
                <h1>Apply For Leave</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderSelect("leave","Leave",leaves)}
                    {this.renderInput("startDate","Start Date","date")}
                    {this.renderInput("endDate","End Date","date")}
                    {this.state.data.leave!=="Casual Leave" && this.renderInput("reason","Reason")}
                    {this.renderButton("Apply")}
                </form>
            </div>
        );
    }
}
 
export default ApplyForLeave;