// Context for input validation and formatting methods
import React, { createContext, useContext } from "react";

const ValidationContext = createContext();

export const ValidationProvider = ({ children }) => {
  // Validation methods:
  // Email validation
  const validateEmail = (email) => {
    // Must contain email characteristics (@ . domain)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation
  const validatePassword = (password) => {
    // Must contain at least 8 characters, one number, one symbol, and one capital letter
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Display name validation
  const validateName = (name) => {
    // Can't be empty
    return name.trim().length > 0;
  };

  // Phone number validation
  const validatePhoneNumber = (phoneNumber) => {
    // Must be at least 9 characters long (home phone number length) digits only
    const phoneNumberRegex = /^\d+$/;

    return phoneNumberRegex.test(phoneNumber) && phoneNumber.length >= 9;
  };

  // Credit card number validation
  const validateCreditCardNumber = (cardNumber) => {
    // Must be 19 characters long (16 numbers and 3 spaces) digits only
    const creditCardRegex = /^[\d\s]+$/;

    return creditCardRegex.test(cardNumber) && cardNumber.length === 19;
  };

  // Credit card's expiration date validation
  const validateExpirationDate = (expirationDate) => {
    // Must include 4 digits and one slash between them
    // Month number to the left must be between 01-12
    const expirationRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    return expirationRegex.test(expirationDate) && expirationDate.length === 5;
  };

  // Credit card's CVC security code validation
  const validateCvc = (cvc) => {
    // Must be 3 character long - digits only
    const cvcRegex = /^\d+$/;

    return cvcRegex.test(cvc) && cvc.length === 3;
  };

  // Method to format price text with commas and currency sign
  const formatPrice = (price) => {
    const formattedPrice = price.toLocaleString("en-US", {
      style: "currency",
      currency: "ILS",
      minimumFractionDigits: 0,
    });

    return formattedPrice;
  };

  // Method to format style for small square logos
  const smallSquareLogoStyle = (brand) => {
    const smallSquareLogoStyle =
      brand === "Nikon" ||
      brand === "Leica" ||
      brand === "Zeiss" ||
      brand === "DJI" ||
      brand === "Insta360"
        ? { width: "40px", height: "35px" }
        : {};

    return smallSquareLogoStyle;
  };

  // Method to format style for large square logos
  const largeSquareLogoStyle = (brand) => {
    const largeSquareLogoStyle =
      brand === "Nikon" ||
      brand === "Leica" ||
      brand === "Zeiss" ||
      brand === "DJI" ||
      brand === "Insta360"
        ? { width: "70px", height: "70px" }
        : {};

    return largeSquareLogoStyle;
  };

  const globalVal = {
    validateEmail,
    validatePassword,
    validateName,
    validatePhoneNumber,
    validateCreditCardNumber,
    validateExpirationDate,
    validateCvc,
    formatPrice,
    smallSquareLogoStyle,
    largeSquareLogoStyle,
  };

  return (
    <ValidationContext.Provider value={globalVal}>
      {children}
    </ValidationContext.Provider>
  );
};

export const useValidationContext = () => useContext(ValidationContext);
