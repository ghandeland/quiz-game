import { useState } from 'react';


export function useSubmit(submitFunction, onSubmitSuccess) {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState();
    
    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setError(undefined)
        try {
            await submitFunction();
            setSubmitting(false);
            onSubmitSuccess();
        } catch(e) {
            setError(e);
            setSubmitting(false);
        } 
    }
    
    return {handleSubmit, submitting, error};
}