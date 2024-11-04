import React, { createContext, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { useCartContext } from "./CartContext";
import { useValidationContext } from "./ValidationContext";
import { ordersRef } from "../firebase/firestore";
import { addDoc, updateDoc } from "firebase/firestore";

const PurchaseContext = createContext();

export const PurchaseProvider = ({ children }) => {
  const { currentUser, userData, userDocRef } = useAuthContext();
  const { cart, setCart, cartTotalPrice } = useCartContext();
  const {
    validateEmail,
    validateName,
    validatePhoneNumber,
    validateCreditCardNumber,
    validateExpirationDate,
    validateCvc,
    formatPrice,
  } = useValidationContext();

  // Get order's total price (shipping excluded)
  const orderTotalPrice = () => {
    let totalPrice = 0;

    cart.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });

    return totalPrice;
  };

  // Get order's shipping price
  const shippingPrice = (deliveryOption) => {
    if (deliveryOption === "express") {
      if (cartTotalPrice() > 500) {
        return Number(0);
      } else {
        return Number(60);
      }
    } else {
      return Number(0);
    }
  };

  // Get one payment price (תשלום)
  const orderPayment = (totalPrice, numberOfPayments) => {
    const payment = totalPrice / numberOfPayments;

    return formatPrice(payment);
  };

  // // Get order's total price plus shipping
  // const finalPrice = (orderTotalPrice, shippingPrice) => {
  //   const totalPrice = orderTotalPrice + shippingPrice;

  //   return formatPrice(totalPrice);
  // };

  // Method to create a new order document
  const createOrderDocument = (shippingDetails, paymentDetails) => {
    const order = {
      purchase: {
        products: cart,
        shippingPrice: shippingPrice(shippingDetails.deliveryOption),
        productsPrice: cartTotalPrice(),
        totalPrice:
          cartTotalPrice() + shippingPrice(shippingDetails.deliveryOption),
        date: new Date().toDateString(),
      },
      customer: {
        userId: currentUser.uid,
        displayName: currentUser.displayName,
        fullName: shippingDetails.fullName,
        phoneNumber: shippingDetails.phoneNumber,
        email: shippingDetails.email,
      },
      shipping: {
        streetName: shippingDetails.streetName,
        houseNumber: shippingDetails.houseNumber,
        city: shippingDetails.city,
        deliveryOption: shippingDetails.deliveryOption,
        deliveryInfo: shippingDetails.deliveryInfo,
      },
      payment: {
        cardHolderName: paymentDetails.cardHolderName,
        cardNumber: paymentDetails.cardNumber,
        expirationDate: paymentDetails.expirationDate,
        cvc: paymentDetails.cvc,
        numberOfPayments: paymentDetails.numberOfPayments,
      },
    };

    return order;
  };

  // Method to finalize and create the order
  const completeOrder = (orderDetails, confirm) => {
    const shippingDetails = orderDetails.shipping;
    const paymentDetails = orderDetails.payment;

    // Shipping details error handling
    if (!validateName(shippingDetails.fullName)) {
      return Promise.reject(new Error("Please fill in your name"));
    }
    if (!shippingDetails.phoneNumber || shippingDetails.phoneNumber === "") {
      return Promise.reject(new Error("Please fill in your phone number"));
    }
    if (!validatePhoneNumber(shippingDetails.phoneNumber)) {
      return Promise.reject(new Error("Invalid phone number"));
    }
    if (!shippingDetails.email || shippingDetails.email === "") {
      return Promise.reject(new Error("Please fill in your email"));
    }
    if (!validateEmail(shippingDetails.email)) {
      return Promise.reject(new Error("Invalid email format"));
    }
    if (!shippingDetails.streetName || shippingDetails.streetName === "") {
      return Promise.reject(new Error("Please fill in the street name"));
    }
    if (!shippingDetails.houseNumber || shippingDetails.houseNumber === "") {
      return Promise.reject(new Error("Please fill in the house number"));
    }
    if (!shippingDetails.city || shippingDetails.city === "") {
      return Promise.reject(new Error("Please fill in the city"));
    }
    if (shippingDetails.deliveryOption === "none") {
      return Promise.reject(new Error("Please choose a delivery option"));
    }

    // Shipping details error handling
    if (
      !paymentDetails.cardHolderName ||
      paymentDetails.cardHolderName === ""
    ) {
      return Promise.reject(new Error("Please fill in the cardholder name"));
    }
    if (!paymentDetails.cardNumber || paymentDetails.cardNumber === "") {
      return Promise.reject(new Error("Please fill in the card number"));
    }
    if (!validateCreditCardNumber(paymentDetails.cardNumber)) {
      return Promise.reject(new Error("Invalid card number"));
    }
    if (
      !paymentDetails.expirationDate ||
      paymentDetails.expirationDate === ""
    ) {
      return Promise.reject(
        new Error("Please provide the card's expiration date")
      );
    }
    if (!validateExpirationDate(paymentDetails.expirationDate)) {
      return Promise.reject(new Error("Invalid expiration date (MM/YY)"));
    }
    if (!paymentDetails.cvc || paymentDetails.cvc === "") {
      return Promise.reject(
        new Error("Please provide the card's CVC security code")
      );
    }
    if (!validateCvc(paymentDetails.cvc)) {
      return Promise.reject(new Error("Invalid CVC (must be a 3 digit code)"));
    }

    // Check if cofirm message is checked
    if (!confirm) {
      return Promise.reject(new Error("Please confirm your information and check this box"));
    }

    // Create a new order document
    const newOrder = createOrderDocument(shippingDetails, paymentDetails);

    // Add the order to the orders collection in Firestore
    return addDoc(ordersRef, newOrder).then(() => {
      // Empty the user's cart in the app and firebase
      return updateDoc(userDocRef, { cart: [] })
        .then(() => {
          setCart([]);

          // Add the new order to the user's orders array
          const currentOrders = userData.orders || [];
          const updatedOrders = [...currentOrders, newOrder];
          return updateDoc(userDocRef, {
            orders: updatedOrders,
          });
        })
        .catch((error) => {
          alert("Failed to complete the order", error);
        });
    });
  };

  const globalVal = {
    shippingPrice,
    orderTotalPrice,
    orderPayment,
    // finalPrice,
    completeOrder,
  };

  return (
    <PurchaseContext.Provider value={globalVal}>
      {children}
    </PurchaseContext.Provider>
  );
};

export const usePurchaseContext = () => useContext(PurchaseContext);
