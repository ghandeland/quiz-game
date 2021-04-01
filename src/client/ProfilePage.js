import React, { useState, useEffect } from "react";
import HomeButton from "./ui/HomeButton";
import { fetchJson } from "./utlis/http";
import { useLoading } from "./utlis/useLoading";

export function ProfilePage() {
  //const [username, setUsername] = useState();

  let fetchObj = useLoading(() => fetchJson("/api/profile"));

    // useEffect(() => {
    //     if(data) {
    //         console.log(data);
    //         setUsername(data);
    //     }
    // }, [data])

  if (fetchObj.error) {
    <h1>{error.toString()}</h1>;
  }

  if (fetchObj.loading || !fetchObj.data) {
    return <h1>Fetching profile info</h1>;
  }

  const { username } = fetchObj.data;

  return (
    <div>
      <h1>Profile page</h1>
      <p>Username: {username}</p>
      <HomeButton />
    </div>
  );
}
