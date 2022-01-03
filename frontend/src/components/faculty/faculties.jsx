import React from 'react';
import {toast} from 'react-toastify';

import Faculty from './faculty';
import faculty from '../../services/facultyService';
import emp from '../../services/employeeService';

import Pagination from '../common/pagination';

import {paginate} from '../../utils/paginate';

class Faculties extends React.Component {
    
    state = {
        faculties: [],
        currentPage: 1,
        pageSize: 10
    }
    
    render() { 

        const {faculties,currentPage,pageSize} = this.state;
        const facultyByPage = paginate(faculties,currentPage,pageSize);

        return (
            <React.Fragment>

                <Faculty faculties={facultyByPage}
                         onDelete={this.handleDelete}/>

                <Pagination itemsCount={faculties.length}
                            pageSize={pageSize} 
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange} />
            </React.Fragment>
        );
    }

    async componentDidMount() {
        const {data:faculties} = await faculty.getFaculties();
        this.setState({faculties});
    }

    handleDelete = async (facultyToDelete) => {
        const originalFaculties = this.state.faculties;
        const faculties = originalFaculties.filter(f => f._id !== facultyToDelete._id);
        const {data:currentEmployee} = await emp.getEmployee(facultyToDelete._id);

        this.setState({faculties});

        try{
            await faculty.deleteFaculty(facultyToDelete._id);
            await emp.deleteEmployee(currentEmployee._id);
        }catch(ex){
            if(ex.response && ex.response.status===404){
                toast.error("Faculty Already Deleted");
            }

            this.setState({faculties: originalFaculties});
        }
    }

    handlePageChange = (page) => {
        this.setState({currentPage: page});
    }
}
 
export default Faculties;