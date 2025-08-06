import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { allCategories } from "../../constants/categories";

const ListFilters = ({
  filterCategory,
  setFilterCategory,
  filterType,
  setFilterType,
  sortField,
  setSortField,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="filter-category-label">Category</InputLabel>
        <Select
          labelId="filter-category-label"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {allCategories.map((category) => (
            <MenuItem value={category.name} key={category.name}>
              {category.emoji} {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="filter-type-label">Type</InputLabel>
        <Select
          labelId="filter-type-label"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="income">Income</MenuItem>
          <MenuItem value="expense">Expense</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel id="sort-field-label">Sort By</InputLabel>
        <Select
          labelId="sort-field-label"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="amount">Amount</MenuItem>
          <MenuItem value="date">Date</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ListFilters;
