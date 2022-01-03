import React from 'react';

import VerticalTable from '../common/verticalTable';

class Publications extends React.Component {
    state= {
        data: [],
        errors: {}
    }

    render() {
        const publications = this.state.data;

        return (
            <VerticalTable data={publications} heading={"Publications"}/>
        );
    }

    componentDidMount() {
        
    }
}
 
export default Publications;