import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "./ui/InputField";


export function Home({ amount, onVChange }) {
  
  
  return (
    <div>
      <h1>Quiz game</h1>
      <InputField
        label="Number of quizzes"
        type="number"
        value={amount}
        onValueChange={onVChange}
      />
      <Link to="/match">
        <button type="button">Start game</button>
      </Link>
      <div className="btn-login-container">
        <Link to="/login">
          <button type="button">Log in</button>
        </Link>
      </div>
    </div>
  );
}
