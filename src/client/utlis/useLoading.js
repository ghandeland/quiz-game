import { useState, useEffect } from 'react';

const useLoading = (loadingFunction) => {
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [data, setData] = useState();
    const [refetchToggle, refetch] = useState({});
    
    async function reload() {
        setLoading(true);
        setData(undefined);
        setError(false);
        
        try {
          const loadingFunctData = await loadingFunction();
          setData(loadingFunctData);
        } catch(e) {
            console.log("Fetch failed: " + e);
            setError(true);
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(reload, [refetchToggle]);    
    return {loading, error, data, refetch};
}

exports.useLoading = useLoading;