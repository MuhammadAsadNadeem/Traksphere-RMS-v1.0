import React from "react";
import { TextField, DialogContent } from "@mui/material";
import { UserResponse } from "../../types/admin.types";

interface UserFormProps {
  selectedUser: UserResponse | null;
  onFieldChange: (field: keyof UserResponse, value: string) => void;
}

const UserForm: React.FC<UserFormProps> = ({ selectedUser, onFieldChange }) => {
  return (
    <DialogContent>
      <TextField
        label="Full Name"
        value={selectedUser?.fullName || ""}
        onChange={(e) => onFieldChange("fullName", e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        value={selectedUser?.email || ""}
        onChange={(e) => onFieldChange("email", e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Registration Number"
        value={selectedUser?.registrationNumber || ""}
        onChange={(e) => onFieldChange("registrationNumber", e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Department Name"
        value={selectedUser?.departmentName || ""}
        onChange={(e) => onFieldChange("departmentName", e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone Number"
        value={selectedUser?.phoneNumber || ""}
        onChange={(e) => onFieldChange("phoneNumber", e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Route Number"
        value={selectedUser?.routeNumber || ""}
        onChange={(e) => onFieldChange("routeNumber", e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Stop Area"
        value={selectedUser?.stopArea || ""}
        onChange={(e) => onFieldChange("stopArea", e.target.value)}
        fullWidth
        margin="normal"
      />
    </DialogContent>
  );
};

export default UserForm;
