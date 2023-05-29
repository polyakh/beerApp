import { useEffect, useState, type ChangeEvent } from 'react';
import { fetchData } from './utils';
import type { Beer } from '../../types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, Paper, TextField, Link } from '@mui/material';
import styles from './Home.module.css';

import { useLocalStorageList } from '../../shared'

type IdAndName = Pick<Beer, 'id' | 'name'>;

const FAVORITE_BEER_LIST_KEY = 'favorite-beer-list';

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);

  const { list: savedList, addItem, clearList, removeItem } = useLocalStorageList<IdAndName>(FAVORITE_BEER_LIST_KEY);

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  const handleCheckboxChange = (inputBeer: IdAndName) => (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    if (checked) {
      addItem(inputBeer);
    } else {
      removeItem(beer => beer.id === inputBeer.id)
    }
  };

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <TextField label='Filter...' variant='outlined' />
                <Button variant='contained'>Reload list</Button>
              </div>
              <ul className={styles.list}>
                {beerList.map(({name, id}, index) => (
                  <li key={index.toString()}>
                    <Checkbox onChange={handleCheckboxChange({name, id})}/>
                    <Link component={RouterLink} to={`/beer/${id}`}>
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items</h3>
                <Button onClick={clearList} variant='contained' size='small'>
                  Remove all items
                </Button>
              </div>
              <ul className={styles.list}>
                {savedList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
                {!savedList.length ? <p>No saved items</p> : null}
              </ul>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
