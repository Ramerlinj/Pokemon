
import { useState } from "react";
import usePokemon  from "../hooks/usePokemon"
import PokemonDetail from "./PokemonDetail";
import PokemonCard from "./PokemonCard";

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
    //const currentIndex = visible.findIndex(p => p.id === selectedPokemon?.id);

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
        <div className="flex flex-col items-center mt-10">
        <h1 className="text-6xl font-bold mt-15 text-center" >Pokémon</h1>
        <label className="text-text2 font-semibold"> Ingrese el nombre del Pokémon o pókedex
            <input type="text"
            placeholder="bulbasaur or 1"
            value={search}
            onChange={handleInput}
            className="border-text border-1 bg-Badge-hability text-placeholder rounded-md p-2 flex justify-center w-5xl mt-2 mb-15"
            />
            </label>

            {loading && (
                <h2>Cargando</h2>
            )}
            {error && (
                <h2>No se ha encontrado el pokemon</h2>
            )}

              </div>
           
            <div className="grid grid-cols-4">
                {visible.map((pokemon) => (
                    <div key={pokemon.id} className="flex flex-col items-center p-2">
                       <PokemonCard pokemon={pokemon} handlePokemonClick={handlePokemonClick} />
                    </div>
                        ))}

                   {filtered.length ===0 && ( <p>No se encontraron Pokémon</p>)}    
                </div>

                <div className="m-16">
                    <button className="bg-Badge-hability font-semibold   px-4 py-2 rounded-xl cursor-pointer hover:bg-Badge-hability/70 transition-all duration-200" onClick={handleClick}>Ver más</button>

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
            </div>
        </>
  );
};

export default PokemonList


