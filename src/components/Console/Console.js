import React from "react";
import {connect} from 'react-redux'

class C extends React.Component {
    render() {
        return (
            <div></div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(C)