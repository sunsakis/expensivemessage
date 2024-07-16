import React, { useState } from 'react';

export default function Footer( { price } ) {
  const [showModal, setShowModal] = useState(false);
  const [closingAnimation, setClosingAnimation] = useState(false);

  const handleClose = () => {
    setClosingAnimation(true);
    setTimeout(() => {
      setShowModal(false);
      setClosingAnimation(false); // Reset the animation state for the next open
    }, 500); // Match this duration to your animation duration
  };

    return (

    <>
    <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
          }

          @keyframes slideOut {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(-20px); opacity: 0; }
            }

            .slideOut {
            animation: slideOut 0.5s ease-out forwards;
            }
        `}
      </style>
      <div className="absolute bottom-1 left-0 right-0">
            <div className="sm:m-5">
                <p className="text-sm text-right tracking-tight mr-9 text-gray-300">
                        Current MXM
                    </p>
                    <p className="text-right mr-8">
                        <b className="text-2xl">
                        {price} ETH
                        </b>
                    </p>
                    <div className="flex justify-end mx-auto">
                    <button 
                        className="w-full sm:w-auto mb-12 sm:mb-0"
                        onClick={() => setShowModal(true)}>
                        <p className="sm:px-4 p-3 mt-2 mx-6 font-bold bg-white text-black hover:bg-slate-100 rounded-xl">
                            Claim the MXM
                        </p>
                    </button>
                </div>
            </div>
            <div className="absolute bottom-1 flex justify-center mx-auto w-full sm:w-auto m-2 sm:m-5">
                <div className="flex text-xs sm:text-sm text-gray-200 ml-1">
                    <p className="mx-2">What is the MXM?</p>
                    <p className="mx-2">Archive</p>
                    <p className="mx-2">Terms and conditions</p>
                </div>
            </div>
        </div>
      {showModal ? (
        <>
         <div className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ${closingAnimation ? 'slideOut' : 'fadeIn'}`}>
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Claim the MXM
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => handleClose()}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your bid"
                      className="px-3 py-2 border border-gray-300 rounded-md w-full"
                    />
                    <input
                      type="text"
                      placeholder="The message"
                      className="px-3 py-2 border border-gray-300 rounded-md w-full"
                    />
                    <div className="flex items-center">
                      <input
                        id="termsAndConditions"
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-gray-600"
                      /><label htmlFor="termsAndConditions" className="ml-2 text-sm text-gray-700">
                        I have read and accept the terms and conditions
                      </label>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)} // Implement the Next button action here
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
    )
};

