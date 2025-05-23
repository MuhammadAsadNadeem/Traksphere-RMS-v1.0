import React from "react";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";

interface SpanLoaderProps {
  size?: number;
  speed?: number;
  message?: string;
}

const SpanLoader: React.FC<SpanLoaderProps> = ({
  size = 150,
  speed = 0.5,
  message,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
        position: "relative",
      }}
    >
      <CircularProgress
        size={size + 40}
        thickness={3}
        sx={{
          position: "absolute",
          animation: `spin ${speed}s linear infinite`,
          color: theme.palette.primary.light,
        }}
      />

      <Box
        component="img"
        src="/src/assets/images/logo.svg"
        alt="TrakSphere Logo"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/path/to/fallback-image.svg";
        }}
        sx={{
          width: size,
          height: size,
        }}
      />

      {message && (
        <Typography
          variant="body1"
          sx={{
            marginTop: 2,
            color: theme.palette.text.primary,
            fontSize: "1.2rem",
            fontWeight: 500,
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default SpanLoader;
