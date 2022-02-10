import { useState, useEffect } from 'react';
import { client } from 'libs/api';

function useAPI(apiInfo, requiredData) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(0);
  const [isFirstRequestPending, setIsFirstRequestPending] = useState(false);
  const mutate = () => setShouldUpdate((prev) => prev + 1);

  const isMissingRequiredData = () => {
    let isMissing = false;
    if (requiredData !== undefined) {
      Object.entries(requiredData).forEach(([key, val]) => {
        if (!val) {
          isMissing = true;
          setIsFirstRequestPending(true);
        }
      });
    }

    return isMissing;
  };

  useEffect(() => {
    if (isFirstRequestPending && !isMissingRequiredData()) {
      mutate();
      setIsFirstRequestPending(false);
    }
  }, [isFirstRequestPending]);

  useEffect(() => {
    async function execAPICall() {
      if (isMissingRequiredData()) return;
      try {
        setLoading(true);
        const result = await client.request(apiInfo);
        setData(result.data.data);
      } catch (error) {
        setError({
          message: error,
        });
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    execAPICall();
  }, [shouldUpdate]);

  return { data, loading, error, mutate };
}

export default useAPI;
