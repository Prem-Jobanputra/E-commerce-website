// import React, { useState, useEffect } from 'react';
// import DropIn from 'braintree-web-drop-in-react';

// export const handlePayment = async (instance, amount, setError) => {
//   try {
//     const { nonce } = await instance.requestPaymentMethod();
//     const response = await fetch('/api/braintree/payment', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ paymentMethodNonce: nonce, amount }),
//     });
    
//     const result = await response.json();
//     if (result.success) {
//       alert('Payment successful!');
//     } else {
//       setError(result.message);
//     }
//   } catch (error) {
//     setError(error.message);
//   }
// };

// const Payment = ({ amount }) => {
//   const [clientToken, setClientToken] = useState(null);
//   const [instance, setInstance] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('/api/braintree/getToken')
//       .then(response => response.json())
//       .then(data => setClientToken(data.clientToken))
//       .catch(err => setError(err));
//   }, []);

//   return clientToken ? (
//     <div>
//       <DropIn
//         options={{ authorization: clientToken }}
//         onInstance={(instance) => setInstance(instance)}
//       />
//       <button onClick={() => handlePayment(instance, amount, setError)}>Pay Now</button>
//       {error && <div>Error: {error}</div>}
//     </div>
//   ) : (
//     <div>Loading...</div>
//   );
// };

// export default Payment;

import React, { useState, useEffect } from 'react';
import DropIn from 'braintree-web-drop-in-react';
import { motion } from "framer-motion";


const Payment = ({ amount }) => {
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/braintree/getToken')
      .then(response => response.json())
      .then(data => setClientToken(data.clientToken))
      .catch(err => setError(err));
  }, []);

  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const response = await fetch('/api/braintree/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethodNonce: nonce, amount }),
      });
      
      const result = await response.json();
      if (result.success) {
        alert('Payment successful!');
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return clientToken ? (
    <div>
      <DropIn
        options={{ authorization: clientToken }}
        onInstance={(instance) => setInstance(instance)}
      />
      <motion.button
					className='flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handlePayment}
				>
					Proceed to Checkout
				</motion.button>
      {error && <div>Error: {error}</div>}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Payment;