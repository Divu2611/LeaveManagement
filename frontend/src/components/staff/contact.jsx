import React from 'react';

import VerticalTable from '../common/verticalTable';

import auth from '../../services/authService';
import staff from '../../services/staffService';

class ContactStaff extends React.Component {

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
        const {data:contactData} = await staff.getStaff(TypeID);
        const {contact} = contactData;
        
        const data= [
            {
                key:0,
                attribute: "Office Extension",
                value: contact.officeExtension
            },
            {
                key: 1,
                attribute: "E-Mail ID",
                value: contact.email
            },
            {
                key: 2,
                attribute: "Phone No.",
                value: contact.phone
            }
        ]

        this.setState({data});
    }
}
 
export default ContactStaff;