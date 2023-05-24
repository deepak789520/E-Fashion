import express from "express";
import stripe from "stripe";
import { ordermodule } from "../model/order_schema.js";
import dotenv from "dotenv";
dotenv.config();
const stripekey = stripe(process.env.STRIPE_PAYMENT_KEY);
const clienturl = process.env.CLIENT_URL_LINK;
export const striperouter = express.Router();

striperouter.post('/payment-checkout', async (req, res) => {
  const cartitem = req.body.cart; // Assuming the request body contains the 'cartitem' array 
  const address = req.body.address;
  console.log(address)
  const customer = await stripekey.customers.create({
    metadata: {
      userId: req.body.userid,
      cart: JSON.stringify(cartitem),
      customeraddress: JSON.stringify(address)
    }
  });

  const lineItems = cartitem.map(items => {
    return {
      price_data: {
        currency: "INR",
        product_data: {
          name: items.name,
        },
        unit_amount: items.price * 100,
      },
      quantity: items.quantity,
    };
  });
  
  try {
    const session = await stripekey.checkout.sessions.create({
      customer: customer.id,
      line_items: lineItems,
      mode: 'payment',
      success_url: `${clienturl}/successpage`,
      cancel_url: `${clienturl}/cancel`,
    });
  
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

const createOrder = async(customer,data)=>{
  const items= JSON.parse(customer.metadata.cart)
  const details= JSON.parse(customer.metadata.customeraddress)
  const newOrder= new ordermodule({
    userId :customer.metadata.userId,
    customerId:data.customer,
    paymentIntentId:data.payment_intent,
    products:items,
    subtotal:data.amount_subtotal,
    total:data.amount_total,
    shippingaddress:details,
    payment_status:data.payment_status,
  });
try {
  const savedorder = await newOrder.save()
  console.log("Processed Order: ",savedorder)
} catch (error) {
  console.log(error)
}
}

let endpointSecret;
// endpointSecret = "whsec_8fb2a957bf6b8f1c803267dcfda5099a69c22155f84b49d343c54021a7ee649b";

striperouter.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  
  const sig = req.headers['stripe-signature'];
  let data;
  let eventType;

  if(endpointSecret){
    let event;

    try {
      event = stripekey.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("verified")
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`)
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data=event.body.object;
    eventType = event.type
  }
  else{
    data = req.body.data.object;
    eventType=req.body.type;
  }

  if (eventType==="checkout.session.completed"){
    stripekey.customers.retrieve(data.customer)
    .then((customer)=>{
      createOrder(customer,data)
    }).catch((err)=> console.log(err.message))

  }

  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
});
