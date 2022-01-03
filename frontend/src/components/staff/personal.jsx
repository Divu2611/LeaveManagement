import React from 'react';

import VarticalTable from '../common/verticalTable';

import auth from '../../services/authService';
import staff from '../../services/staffService';

class PersonalStaff extends React.Component {

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
        const {data:personalData} = await staff.getStaff(TypeID);
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
                attribute: "Designation",
                value: personal.designation
            },
            {
                key: 3,
                attribute: "Department",
                value: personal.department
            },
            {
                key: 4,
                attribute: "Date Of Joining",
                value: personal.dateOfJoining
            }
        ]

        this.setState({data});
    }
}
 
export default PersonalStaff;