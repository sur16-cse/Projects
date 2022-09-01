import { useState, useEffect} from 'react'
import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App=()=>{
  const [searchField,setSearchField]=useState(''); //[value,setValue]
  const[monsters,setMonsters]=useState([]);
  const [filteredMonsters,setfilteredMonsters]=useState(monsters)

  useEffect(()=>{
    const newFilteredMonsters=monsters.filter((monster)=>{
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setfilteredMonsters(newFilteredMonsters)
  },[monsters,searchField])

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response)=>response.json())
      .then((users)=>setMonsters(users))
  },[])
  
  const onsearchChange=(event)=>{
    const searchFieldString=event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }


  return(
    <div className="App">
        <h1 className='app-title'>Robohash</h1>

        <SearchBox onChangeHandler={onsearchChange} 
        placeholder='search-monsters'
        className='search-box'/>
        
        <CardList monsters={filteredMonsters}/>
    </div>
  );
};
export default App;