import React from "react";
import {
  Card,
  CardContent,
  Typography,
  SxProps,
  Theme,
  Box,
} from "@mui/material";

interface CardComponentProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  color?: string;
  sx?: SxProps<Theme>;
}

const CardComponent: React.FC<CardComponentProps> = ({
  icon,
  title,
  value,
  color = " theme.palette.secondary.main",
  sx,
}) => {
  return (
    <Card
      sx={{
        boxShadow: 3,
        background: "white",
        ...sx,
      }}
    >
      <CardContent>
        <Box sx={{ color }}>{icon}</Box>
        <Typography variant="h5" sx={{ color, mt: 1 }}>
          {title}
        </Typography>
        <Typography variant="h3" sx={{ color }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
