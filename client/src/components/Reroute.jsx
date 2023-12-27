
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
    } 
    else 
    {
      //API call
      //getActualUrlFromShortCode

      const urlMapping = {
        [shortCode] : "https://www.example.com/original-url",
      };

      const longUrl = urlMapping[shortCode];

      if (longUrl) {
        window.location.replace(longUrl);
      } else {
        navigate("/");
      }
    }
  }, [shortCode, navigate]);

  return <div></div>;
};

export default RedirectComponent;
