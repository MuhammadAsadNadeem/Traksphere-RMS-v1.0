import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import toaster from "../utils/toaster";
import authThunk from "../store/user/authThunk";

type SendOtpBtnProps = {
  email: string;
};

const SendOtpBtn: React.FC<SendOtpBtnProps> = ({ email }) => {
  const [isSended, setIsSended] = useState(false);
  const [timer, setTimer] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      setIsSended(false);
    }
  }, [timer]);

  const onClick = async () => {
    try {
      if (email) {
        setIsSended(true);
        await dispatch(authThunk.sendOtp(email)).unwrap();
        setTimer(60);
      } else {
        toaster.info("Add email to get 6-digit code");
      }
    } catch (error) {
      setIsSended(false);
      toaster.error(error as string);
    }
  };

  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={isSended}
      sx={{
        backgroundColor: isSended ? "grey" : "primary.main",
        "&:hover": {
          backgroundColor: isSended ? "grey" : "primary.dark",
        },
      }}
    >
      {timer > 0 ? `Resend in ${timer}s` : "Send"}
    </Button>
  );
};

export default SendOtpBtn;
