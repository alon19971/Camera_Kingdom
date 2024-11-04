// Quantity NumberInput component
import React from "react";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const QuantityInput = React.forwardRef(function CustomNumberInput(props, ref) {
  return (
    <NumberInput
      slots={{
        root: "div",
        input: "input",
        incrementButton: "button",
        decrementButton: "button",
      }}
      slotProps={{
        root: { className: "quantity-input-container" },
        input: { className: "form-controls quantity-input" },
        incrementButton: {
          children: <AddIcon fontSize="small" />,
          className: "quantity-button increment",
        },
        decrementButton: {
          children: <RemoveIcon fontSize="small" />,
          className: "quantity-button",
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

export default QuantityInput;
