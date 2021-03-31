import React, { useState, useEffect } from "react";
import { fetchJson } from "./utlis/http";
import { useLoading } from "./utlis/useLoading";

export function ProfilePage() {
  //const [username, setUsername] = useState();

  const { loading, error, data, refetch } = useLoading(() => {
    fetchJson("/api/profile");
  });

    // useEffect(() => {
    //     if(data) {
    //         console.log(data);
    //         setUsername(data);
    //     }
    // }, [data])

  if (error) {
    <h1>{error.toString()}</h1>;
  }

  if (loading || !data) {
    return <h1>Fetching profile info</h1>;
  }

  const { username } = data;

  return (
    <div>
      <h1>Profile page</h1>
      <p>Username: {username}</p>
    </div>
  );
}
