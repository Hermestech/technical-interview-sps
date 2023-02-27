import * as React from 'react';
import { Select, SelectChangeEvent, MenuItem } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

import { useFilteredProducts } from '@/context/AppContext';

type SearchBarProps = {
    onSearch: (value: string) => void;
};


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.95),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
      '&:focus': {
        width: '60ch',
      },
    },
  },
}));

const categories: ICategories[] = [
  {
    name: 'All',
    value: 'all',
  },
  {
    name: 'Electronics',
    value: 'electronics',
  },
  {
    name: 'Jewelery',
    value: 'jewelery',
  },
  {
    name: 'Men\'s clothing',
    value: 'men\'s clothing',
  },
  {
    name: 'Women\'s clothing',
    value: 'women\'s clothing',
  },
] 

const mapCategoriesToMenuItems = (categories: ICategories[]) => { 
  return categories.map((category) => (
    <MenuItem value={category.value} key={category.value}>
      {category.name}
    </MenuItem>
  ))
}



export const SearchBar = () => {
    const { setCurrentCategory, currentCategory, setSearchProduct } = useFilteredProducts();
    
    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCurrentCategory(event.target.value);
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => { 
        const { value } = event.target;
        setSearchProduct(value);
    }
    return (
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearch}
              />
            <Select
              labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentCategory}
                onChange={handleCategoryChange}
                label="Category"
            >
              {mapCategoriesToMenuItems(categories)}
            </Select>
        </Search>
    )
}