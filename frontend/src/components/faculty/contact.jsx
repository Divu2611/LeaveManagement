import React from 'react';

import VerticalTable from '../common/verticalTable';

import auth from '../../services/authService';
import faculty from '../../services/facultyService';

class ContactFaculty extends React.Component {

    state= {
        data: [],
        errors: {}
    }

    render() {
        const contactDetails = this.state.data;

        return (
            <VerticalTable data={contactDetails} heading={"Contact Information"}/>
        );
    }

    async componentDidMount() {
        const {TypeID} = auth.getCurrentEmployee();
        const {data:contactData} = await faculty.getFaculty(TypeID);
        const {contact} = contactData;
        
        const data= [
            {
                key:0,
                attribute: "Office No.",
                value: contact.address.office
            },
            {
                key: 1,
                attribute: "City",
                value: contact.address.city
            },
            {
                key: 2,
                attribute: "State",
                value: contact.address.state
            },
            {
                key: 3,
                attribute: "Country",
                value: contact.address.country
            },
            {
                key: 4,
                attribute: "E-Mail ID",
                value: contact.email
            },
            {
                key: 5,
                attribute: "Phone No.",
                value: contact.phone
            }
        ]

        this.setState({data});
    }
}
 
export default ContactFaculty;