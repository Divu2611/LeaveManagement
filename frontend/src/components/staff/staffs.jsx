import React from 'react';
import {toast} from 'react-toastify';

import Staff from './staff';
import staff from '../../services/staffService';
import emp from '../../services/employeeService';

import Pagination from '../common/pagination';

import {paginate} from '../../utils/paginate';

class Staffs extends React.Component {
    
    state = {
        staffs: [],
        currentPage: 1,
        pageSize: 10
    }
    
    render() { 

        const {staffs,currentPage,pageSize} = this.state;
        const staffByPage = paginate(staffs,currentPage,pageSize);

        return (
            <React.Fragment>

                <Staff staffs={staffByPage}
                       onDelete={this.handleDelete}/>

                <Pagination itemsCount={staffs.length}
                            pageSize={pageSize} 
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange} />
            </React.Fragment>
        );
    }

    async componentDidMount() {
        const {data:staffs} = await staff.getStaffs();
        this.setState({staffs});
    }

    handleDelete = async (staffToDelete) => {
        const originalStaffs = this.state.staffs;
        const staffs = originalStaffs.filter(s => s._id !== staffToDelete._id);
        const {data:currentEmployee} = await emp.getEmployee(staffToDelete._id);

        this.setState({staffs});

        try{
            await staff.deleteStaff(staffToDelete._id);
            await emp.deleteEmployee(currentEmployee._id);
        }catch(ex){
            if(ex.response && ex.response.status===404){
                toast.error("Staff Already Deleted");
            }

            this.setState({staffs: originalStaffs});
        }
    }

    handlePageChange = (page) => {
        this.setState({currentPage: page});
    }
}
 
export default Staffs;