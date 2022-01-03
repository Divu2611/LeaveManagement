import React from 'react';
import {toast} from 'react-toastify';

import Scholar from './scholar';
import scholar from '../../services/scholarService';
import emp from '../../services/employeeService';

import Pagination from '../common/pagination';

import {paginate} from '../../utils/paginate';

class Scholars extends React.Component {
    
    state = {
        scholars: [],
        currentPage: 1,
        pageSize: 10
    }
    
    render() { 

        const {scholars,currentPage,pageSize} = this.state;
        const scholarByPage = paginate(scholars,currentPage,pageSize);

        return (
            <React.Fragment>

                <Scholar scholars={scholarByPage}
                         onDelete={this.handleDelete}/>

                <Pagination itemsCount={scholars.length}
                            pageSize={pageSize} 
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange} />
            </React.Fragment>
        );
    }

    async componentDidMount() {
        const {data:scholars} = await scholar.getScholars();
        this.setState({scholars});
    }

    handleDelete = async (scholarToDelete) => {
        const originalScholars = this.state.scholars;
        const scholars = originalScholars.filter(s => s._id !== scholarToDelete._id);
        const {data:currentEmployee} = await emp.getEmployee(scholarToDelete._id);

        this.setState({scholars});

        try{
            await scholar.deleteScholar(scholarToDelete._id);
            await emp.deleteEmployee(currentEmployee._id);
        }catch(ex){
            if(ex.response && ex.response.status===404){
                toast.error("Scholar Already Deleted");
            }

            this.setState({scholars: originalScholars});
        }
    }

    handlePageChange = (page) => {
        this.setState({currentPage: page});
    }
}
 
export default Scholars;