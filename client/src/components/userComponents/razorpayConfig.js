const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

export const displayRazorpay = async (amount) => {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  if (!res) {
    alert("You are offline");
    return;
  }

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY,
    currency: "INR",
    amount: amount * 100,
    name: "MEDCORE",

    prefill: {
      name: "MEDCORE",
    },
  };

  const paymentPromise = new Promise((resolve, reject) => {
    options.handler = function (response) {
      if (response.razorpay_payment_id) {
        resolve(response.razorpay_payment_id);
      } else {
        reject("Payment failed");
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  });

  try {
    const paymentId = await paymentPromise;
    return paymentId;
  } catch (error) {
    console.log(error);
  }
};
