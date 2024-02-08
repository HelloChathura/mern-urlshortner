
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShortUrl from "../../../api/models/shorturl.model";

const RedirectComponent = () => {
  const navigate = useNavigate();
  const { shortCode } = useParams();
  const params = useParams();
  const mappedUrl ="";

  

  useEffect(() => {
    if (
        shortCode.endsWith("+") ||
        shortCode.endsWith("_") ||
        shortCode.endsWith("#")
    ) {
        navigate("/stats/" + shortCode);
    } else {
        const handleGetActualUrl = async () => {
            try {
             
                const response = await fetch('/api/shorturl/getActualUrl', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ shortCode }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                const actualUrl = data.actualUrl.startsWith('http') ? data.actualUrl : 'http://' + data.actualUrl;
                window.location.href = actualUrl;
            } catch (error) {
                console.error('Error fetching actual URL:', error);
                setError('Error fetching actual URL');
            }
        };

        // Call the function when the component mounts
        handleGetActualUrl();
    }
}, [shortCode, navigate]);

  return <div></div>;
};

export default RedirectComponent;
