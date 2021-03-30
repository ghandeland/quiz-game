import { useState, useEffect } from 'react';

const useLoadingEffect = (loadingFunction) => {
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

const useLoading = (loadingFunction) => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [data, setData] = useState();
  const [refetchToggle, refetch] = useState(-1);

  async function reload() {
    if(refetch === -1) {
        console.log("Skipped reload");
        return;
    }
    
    setLoading(true);
    setData(undefined);
    setError(undefined);

    try {
      setData(await loadingFunction());
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(reload, [refetchToggle]);
  return { loading, error, data, refetch };
};

exports.useLoadingEffect = useLoadingEffect;
exports.useLoading = useLoading;

