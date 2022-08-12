import { Box, Center, Container, Divider } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/checkoutForm";


const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export default function Checkout(props) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      <h1>Username</h1>

      <Center>
        <Container>

          <Box mb="10%" h="100%">
            <Box
              h="10%"
              borderColor="black"
              borderWidth="1px"
              borderStyle="groove"
              bg="gray.100"
            >
              <p>Service title</p>
              <Divider orientation="horizontal" />
              <p>Description</p>
              <Divider orientation="horizontal" />
              <p align="right" id ="newSiteId">Cost</p>
            </Box>
            <Box
              borderColor="black"
              borderWidth="1px"
              borderStyle="groove"
              bg="gray.100"
            >
              <p>Service title</p>
              <Divider orientation="horizontal" />
              <p>Description</p>
              <Divider orientation="horizontal" />
              <p align="right">Cost</p>
            </Box>
            <Box
              borderColor="black"
              borderWidth="1px"
              borderStyle="groove"
              bg="gray.100"
            >
              <p>Service title</p>
              <Divider orientation="horizontal" />
              <p>Description</p>
              <Divider orientation="horizontal" />
              <p align="right">Cost</p>
            </Box>
            <Box
              borderColor="black"
              borderWidth="1px"
              borderStyle="groove"
              bg="gray.100"
            >
              <p>Service title</p>
              <Divider orientation="horizontal" />
              <p>Description</p>
              <Divider orientation="horizontal" />
              <p align="right">Cost</p>
            </Box>
          </Box>

          <Box>
            Total:
            <Box
              borderColor="black"
              borderWidth="1px"
              borderStyle="groove"
              bg="gray.100"
            >
              <p align="right">add total here</p>
            </Box>
          </Box>

          <Box
              borderColor="black"
              borderWidth="1px"
              borderStyle="groove"
              bg="teal.500"
              p="5%">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}

          </Box>

        </Container>
      </Center>
 
    </div>
  );
}
