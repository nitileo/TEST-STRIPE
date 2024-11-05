const stripe = require("stripe")(
    "SECERT_KEY"
  );
  
  exports.payment = async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000,
        currency: "thb",
        payment_method_types: ["card","promptpay"], 
      });
  
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).send({ error: "An error occurred while creating the payment intent." });
    }
  };

  async function getPaymentMethodDetails(paymentIntentId) {
    try {
      // Step 1: Retrieve the payment intent
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  
      // Step 2: Retrieve the payment method details using the payment_method ID from the payment intent
      const paymentMethod = await stripe.paymentMethods.retrieve(paymentIntent.payment_method);
  
      // Step 3: Decode and use the payment method details
      console.log("Payment Method Details:", paymentMethod);
      return paymentMethod;
    } catch (error) {
      console.error("Error retrieving payment method details:", error);
      throw error;
    }
  }
  
  // Usage example
  getPaymentMethodDetails("pi_3QHiKiBU681vIFBk2WfwBrSs"); // Replace with your actual payment intent ID
