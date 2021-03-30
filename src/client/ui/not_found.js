import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
    
    
    return(
        <>
            <h1>404: Not Found</h1>
            <Link to="/">
                <button>
                    Go back
                </button>
            </Link>
        </>    
    );
};