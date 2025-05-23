import { Box, Typography, useTheme } from "@mui/material";

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const theme = useTheme();

  return (
    <Box mb="30px">
      <Typography
        variant="h3"
        fontWeight="bold"
        color={theme.palette.primary.main}
        mb="5px"
      >
        {title}
      </Typography>
      <Typography variant="h6" color={theme.palette.secondary.main}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
