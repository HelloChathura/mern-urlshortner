import React from "react";
import Notifications, { notify } from "react-notify-toast";

export default function EmailModal({setShowModal,shortUrl}) {

 const [recipientEmail, setRecipientEmail] = React.useState("");

 const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSendEmail = () => {
    // Add logic here to send the email with the short URL
    // You can use a library like nodemailer or an API for sending emails
    // For simplicity, we'll just log a message for now
    //console.log("Email sent with short URL:", shortUrl, "to:", recipientEmail);
 
    //navigator.clipboard.writeText(jsonData.shorturl);
    let myColor = { background: "#0E1717", text: "#FFFFFF" };
    notify.show("Email sent to"+" " + recipientEmail, "success", 5000);
    // Close the modal after sending the email
    handleCloseModal();
  };

  return (
    <>
      
      {setShowModal ? (
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
                  Send Short URL via Email
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  Please enter the recipient's email address below to send the short URL.
                  </p>
                  
      <input
       className="w-full h-16 px-3 rounded mb-4 md:mb-0 mt-0 focus:outline-none focus:shadow-outline text-xl px-8 shadow-lg"
        type="email"
        id="recipientEmail"
        placeholder="Enter recipient's email"
        value={recipientEmail}
        onChange={(e) => setRecipientEmail(e.target.value)}
      />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSendEmail}
                  >
                    Send
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