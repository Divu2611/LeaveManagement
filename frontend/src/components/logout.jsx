import React from 'react';

import auth from '../services/authService';

class Logout extends React.Component {
    
    componentDidMount() {
        auth.logout();        
        window.location = "/login";
    }

    render(){
        return null;
    }
}
 
export default Logout;