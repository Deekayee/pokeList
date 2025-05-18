import {
  Button,
  Checkbox,
  FormControlLabel,
  Popover,
  Box,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';

const FilterPopover = ({ label, options, selectedOptions, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        variant="contained"
        sx={{
          backgroundColor: '#1f1d2e',
          color: '#faf4ed',
          border: '1px solid #2a273f',
          textTransform: 'none',
          flex: 1,
          maxWidth: '250px',
          mr: 1,
          '&:hover': {
            backgroundColor: '#2a273f',
          },
        }}
      >
        {label}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            backgroundColor: '#1f1d2e',
            color: '#faf4ed',
            p: 2,
            maxHeight: 300,
            overflow: 'auto',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ mb: 1, fontWeight: 600 }}>{label}</Typography>
          {options.map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  checked={selectedOptions.includes(option)}
                  onChange={() => onChange(option)}
                  sx={{ color: '#eb6f92' }}
                />
              }
              label={option}
            />
          ))}
        </Box>
      </Popover>
    </>
  );
};

FilterPopover.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selectedOptions: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FilterPopover;
