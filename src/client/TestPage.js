import React, { useState, useEffect } from 'react';
import { useLoading } from './utlis/useLoading';

import { fetchJson } from './utlis/http';

export const TestPage = () => {
    
    let fetchObj = useLoading(() => fetchJson('/api/quiz/db'));
 
    
    if(fetchObj.error) {
        return <div>Error</div>;
    }
    
    if (fetchObj.loading) {
      return <div>Fetching...</div>;
    }
    
    return (
        <div>
            <h1>Test fetch:</h1>
            <div>{fetchObj.data}</div>
        </div>
    );
}
