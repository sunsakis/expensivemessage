import { useState, useEffect, useRef } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useStorageUpload, Web3Button, useSigner } from '@thirdweb-dev/react';
import { Interface, FormatTypes } from 'ethers/lib/utils';
import { Alchemy } from 'alchemy-sdk';
import ABI from '../contract/ABI.js';

export default function Modal({  }) {
    const [closingAnimation, setClosingAnimation] = useState(false);
    const [message, setMessage] = useState('');
    const [bid, setBid] = useState(0.0002);
    const [name, setName] = useState('');
    const [imgHash, setImgHash] = useState('');
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);
  
    const router = useRouter();
    const signer = useSigner();
  
    const iface = new Interface(ABI);
    const jsonABI = iface.format(FormatTypes.json);
  
    useEffect(() => {
      const fileInput = fileInputRef.current;
      if (!fileInput) return;
  
      const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.size > 5 * 1024 * 1024) {
          alert('File size should not exceed 5MB');
          fileInput.value = ''; // Reset the file input so no file is selected
        } else if (file && !['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
          alert('Please select an image file (jpg, png, gif, webp)');
          fileInput.value = ''; // Reset the file input so no file is selected
        }
  
      // Create a FileReader to read the uploaded file
      // const reader = new FileReader();
      // reader.onload = (e) => {
      //   const img = new Image();
      //   img.onload = () => {
      //     // Check if the image is very wide
      //     const aspectRatio = img.width / img.height;
      //     if (aspectRatio > 2) { // Example threshold for "very wide" images
      //       alert('Very wide images may not display well. Please select an image with a more standard aspect ratio.');
      //     } 
      //   };
      //   img.src = e.target.result;
      // };
      // reader.readAsDataURL(file);
  
      };
  
      fileInput.addEventListener('change', handleFileChange);
  
      return () => {
        fileInput.removeEventListener('change', handleFileChange);
      };
    }, [fileInputRef.current]); // This effect runs when the ref changes
  
    const { mutateAsync: upload } = useStorageUpload();
  
    const handleClose = () => {
      setClosingAnimation(true);
      setTimeout(() => {
        //setShowModal(false);
        setClosingAnimation(false); // Reset the animation state for the next open
      }, 500); // Match this duration to your animation duration
    };
  
    const handleTextChange = (e) => {
      try{
          setMessage(e.target.value.toString());
          } catch (error) {
          alert(error);
          }
    };
  
    const handleBidChange = (e) => {
      try {
        // Parse the input value to a float
        const inputBid = parseFloat(e.target.value);
        setBid(inputBid.toString()); // Convert back to string
      } catch (error) {
        alert(error);
      }
    };
  
    const handleNameChange = (e) => {
      try {
        setName(e.target.value.toString());
      } catch (error) {
        alert(error);
      }
    }
  
    const handleImageChange = (e) => {
      
        try {
          const file = e.target.files[0];
          uploadToIPFS(file);
        }
        catch (error) {
          alert(error);
        };
      
    }
  
    const uploadToIPFS = async (file) => {
      if (!file) setImgHash('');
      try {
        setLoading(true);
        const uri = await upload({
          data: [file],
        }
      );
        if (uri.length !== 0) {
        setImgHash(uri[0].toString());
        }
        else {
          setImgHash('');
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
  
    const sendMessageToTelegram = async (msg, bid) => {
      try {
        const response = await fetch('/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ msg: msg, bid: bid }),
        });
        if (response.ok) {
          console.log('Message sent successfully');
        } else {
          console.error('Failed to send message');
        }
      }
      catch (error) {
        console.error(error);
      }
    };
  
    const msgPriceFloat = parseFloat(price); // Convert msgPrice to a number
    const fivePercentOfMsgPrice = msgPriceFloat * 0.05; // Calculate 5% of msgPrice
    const minBidValue = Math.max(fivePercentOfMsgPrice, 0.0002); // Compare and get the higher value
    const minBid = (parseFloat(msgPriceFloat + minBidValue)).toFixed(4);
    
  
    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent the default form submission
      try {
        // Validate bid is a string and not empty
        if (typeof bid !== 'string' || bid.trim() === '') {
          throw new Error('Bid must be a non-empty string');
        }
  
  
        const alchemy = new Alchemy(settings);
        const provider = await alchemy.config.getProvider();
        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
          ABI,
          signer
        );
      
        const parsedBid = ethers.utils.parseEther((bid).toString());
  
        await contract.setMessage( message, imgHash, name, { value: parsedBid } ).then((tx) => {
          return provider.waitForTransaction(tx.hash);
        }).then(() => {
          sendMessageToTelegram(message, bid);
          if (router.pathname === '/') {
            router.reload();
          } else {
            router.push('/');
          }
          handleClose();
          setLoading(false);
          
        });
      } catch (error) {
        console.error(error); // Log the error for debugging
        alert(error.message);
        setLoading(false);
      }
    };

    return (
        <>
            <div className="fixed inset-0 bg-black opacity-60 z-40 flex justify-center items-center" onClick={() => handleClose()}></div> 
            <div className={`justify-center items-center flex fixed inset-0 max-w-xs md:max-w-md max-h-fit my-auto mx-auto z-50 outline-none focus:outline-none ${closingAnimation ? 'slideOut' : 'fadeIn'}`} onClick={(e) => e.stopPropagation()}>
            <div className="relative w-auto mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                    <h3 className="text-xl font-semibold text-black">
                    Claim the MXM
                    </h3>
                    <button
                    className="ml-auto bg-transparent border-0 float-right leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => handleClose()}
                    >
                    <span className="bg-transparent text-red-800 h-5 w-5 text-xl block">
                        x
                    </span>
                </button>
                </div>
                <div className="relative p-6 flex-auto">
                    <form 
                    className="space-y-1"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="bid" className="text-black">
                        Your bid:
                    </label>
                    <input
                        onChange={handleBidChange}
                        id="bid"
                        type="number"
                        step="0.0001"
                        min={minBid}
                        placeholder={minBid + " ETH or higher"}
                        className="px-3 py-2 border border-gray-300 rounded-md w-full text-gray-600"
                        required
                    />
                    <div className="pt-4">
                    <label className="text-black">
                        The message:
                    </label>
                    <textarea
                        onChange={handleTextChange}
                        rows="4"
                        placeholder="The message"
                        className="px-3 py-3 mt-1 border border-gray-300 rounded-md w-full text-gray-600"
                        required
                        maxLength="160"
                    />
                    </div>
                    <label htmlFor="name" className="text-black text-sm">
                        Name, handle or ETH address (optional):
                    </label>
                    <input
                        onChange={handleNameChange}
                        id="name"
                        type="text"
                        placeholder=""
                        className="px-3 py-2 border border-gray-300 rounded-md w-full text-gray-600"
                        maxLength="50"
                    />
                    <div className="">
                        <label htmlFor="pic" className="text-black text-sm">
                        Picture (optional, 1:1 aspect ratio best):
                        </label>
                        <input
                        onChange={handleImageChange}
                        id="pic"
                        type="file"
                        accept="image/*"
                        className="py-2 pl-1 border border-gray-300 rounded-md w-full text-gray-600"
                        ref={fileInputRef}
                        />
                    </div>
                    <div className="flex items-center pt-2">
                        <input
                        id="termsAndConditions"
                        type="checkbox"
                        required
                        className="form-checkbox h-5 w-5 text-gray-600"
                        /><label htmlFor="termsAndConditions" className="ml-2 text-sm text-gray-700">
                        I have read and accept the terms and conditions
                        </label>
                    </div>
                    <div className="flex items-center justify-center p-3 pb-2 border-solid border-gray-300 rounded-b">
                    {!loading && (
                        <Web3Button
                        contractAddress={process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}
                        contractAbi={jsonABI}
                        // action={async (contract) => 
                        //   {
                        //     try {
                        //     await contract.call("setMessage", [message, imgHash, name], { value: ethers.utils.parseEther(bid.toString()) });
                        //     } catch (error) {
                        //       console.error(error);
                        //     }
                        //   }
                        // }
                        // onError={() => 
                        //   alert("Make sure to fill out the fields properly and have enough ETH in the wallet. Message sunsakis@pm.me for guidance.")
                        //   // .then(router.reload(window.location.pathname))
                        // }

                        // onSuccess={() => {
                        //   sendMessageToTelegram(message);
                        //   router.reload(window.location.pathname)
                        // }}
                        onClick={handleSubmit}
                        >
                        Submit
                        </Web3Button>
                    )}
                    {loading && (
                        <button
                        className="bg-gray-100 rounded-lg font-medium p-2 px-5 text-black transition-all"
                        type="button" // Change to "button" to prevent form submission when loading
                        disabled // Disable the button to prevent multiple submissions
                    >
                        Uploading...
                    </button>
                    // ) : (
                    //   <button
                    //     className="
                    //       bg-purple-400 rounded-2xl font-medium p-2 px-5 hover:bg-purple-500 hover:text-white transition-all
                    //     " 
                    //     type="submit"
                    //   >
                    //     Submit
                    //   </button>
                    )} 
                </div>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}