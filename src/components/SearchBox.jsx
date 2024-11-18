import React from "react";
import { TextField, Box } from "@mui/material";
import PropTypes from "prop-types";

const SearchBox = ({ searchTerm, setSearchTerm }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Search Pokémon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        sx={{
          backgroundColor: "#1f1d2e",
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.2)", // Default border color
            },
            "&:hover fieldset": {
              borderColor: "#faf4ed", // Border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#eb6f92", // Border color when focused
            },
          },
          "& .MuiInputLabel-root": {
            color: "#faf4ed", // Default label color
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#eb6f92", // Label color when focused
          },
        }}
      />
    </Box>
  );
};

SearchBox.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default SearchBox;
