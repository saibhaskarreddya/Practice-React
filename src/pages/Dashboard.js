import React from "react";
import { Link } from "react-router-dom";

function Dashboard(){
    return(
        <div>
            <center>
                <h1>Dashboard Page</h1>
                <Link to="/practice">Practice</Link><br/>

                <Link to="/">Go back to Home</Link>
            </center>
        </div>
    )
}

export default Dashboard;