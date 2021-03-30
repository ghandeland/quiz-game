import React from 'react';
import { useState, useEffect } from "react";
import { useLoading, useLoadingEffect } from "./utlis/useLoading";
import { fetchJson } from './utlis/http';

const TestFetch = () => {
  const [fetchValue, setFetchValue] = useState("Initial");
  
  // { loading, error, data, refetch }
  let fetchObj = useLoadingEffect(() =>
    fetchJson("/api/test")
  );
  
  const fetchAgain = () => {
      fetchObj.refetch({});
  }
  
  useEffect(() => {
      if(fetchObj.data) {
          setFetchValue(fetchObj.data);
      }
  }, [fetchObj.data])


  return (
    <div>
      <h1>Test fetch</h1>
      <h3>fetchValue: {fetchValue}</h3>
      <button onClick={fetchAgain}>Fetch again</button>
    </div>
  );
}

export default TestFetch
