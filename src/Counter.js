import React from 'react';
import PropTypes from 'prop-types';


const Counter = props =>
	<table className="counter">
        <tbody>
            <tr>
                <td>Attending:</td>
                <td>{props.confirmedInvited}</td>
            </tr>
            <tr>
                <td>Unconfirmed:</td>
                <td>{props.unConfirmedInvited}</td>
            </tr>
            <tr>
                <td>Total:</td>
                <td>{props.totalInvited}</td>
            </tr>
        </tbody>
    </table>

Counter.PropTypes = {
	getTotalInvited: PropTypes.number
}

export default Counter;