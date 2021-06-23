import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  // loading fetch data
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // allows you to abort one or more Web requests as and when desired.
    const abortControl = new AbortController();

    //signal: abortControl.signal used to communicate with/abort a DOM request.
    fetch(url, { signal: abortControl.signal })
      .then((res) => {
        if (!res.ok) {
          //if ok(event) is false then setError below catch it
          throw Error("Could not fetch");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        // When abort() is called, the fetch() promise rejects with a DOMException named AbortError.
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          // if fetch failed because URL cannot be reached
          setIsPending(false);
          setError(err.message);
        }
      });
    // Aborts a DOM request before it has completed.
    return () => abortControl.abort();
    //second argument mean our component re-renders whenever url is changed from before
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
