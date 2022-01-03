import React from 'react';

import VarticalTable from '../common/verticalTable';

import auth from '../../services/authService';
import faculty from '../../services/facultyService';

class PersonalFaculty extends React.Component {

    state= {
        data: [],
        errors: {}
    }

    render() {
        
        const personalDetails = this.state.data;

        return (
            <VarticalTable data={personalDetails} heading={"Personal Information"}/>
        );
    }

    async componentDidMount() {
        const {TypeID} = auth.getCurrentEmployee();
        const {data:personalData} = await faculty.getFaculty(TypeID);
        const {personal} = personalData;

        const data = [
            {
                key:0,
                attribute: "Employee ID",
                value: TypeID
            },
            {
                key: 1,
                attribute: "Name",
                value: personal.name
            },
            {
                key: 2,
                attribute: "Date Of Birth",
                value: personal.dateOfBirth
            },
            {
                key: 3,
                attribute: "Designation",
                value: personal.designation
            },
            {
                key: 4,
                attribute: "Department",
                value: personal.department
            }
        ]

        this.setState({data});
    }
}
 
export default PersonalFaculty;