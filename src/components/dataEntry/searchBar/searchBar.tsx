//region Global Imports
import { InputAdornment, TextField } from "@mui/material";
import  { type ChangeEvent, useId } from "react";
import SearchIcon from "@mui/icons-material/Search";
//endregion

const COMPONENT_KEY = "SearchBarComponent";

function SearchBarComponent({onSearch, searchTerm}: {
  onSearch: (search: string) => void;
  searchTerm: string;
}) {

  const id = `search-${useId()}`;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch && onSearch(event.target.value);
  };
  return (
    <TextField
      id={id}
      type="search"
      label="Search"
      value={searchTerm}
      onChange={handleChange}
      sx={{ width: 600 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export { COMPONENT_KEY };
export default SearchBarComponent;