import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import { grey } from "@mui/material/colors";
import Navbar from "../components/NavBar";
import SideBar from "../components/sideBar";

const Private = () => {
  return (
    <Box minHeight="100vh" sx={{ bgcolor: grey[200] }}>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <SideBar />
        <Box width="100%">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Private;
