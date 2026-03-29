
import React from 'react'
import {Link} from 'react-router-dom'

function DisplayStatus(props)
{
    if (props.type == "success")
    {
        return (
            <div style={{color: 'green'}}>
                <p>{props.message}</p>
            </div>
        );
    } else if (props.type == "error") {
        return (
            <div style={{color: 'red'}}>
                <p>{props.message}</p>
            </div>
        );
    } else {
        return null;
    }
}
export default DisplayStatus;