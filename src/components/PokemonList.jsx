
import { useState } from "react";
import usePokemon  from "../hooks/usePokemon"
import PokemonDetail from "./PokemonDetail";

const PokemonList = () => {

    const [visibleCount,setVisibleCount] = useState(9)
    const [search, setSearch] = useState('')
    const {pokemon, loading, error} = usePokemon(1025)
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [detailError, setDetailError] = useState("");
    
    const handleInput = (e) =>{
        setSearch(e.target.value)
    }
    const handleClick = () =>{
       setVisibleCount((i) => i+9)
    }

    const handlePokemonClick = async (poke) => {
      setDetailLoading(true);
      setDetailError("");
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke.id}`);
        if (!res.ok) throw new Error("Error al obtener detalles");
        const data = await res.json();
        setSelectedPokemon(data);
      } catch (e) {
        setDetailError(e.message || "Error desconocido");
      } finally {
        setDetailLoading(false);
      }
    };

    const handleCloseDetail = () => {
      setSelectedPokemon(null);
    };

    const filtered = pokemon.filter((p) => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toString().includes(search)
    );

    const visible = filtered.slice(0, visibleCount);

    // Calcular el índice del Pokémon seleccionado en la lista visible
    const currentIndex = visible.findIndex(p => p.id === selectedPokemon?.id);

    // Funciones de navegación por ID global
    const handleNext = () => {
      if (selectedPokemon && selectedPokemon.id < 1025) { // 1025 es el máximo de la API
        handlePokemonClick({ id: selectedPokemon.id + 1 });
      }
    };

    const handlePrev = () => {
      if (selectedPokemon && selectedPokemon.id > 1) {
        handlePokemonClick({ id: selectedPokemon.id - 1 });
      }
    };

    return (
        <>
            <input type="text"
            placeholder="bulbasaur or 1"
            value={search}
            onChange={handleInput}
            className="border-1"
            
            />

            {loading && (
                <h2>Cargando</h2>
            )}
            {error && (
                <h2>No se ha encontrado el pokemon</h2>
            )}

           
            <div className="grid grid-cols-5">
                {visible.map((pokemon) => (
                    <div key={pokemon.id} className="flex flex-col items-center p-2">
                        <p className="cursor-pointer" onClick={() => handlePokemonClick(pokemon)}>{pokemon.name}</p>
                        <img 
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} 
                          alt={pokemon.name}
                          className="cursor-pointer"
                          onClick={() => handlePokemonClick(pokemon)}
                        />
                    </div>
                        ))}

                   {filtered.length ===0 && ( <p>No se encontraron Pokémon</p>)}    
                </div>
                    <button className="bg-amber-100 text-black w-10" onClick={handleClick}>Ver más</button>

            {selectedPokemon && (
              <PokemonDetail 
                pokemon={selectedPokemon} 
                onClose={handleCloseDetail} 
                onNext={handleNext}
                onPrev={handlePrev}
                pokemonList={null}
                currentIndex={null}
              />
            )}
            {detailLoading && (
              <div className="modal-overlay"><div className="modal-content"><h2>Cargando detalle...</h2></div></div>
            )}
            {detailError && (
              <div className="modal-overlay"><div className="modal-content"><h2>{detailError}</h2><button onClick={handleCloseDetail}>Cerrar</button></div></div>
            )}
        </>
  );
};

export default PokemonList


