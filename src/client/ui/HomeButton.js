import React from 'react'
import { Link } from "react-router-dom";

const HomeButton = () => {
    return (
      <div className="btn-home-container">
        <Link to="/">
          <button>Home</button>
        </Link>
      </div>
    );
}

export default HomeButton
