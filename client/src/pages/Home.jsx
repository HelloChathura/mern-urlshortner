import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faChessBoard,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import Notifications, { notify } from "react-notify-toast";
import { useNavigate } from "react-router-dom";
import EmailModal from "../components/EmailModal";
import QRModal from "../components/QRModal";

export default function Home() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const navigate = useNavigate();
 

  const handleChange = (e) => {
    
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };


  const getFormattedShortCode = (url) => {
    const parts = url.split("/");
    const shortCode = parts[parts.length - 1].replace("#", "");
    const formattedShortCode = shortCode.includes("+")
      ? shortCode
      : shortCode + "+";
    return formattedShortCode;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const urlRegex = /^(?:(ftp|http|https):\/\/)?(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+)(?:\/[^ "]+)?$/;
    const isValidUrl = urlRegex.test(formData.originalurl);

    if (!formData.originalurl || formData.originalurl.trim() === "") {
      let myColor = { background: "#0E1717", text: "#FFFFFF" };
      notify.show("Original URL is required.", "error", 5000);
      return;
    }
    else if (!isValidUrl) {
      let myColor = { background: "#0E1717", text: "#FFFFFF" };
      notify.show("Please enter a valid URL", "error", 5000);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/shorturl/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setJsonData(data);


      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
  
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <section className="bg-indigo-900 h-screen flex items-center justify-center">
        <Notifications />
        <div className="container mx-auto px-4 py-8 w-1/2 flex flex-col md:flex-row items-center">
          <div className="relative flex-grow md:w-3/4">
            <input
             className="w-full h-16 px-3 rounded mb-4 md:mb-0 mt-0 focus:outline-none focus:shadow-outline text-xl px-8 shadow-lg"
              type="search"
              id="originalurl"
              placeholder="Paste the URL to be shortened"
              onChange={handleChange}
            />
            {jsonData && (
              <a
                href={jsonData.shorturl}
                className="block text-lg font-semibold py-2 px-2 rounded text-purple-600 bg-purple-200 flex items-center justify-between"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{jsonData.shorturl}</span>
                <div className="flex items-center">
                  <a
                    href="#"
                    className="text-purple-600 ml-2 flex items-center"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon 
                    icon={faChessBoard}  
                    onClick={() => setShowQRModal(true)} 
                    className="mr-1" />
                  </a>
                  <a
                    href=""
                    className="text-purple-600 ml-2 flex items-center"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      icon={faChartSimple}
                      className="mr-1"
                      onClick={() =>
                        navigate(getFormattedShortCode(jsonData.shorturl))
                      }
                    />
                  </a>
                  <a
                    href="#"
                    className="text-purple-600 ml-2 flex items-center"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="mr-1"
                      onClick={() => setShowModal(true)}
                    />
                  </a>
                  <a
                    href="#"
                    className="text-blue-500 ml-2 flex items-center"
                    onClick={(e) => {
                      e.preventDefault();
                      navigator.clipboard.writeText(jsonData.shorturl);
                      let myColor = { background: "#0E1717", text: "#FFFFFF" };
                      notify.show("Link Copied!!", "custom", 5000, myColor);
                    }}
                  >
                    Copy
                  </a>
                </div>
              </a>
              
            )}
          </div>

          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 h-16 rounded-lg ml-0 md:ml-4 hover:opacity-95"
          >
            {loading ? "Loading..." : "Shorten URL"}
          </button>
        </div>
      </section>
      {showModal && <EmailModal setShowModal={setShowModal} shortUrl={jsonData.shorturl} />}
      {showQRModal && <QRModal setShowQRModal={setShowQRModal} shortUrl={jsonData.shorturl} />}
    </form>
  );
}
