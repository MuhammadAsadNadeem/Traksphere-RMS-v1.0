import { Box, Typography } from "@mui/material";
import theme from "../theme";

interface CustomNoRowsOverlayProps {
  message: string;
}

const CustomNoRowsOverlay = ({
  message,
}: CustomNoRowsOverlayProps): JSX.Element => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      p: 2,
    }}
  >
    <Typography variant="body1" color={theme.palette.primary.main}>
      {message}
    </Typography>
  </Box>
);

export default CustomNoRowsOverlay;
