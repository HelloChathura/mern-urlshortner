import React from "react";
import Notifications, { notify } from "react-notify-toast";
import QRCode from "qrcode.react";

export default function QRModal({ setShowQRModal, shortUrl }) {

    const [recipientEmail, setRecipientEmail] = React.useState("");

    const handleCloseModal = () => {
        setShowQRModal(false);
      };
    
      const handleSendEmail = () => {
        // Add logic here to send the email with the short URL
        // You can use a library like nodemailer or an API for sending emails
        // For simplicity, we'll just log a message for now
        //console.log("Email sent with short URL:", shortUrl, "to:", recipientEmail);
     

        let myColor = { background: "#0E1717", text: "#FFFFFF" };
        notify.show("Sorry! This feature is currently unavailable!"+" ", "warning", 5000);
        handleCloseModal();
      };

    return (
        <>
          
          {setShowQRModal ? (
            <>
              <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                      QR Code
                      </h3>
                      {/* <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowQRModal(false)}
                      > */}
                        <span className="text-black opacity-1 h-6 w-6 text-2xl block outline-none focus:outline-none" onClick={() => setShowQRModal(false)}>
                          ×
                        </span>
                      {/* </button> */}
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Download a QR code scanner app on your smartphone. Scan the QR code provided, and if you find anything interesting, click  <u><strong><a href={"http://localhost:5173/knowledgebase"} target="_blank" rel="noopener noreferrer">
         here
        </a></strong></u> to access our knowledge base for more information.
                  </p>
                    <center><QRCode value={shortUrl} /></center>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      {/* <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowQRModal(false)}
                      >
                        Close
                      </button> */}
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleSendEmail}
                      >
                        Download
                      </button>
    
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleSendEmail}
                      >
                        Send to Email
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </>
      );
  }