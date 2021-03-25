import { useState, useEffect } from 'react';

export function useLoading(loadingFunction, trigger) {
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [data, setData] = useState();
    const [refetchToggle, refetch] = useState({});
    
    async function reload() {
        setLoading(true);
        setData(undefined);
        setError(undefined);
        
        try {
            setData(await loadingFunction());
        } catch(e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(reload, [refetchToggle]);    
    return {loading, error, data, refetch};
}