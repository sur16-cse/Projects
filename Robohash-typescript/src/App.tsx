import { useState, useEffect, ChangeEvent } from 'react'

import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component';

import { getData } from './utils/data.utils';
import './App.css';

export type Monster = {
  id: string,
  name: string,
  email: string
}

const App = () => {
  const [searchField, setSearchField] = useState(''); //[value,setValue]
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [filteredMonsters, setfilteredMonsters] = useState(monsters)

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getData<Monster[]>('https://jsonplaceholder.typicode.com/users')
      setMonsters(users)
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setfilteredMonsters(newFilteredMonsters)
  }, [monsters, searchField])


  const onsearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }

  return (
    <div className="App">
      <h1 className='app-title'>Robohash</h1>

      <SearchBox onChangeHandler={onsearchChange}
        placeholder='search-monsters'
        className='search-box' />

      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;
