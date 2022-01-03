import React from 'react';

import VarticalTable from '../common/verticalTable';

import auth from '../../services/authService';
import scholar from '../../services/scholarService';

class ScholarDetails extends React.Component {

    state= {
        data: [],
        errors: {}
    }

    render() {
        
        const scholarDetails = this.state.data;

        return (
            <VarticalTable data={scholarDetails} heading={"Details"}/>
        );
    }

    async componentDidMount() {
        const {TypeID} = auth.getCurrentEmployee();
        const {data:scholarData} = await scholar.getScholar(TypeID);

        const data = [
            {
                key:0,
                attribute: "Employee ID",
                value: TypeID
            },
            {
                key: 1,
                attribute: "Name",
                value: scholarData.name
            },
            {
                key: 2,
                attribute: "Roll No.",
                value: scholarData.rollNo
            },
            {
                key: 3,
                attribute: "E-Mail ID",
                value: scholarData.email
            },
            {
                key: 4,
                attribute: "Phone No.",
                value: scholarData.phone
            },
            {
                key: 5,
                attribute: "Admission Year",
                value: scholarData.yearAdmission
            },
            {
                key: 6,
                attribute: "Reseach Area",
                value: scholarData.researchArea
            }
        ]

        this.setState({data});
    }
}
 
export default ScholarDetails;