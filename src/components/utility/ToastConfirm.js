// Custom toastify confirm notification box
import React from "react";
import { toast } from "react-toastify";

const ToastConfirm = ({ question }) => {
  let isConfirmed = false;

  const showConfirmationToast = () => {
    toast.warning(
      ({ closeToast }) => (
        <>
          <p>{question}</p>
          <button
            onClick={() => {
              isConfirmed = true;
              closeToast();
            }}
            style={{ marginRight: "10px" }}
          >
            Confirm
          </button>
          <button onClick={closeToast()}>Cancel</button>
        </>
      ),
      // Keep the notification box open until the user clicks a button
      { autoClose: false }
    );
  };

  showConfirmationToast();

  return isConfirmed;
};

export default ToastConfirm;
