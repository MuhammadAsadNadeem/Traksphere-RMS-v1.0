import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, LinkProps } from "@mui/material";

interface MDLinkProps extends LinkProps {
  to: string;
}

const MDLink: React.FC<MDLinkProps> = ({ to, children, sx, ...props }) => {
  return (
    <Link
      component={RouterLink}
      to={to}
      sx={{
        textDecoration: "none",
        "&:hover": { textDecoration: "underline" },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Link>
  );
};

export default MDLink;
