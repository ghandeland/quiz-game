import React from "react";
import {Link} from 'react-router-dom'

export function Home() {
    
    return (
      <div>
        <h1>Quiz game</h1>
        <Link to="/match">
          <button type="button">Start game</button>
        </Link>
      </div>
    );
}