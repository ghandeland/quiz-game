import React, { useState, useEffect } from 'react';
import { useLoading } from './utlis/useLoading';

import { fetchJson } from './utlis/http';

export const TestPage = () => {
    
    let fetchObj = useLoading(() => fetchJson('/api/quiz/db/5'));
 
    
    if(fetchObj.error) {
        return <div>Error</div>;
    }
    
    if (fetchObj.loading || !fetchObj.data) {
      return <div>Fetching...</div>;
    }
    
    const { quizzes, answers } = fetchObj.data;
    
    return (
        <div>
            <h1>Test fetch:</h1>
            <div>{quizzes[0].question}</div>
        </div>
    );
}
