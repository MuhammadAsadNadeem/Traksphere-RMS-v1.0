import React from "react";
import { TextField, DialogContent } from "@mui/material";
import { DriverResponse } from "../../types/admin.types";

interface DriverFormProps {
  selectedDriver: DriverResponse | null;
  onFieldChange: (field: keyof DriverResponse, value: string) => void;
}

const DriverForm: React.FC<DriverFormProps> = ({
  selectedDriver,
  onFieldChange,
}) => {
  return (
    <DialogContent>
      <TextField
        label="Full Name"
        value={selectedDriver?.fullName || ""}
        onChange={(e) => onFieldChange("fullName", e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="CNIC Number"
        value={selectedDriver?.cnicNumber || ""}
        onChange={(e) =>
          onFieldChange("cnicNumber", e.target.value.replace(/\D/g, ""))
        }
        fullWidth
        margin="normal"
        inputProps={{ maxLength: 13 }}
      />
      <TextField
        label="Contact Number"
        value={selectedDriver?.phoneNumber || ""}
        onChange={(e) =>
          onFieldChange("phoneNumber", e.target.value.replace(/\D/g, ""))
        }
        fullWidth
        margin="normal"
        inputProps={{ maxLength: 11 }}
      />
    </DialogContent>
  );
};

export default DriverForm;
