 import './App.css';
 import PropTypes from "prop-types";
 import React from "react"
 import pokemon from "./pokemon.json";

 
 const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <button onClick={() => onSelect(pokemon)}>Select</button>
  </tr>
 );

 
 PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string
    }),
    type: PropTypes.arrayOf(PropTypes.string)
  }),
  onSelect: PropTypes.func,
 }

 const PokemonInfo = ({ name, base }) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      {
        Object.keys(base).map(key => (
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
            
          </tr>
        ))
      }
    </table>
  </div>
)

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "SP. Attack": PropTypes.number.isRequired,
    "SP. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  })
}

function App() {
  const [filtername, filterNameSet] = React.useState("");
  const [selectedItem, selectedItemSet] = React.useState(null);
  return (
    <div
      style={{
        margin: "auto",
        width: 800,
        // paddingTop: "1rem",
        border: "1px solid black" 
      }}
    
    >
      <h1 className="title">Pokemon search</h1>
      
      <div className='grid__pokemon'>
        <div>
          <input value={filtername} onChange={(evt) => filterNameSet(evt.target.value)}/>
          <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                </tr> 
              </thead>
              <tbody>
                {pokemon
                .filter(pokemon => pokemon.name.english.toLowerCase().includes(filtername.toLowerCase()))
                .slice(0,20)
                .map(pokemon => (
                  <PokemonRow pokemon={pokemon} key={pokemon.id} onSelect={pokemon => selectedItemSet(pokemon)}/>
                ))}
                
              </tbody>
          </table>
          <div>
            {selectedItem && (
              <PokemonInfo {...selectedItem} />
            )} 
          </div>
        </div>
        
      </div>
      
    </div>
  );
}

export default App;
