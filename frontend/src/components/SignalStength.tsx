import React from "react";
import { Box, Typography, Stack } from "@mui/material";

type SignalStrengthProps = {
  value: number; // 0 to 30
};

const getSignalLevel = (value: number) => {
  if (value <= 6) return 0;
  if (value <= 12) return 1;
  if (value <= 18) return 2;
  if (value <= 24) return 3;
  return 4;
};

const getColor = (value: number) => {
  if (value <= 9) return "#f44336"; // red
  if (value <= 19) return "#ff9800"; // orange
  return "#4caf50"; // green
};

const SignalStrength: React.FC<SignalStrengthProps> = ({ value }) => {
  const level = getSignalLevel(value);
  const color = getColor(value);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Stack direction="row" spacing={0.5} alignItems="flex-end">
        {[0, 1, 2, 3, 4].map((bar) => (
          <Box
            key={bar}
            sx={{
              width: 10,
              height: 10 + bar * 10,
              borderRadius: 1,
              backgroundColor: bar <= level ? color : "#e0e0e0",
              transition: "background-color 0.2s ease",
            }}
          />
        ))}
      </Stack>
      <Typography variant="subtitle1" mt={8} sx={{ fontWeight: "bold" }}>
        Signal Strength
      </Typography>
    </Box>
  );
};

export default SignalStrength;
