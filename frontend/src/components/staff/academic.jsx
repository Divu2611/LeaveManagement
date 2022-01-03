import React from 'react';

import VerticalTable from '../common/verticalTable';

import auth from '../../services/authService';
import staff from '../../services/staffService';

class AcademicStaff extends React.Component {
    state= {
        data: [],
        errors: {}
    }

    render() {
        const academicDetails = this.state.data;

        return (
            <VerticalTable data={academicDetails} heading={"Academic Information"}/>
        );
    }

    async componentDidMount() {
        const {TypeID} = auth.getCurrentEmployee();
        const {data:academicData} = await staff.getStaff(TypeID);
        const {degree,institute,year} = academicData.academic.highestEducation;

        const data = [
            {
                key:0,
                attribute: "Degree",
                value: degree
            },
            {
                key:1,
                attribute: "Institute",
                value: institute
            },
            {
                key:2,
                attribute: "Year",
                value: year
            }
        ]

        this.setState({data});
    }
}
 
export default AcademicStaff;