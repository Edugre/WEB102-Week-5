import PokemonContainer from './components/PokemonContainer'
import History from './components/History'
import BannedList from './components/BannedList'
import { useState, useEffect } from 'react'

function App() {
  const [history, setHistory] = useState([])
  const [banned, setBanned] = useState([])

  const addHistory = (pokemon) => {
    setHistory(history => [...history, pokemon])
    console.log(history)
  }

  const addBanned = (attribute) => {
    setBanned(banned => {
      if (banned.includes(attribute)) {
        return banned;
      }
      return [...banned, attribute];
    });
  }

  const removeBanned = (attribute) => {
    setBanned(prevBanned => prevBanned.filter(ban => ban !== attribute));
  }

  return (
    <div className='app_container'>
      <History history={history} />
      <PokemonContainer addHistory={addHistory} addBanned={addBanned} banned={banned}/>
      <BannedList banned={banned} removeBanned={removeBanned}/>
    </div>
  )
}

export default App
