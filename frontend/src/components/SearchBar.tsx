import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import theme from "../theme";
interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
  isMobile?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  placeholder = "Search...",
  isMobile = false,
}) => (
  <TextField
    value={searchQuery}
    onChange={(e) => onSearchChange(e.target.value)}
    placeholder={placeholder}
    variant="outlined"
    size="small"
    sx={{
      width: isMobile ? "100%" : "300px",
      backgroundColor: theme.palette.primary.contrastText,
      "& .MuiOutlinedInput-root": {
        borderRadius: 3,
        "&:hover fieldset": {
          borderColor: theme.palette.primary.dark,
        },
      },
    }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Search sx={{ color: theme.palette.primary.dark }} />
        </InputAdornment>
      ),
    }}
  />
);

export default SearchBar;
