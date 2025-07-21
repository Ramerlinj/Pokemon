
import { useState } from "react";
import usePokemon  from "../hooks/usePokemon"

const PokemonList = () => {

    const [visibleCount,setVisibleCount] = useState(9)
    const [search, setSearch] = useState('')
    const {pokemon, loading, error} = usePokemon(1025)
    
    const handleInput = (e) =>{
        setSearch(e.target.value)
    }
    const handleClick = () =>{
       setVisibleCount((i) => i+9)
    }

    const filtered = pokemon.filter((p) => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toString().includes(search)
    );

    const visible = filtered.slice(0, visibleCount);

    return (
        <>
            <input type="text"
            placeholder="bulbasaur or 1"
            value={search}
            onChange={handleInput}
            className="border-1"
            
            />

            {loading && (
                <h2>Carcando</h2>
            )}
            {error && (
                <h2>No se ha encontrado el pokemon</h2>
            )}

           
            <div className="grid grid-cols-5">
                {visible.map((pokemon) => (
                    <>
                        <div key={pokemon.id} className="">

                            <p>{pokemon.name}</p>
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} />
                        </div>
                    </>
                        ))}

                   {filtered.length ===0 && ( <p>No se encontraron Pokémon</p>)}    {/*Hacer mejor componente*/}         
                </div>
                    <button className="bg-amber-100 text-black w-10" onClick={handleClick}>Ver más</button>
        </>
  );
};

export default PokemonList


