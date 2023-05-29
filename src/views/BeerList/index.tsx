//region Global Imports
import {
  Avatar, List, ListItemAvatar, ListItemButton, ListItemText, ButtonGroup, Button, Grid, Typography
} from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';
//endregion
import { useBeerData } from './useBeerData'
import { BEER_BREWERY_TYPE, BEER_NAME, BeerField } from './consts'
import { PaginationComponent, SearchBarComponent, } from '../../components';

const BeerList = () => {
  const navigate = useNavigate();
  const { handleSearch, searchTerm, totalPages, filteredBeerList, setCurrentPage, handleSort } = useBeerData()
  const onBeerClick = (id: string) => navigate(`/beer/${id}`);
  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
          <SearchBarComponent onSearch={handleSearch} searchTerm={searchTerm} />
          </Grid>
          <Grid item>
          <Typography variant="button" display="block" gutterBottom>
        Sort:
      </Typography>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            {([BEER_NAME, BEER_BREWERY_TYPE] as BeerField[]).map(sortType => 
            <Button key={sortType} onClick={handleSort.bind(null, sortType)}>
              {sortType}
            </Button>)}
          </ButtonGroup>
          </Grid>
        </Grid>
          
      
          <List>
            {filteredBeerList.map((beer) => (
              <ListItemButton key={beer.id} onClick={onBeerClick.bind(this, beer.id)}>
                <ListItemAvatar>
                  <Avatar>
                    <SportsBar />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={beer.name} secondary={beer.brewery_type} />
              </ListItemButton>
            ))}
          </List>
          <PaginationComponent totalPages={totalPages} onPageChange={setCurrentPage} />
        </main>
      </section>
    </article>
  );
};

export default BeerList;
