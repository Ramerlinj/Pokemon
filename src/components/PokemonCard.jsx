

function PokemonCard({ pokemon, handlePokemonClick }) {
  return (
    <div className="w-72 h-72 bg-card-date-dark text-center rounded-lg shadow-lg p-6">
        <div className="w-full h-48 bg-background-main rounded-2xl relative">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.name}
              className="cursor-pointer w-64 h-42    object-contain object-center"
              onClick={() => handlePokemonClick(pokemon)}
              />
                <p className="text-sm my-2 font-semibold text-gray-400 absolute top-[80%] left-[43%]">NO: {pokemon.id}</p>
              </div>
            <p className="cursor-pointer text-xl font-semibold mt-7" onClick={() => handlePokemonClick(pokemon)}>
                    {pokemon.name}
                    </p>
          </div>
  );
}

export default PokemonCard;