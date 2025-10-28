import React, { useEffect, useState} from "react";
import axios from "axios";
import "./landing.scss";
import { Button } from "react-bootstrap";
import MoveSearchResultsCard from "../components/MoveSearchResultsCard";
import { UseIntersection } from "../hooks/UseIntersection";
import './searchPage.scss';

const Moves = () => {
  const triggerRef = React.useRef(null);
  const isVisible = UseIntersection(triggerRef, "0px")
  const [movesArray, setMovesArray] = useState([]);

  const fetchMoveData = async () => {
    try {
      const offset = movesArray.length; // fetch next batch
      const res = await axios.get(
        `https://pokeapi.co/api/v2/move?limit=2000&offset=${offset}`
      );

      const details = await Promise.all(res.data.results.map(p => axios.get(p.url)));
const sorted = details
  .map(r => r.data)
  .sort((a, b) => a.name.localeCompare(b.name)); // ✅ alphabetically by name

setMovesArray(prev => {
  const combined = [...prev, ...sorted];
  return combined.sort((a, b) => a.name.localeCompare(b.name)); // keep it sorted even after merging
});
	  console.log(movesArray)
    } catch (err) {
      console.error("Error fetching Pokémon:", err);
    }
	
  };
  
   useEffect(() => {
      if (isVisible) {
          //Call LoadPokemon/Moves
        fetchMoveData(); // Trigger a function when the div is visible on view port
      }
    }, [isVisible]);

//   useEffect(() => {
//     fetchPokemonData(); // initial load
//   }, []);

  return (
    <section>
      {movesArray[0] !== null &&  movesArray[0] !== undefined ? (
      <div className="searchResults">
        {movesArray.map((move) => (
          <div style={{ margin: "5%" }} key={move.id}>
            <MoveSearchResultsCard move={{ name: move.name, url: `https://pokeapi.co/api/v2/move/${move.id}/` }}/>
          </div>
        ))}
        <div ref={triggerRef} style={{height:'60px'}}></div>
      </div>
      
      ): (
            <div className="loader"></div>
        )}
    </section>
  );
};

export default Moves;
