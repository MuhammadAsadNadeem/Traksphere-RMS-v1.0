import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import Navbar from "../components/NavBar";

const Public = () => {
  return (
    <Box minHeight="100vh" sx={{ bgcolor: grey[200] }}>
      <Navbar />
      <Box
        minHeight="88vh"
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Public;
