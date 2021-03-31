import React, { useState } from 'react'
import HomeButton from "./ui/HomeButton";
import InputField from './ui/InputField';
import { postJson } from './utlis/http';
import { useSubmit } from './utlis/useSubmit';

export const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    
    const {handleSubmit, submitting, error} = useSubmit(
        async () => {
            postJson("/api/login", {username: username, password: password});
        },        
        // Return to home page if submit is successful
        () => history.push("/match")
    )
    
    return (
      <div>
        <h1>Log in</h1>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Username"
            type="text"
            onValueChange={setUsername}
          />
          <InputField
            label="Password"
            type="password"
            onValueChange={setPassword}
          />
          <button disabled={submitting}>Log in</button>
        </form>

        <HomeButton />
      </div>
    );
}


