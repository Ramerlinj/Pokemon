import { useEffect, useState } from "react"


const usePokemones = (limit) => {
    
    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() =>{
        const getPokemon = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        if (!response.ok) throw new Error("Error al obtener los Pokémon");

        const data = await response.json();

        //hacemos que el array devuelva tambien su id aparte del nombre, url
        const pokemonesConId = data.results.map((p) => {
          const id = p.url.split("/").filter(Boolean).pop();
          return { ...p, id };
        });

        setPokemon(pokemonesConId);
       }catch (e) {
        setError(e.message || "Error desconocido");
       }finally {
        setLoading(false);
       }
    };
        getPokemon()
    },[limit]);

    return {pokemon, loading, error}
}
export default usePokemones
