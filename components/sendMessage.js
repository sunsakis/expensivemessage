import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link.js';
import Image from 'next/image.js';
import axios from 'axios';
import { useRouter } from 'next/router.js';
import { FaArrowUp } from 'react-icons/fa';

export default function Header() {

const modalRef = useRef(null);
  const termsModalRef = useRef(null);
  const textareaRef = useRef(null);
  const [isWriting, setIsWriting] = useState(false);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [closingAnimation, setClosingAnimation] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const router = useRouter();

  const handleWriteClick = () => {
    setIsWriting(true);
    setShowModal(true);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target) && !termsModalRef.current) {
        setClosingAnimation(true);
        setTimeout(() => {
          setShowModal(false);
          setClosingAnimation(false);
          setIsWriting(false);
        }, 1000); // Duration of the slideOut animation
      }
      if (termsModalRef.current && !termsModalRef.current.contains(event.target) && !modalRef.current) {
        setShowTermsModal(false);
        setShowModal(true);
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);

  useEffect(() => {
    if (isWriting && textareaRef.current) {
      textareaRef.current.focus(); // Focus the textarea when isWriting is true
    }
    if (!isWriting) {
      setMessage(''); // Reset the message when isWriting is false
    }
  }, [isWriting]);

  const handleClose = () => {
    setClosingAnimation(true);
    setTimeout(() => {
      setShowModal(false);
      setClosingAnimation(false); // Reset the animation state for the next open
    }, 500); // Match this duration to your animation duration
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowTermsModal(true);
  };

  const handleAgreeAndSubmit = async () => {
    setShowTermsModal(false);
    // Submit the form
    try {
      const response = await axios.post('/api/post', { message: message });
      if (response.status === 200) {
        console.log('Message sent successfully');
        handleClose();
        if (router.pathname === '/') {
          router.reload();
        } else {
          router.push('/');
        }
      } else {
        console.error('Failed to send message');
      }
    }
    catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setClosingAnimation(true);
      setTimeout(() => {
        setShowTermsModal(false);
        setClosingAnimation(false);
      }, 300);
    }
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
          animation: fadeIn 1s ease-out forwards;
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        .fadeOut {
          animation: fadeOut 1s ease-out forwards;
        }
        `}
        </style>
        <div className="flex justify-center mx-auto pt-6 ml-4">
      <button 
          className="w-3/4 sm:w-auto mb-12 sm:mb-0 z-50"
          onClick={() => setShowModal(true)}
        >
          <p className="text-lg sm:px-10 p-3 mt-2 mx-6 font-semibold hover:bg-green-800 border-green-700 border rounded-xl transition duration-500 ease-in-out hover:border-green-500">
              Message The Messenger
          </p>
    </button>
  </div>
        <div className="relative bottom-3 w-full h-full">
          <div className="flex justify-center mx-auto">
            {!showModal ? (
              <button 
                className="w-full mb-10"
                onClick={handleWriteClick}
              >
                <p className="text-2xl p-3 mt-2 mx-6 font-semibold hover:bg-green-200 border-green-700 border rounded-xl transition duration-500 ease-in-out hover:border-green-500">
                  What's your message?
                </p>
              </button>
            ) : (
              !showTermsModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black z-20 my-20 mt-32">
                  <div ref={modalRef} className={`z-20 mt-2 mb-12 ml-6 w-3/4 ${closingAnimation ? 'fadeOut' : 'fadeIn'}`}
                    onAnimationEnd={() => {
                      if (closingAnimation) {
                        setMessage('');
                      }
                    }}>
                    <form className="flex items-center space-x-3 w-full" onSubmit={handleSubmit}>
                      <textarea
                        ref={textareaRef}
                        name="message"
                        rows="1"
                        placeholder="Max 160 chars"
                        className="px-3 py-3 border border-green-300 rounded-xl w-full text-white bg-black resize-none overflow-hidden"
                        required
                        maxLength="160"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
                        onInput={(e) => {
                          e.target.style.height = 'auto';
                          e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                      />
                      <button type="submit" className="text-white bg-green-900 hover:bg-green-500 rounded-3xl p-2">
                        <FaArrowUp />
                      </button>
                    </form>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="absolute bottom-0 flex justify-center mx-auto w-full m-1">
                <div className="flex text-xs sm:text-sm text-gray-200 ml-1">
                    <Link href="/what"><p className="mx-2">What is this?</p></Link>
                    <Link href="https://t.me/MostExpensiveChannel" rel="nofollow" target="_blank" className="mr-1">
                        <Image
                            src="/telegram.svg"
                            alt="Telegram logo"
                            width={15}
                            height={15}
                        />
                    </Link>
                    <Link href="/terms"><p className="mx-2">Terms and conditions</p></Link>
                </div>
          </div>
          {showTermsModal && (
        <div ref={termsModalRef} className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${closingAnimation ? 'fadeOut' : 'fadeIn'}`} onClick={handleCloseModal}>
          <div className="bg-white p-6 rounded-lg w-3/5" onClick={(e) => e.stopPropagation()}>
            <p className="mb-4 text-black">Please agree to the <Link href="/terms" target="_blank" className="text-blue-800 underline">terms and conditions</Link> before sharing your message!</p>
            <button
              className="bg-green-900 text-white p-2 rounded-lg w-full"
              onClick={handleAgreeAndSubmit}
            >
              Agree and Submit
            </button>
          </div>
        </div>
      )}
        </div>
    </>
    )
  }