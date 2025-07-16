import { Box, Button } from '@mui/material';
import FilterPopover from './FilterPopover';
import PropTypes from 'prop-types';

const FilterControls = ({ allRegions, selectedRegions, onRegionToggle, allTypes, selectedTypes, onTypeToggle, onResetFilters }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        mt: 2,
        mb: 3,
      }}
    >
      <Box sx={{ display: 'flex', flex: 1, gap: 1 }}>
        <FilterPopover
          label='Region'
          options={allRegions}
          selectedOptions={selectedRegions}
          onChange={onRegionToggle}
        />
        <FilterPopover
          label='Type'
          options={allTypes}
          selectedOptions={selectedTypes}
          onChange={onTypeToggle}
        />
      </Box>

      <Button
        onClick={onResetFilters}
        sx={{
          backgroundColor: '#eb6f92',
          color: '#191724',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          px: 3,
          flexShrink: 0,
          '&:hover': {
            backgroundColor: '#f0839e',
          },
        }}
      >
        Reset Filters
      </Button>
    </Box>
  );
};

FilterControls.propTypes = {
  allRegions: PropTypes.array.isRequired,
  selectedRegions: PropTypes.array.isRequired,
  onRegionToggle: PropTypes.func.isRequired,
  allTypes: PropTypes.array.isRequired,
  selectedTypes: PropTypes.array.isRequired,
  onTypeToggle: PropTypes.func.isRequired,
  onResetFilters: PropTypes.func.isRequired,
};

export default FilterControls;