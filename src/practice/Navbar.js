import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
    return (
        <div>
            <ul>
                <Link to="/"><li>home</li> </Link>
                <Link to="/dashboard"> <li>dashboard</li> </Link>
                <Link to="/about"> <li>About</li>  </Link>
                <Link to="/chart"> <li>graph</li>  </Link>
                <Link to="/work"> <li>Work</li>  </Link>
            </ul>
        </div>
    )
}
export default Navbar;