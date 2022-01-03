import React from 'react';

import Status from './status';

import auth from '../services/authService';
import emp from '../services/employeeService';
import record from '../services/recordService';

import Pagination from './common/pagination';

import calculateLeaveCount from '../utils/calculateLeaveCount';
import {paginate} from '../utils/paginate';

class LeaveStatus extends React.Component {

    state = {
        leaves: [],
        currentPage: 1,
        pageSize: 9
    }

    user = this.props.user;

    render() {

        const leaves = this.state.leaves;

        if(leaves){

            const {currentPage,pageSize} = this.state;
            const leavesByPage = paginate(leaves,currentPage,pageSize);

            if(leaves.length === 0)
                return (
                    <div className="tableheading mt-5">
                        <h3>No Leaves Applied</h3>
                    </div>)

            return (
                <div className="mt-5">
                    <Status leaves={leavesByPage}
                            user={this.user}
                            onStatusChange={this.handleStatus}/>
                    
                    <Pagination itemsCount={leaves.length}
                                pageSize={pageSize} 
                                currentPage={currentPage}
                                onPageChange={this.handlePageChange} />
                </div>);
        }
        return null;
    }

    async componentDidMount() {
        const {data} = await record.getRecords();

        if(!this.user.isAdmin){
            const {TypeID} = auth.getCurrentEmployee();
            const employeeLeaves = data.filter(object => object.employee.type_id === TypeID);

            this.setState({
                leaves: employeeLeaves
            });
        }else{
            this.setState({
                leaves: data
            });
        }
    }

    handleStatus = async (status,currentRecord) => {
        const originalRecords = this.state.leaves;
        var r = originalRecords.find(r => r._id === currentRecord._id);

        r.status = status;

        if(status === 'Approved'){
            const leaveCount = calculateLeaveCount(r.startDate,r.endDate);
            const {data:currentEmployee} = await emp.getEmployee(r.employee.type_id);

            const {_id,type,name,email,phone,type_id} = currentEmployee;
            var {casualLeave, unPaidLeave, privilegedLeave} = currentEmployee.leaves;

            if(r.leave === "Unpaid Leave")  unPaidLeave -= leaveCount;
            else    privilegedLeave -= leaveCount;

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

        await record.saveRecord(r);

        window.location = "/admin/leave-status"
    }

    handlePageChange = (page) => {
        this.setState({currentPage: page});
    }
}
 
export default LeaveStatus;