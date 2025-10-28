import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";
import "./landing.scss";
import { Button } from "react-bootstrap";
import { UseIntersection } from "../hooks/UseIntersection";

const Landing = () => {
    const triggerRef = React.useRef(null);
    const isVisible = UseIntersection(triggerRef, "0px")
  const [pokemonArray, setPokemonArray] = useState([]);

  const fetchPokemonData = async () => {
    try {
      const offset = pokemonArray.length; // fetch next batch
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
      );

      const details = await Promise.all(res.data.results.map(p => axios.get(p.url)));
      const sorted = details.map(r => r.data).sort((a, b) => a.id - b.id);

      setPokemonArray(prev => [...prev, ...sorted]);
	  console.log(pokemonArray)
    } catch (err) {
      console.error("Error fetching Pokémon:", err);
    }
	
  };

  useEffect(() => {
      if (isVisible) {
          //Call LoadPokemon/Moves
        fetchPokemonData(); // Trigger a function when the div is visible on view port
      }
    }, [isVisible]);
//   useEffect(() => {
//     fetchPokemonData(); // initial load
//   }, []);

  return (
    <>
      <div className="pokemonArray">
        {pokemonArray.map((pokemon) => (
          <div style={{ margin: "5%" }} key={pokemon.id}>
            <PokemonCard pokemon={pokemon.name} />
          </div>
        ))}
      </div>
      <div ref={triggerRef} style={{height:'60px'}}></div>
    </>
  );
};

export default Landing;
