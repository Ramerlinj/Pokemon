import { useEffect, useState } from "react";

export function usePokemonDescription(pokeIdOrName) {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pokeIdOrName) return;

    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeIdOrName}/`)
      .then(res => res.json())
      .then(data => {
        const entry = data.flavor_text_entries.find(
          entry => entry.language.name === "en"
        );
        setDescription(entry ? entry.flavor_text.replace(/\f/g, ' ') : "No description available.");
        setLoading(false);
      })
      .catch(() => {
        setDescription("No description available.");
        setLoading(false);
      });
  }, [pokeIdOrName]);

  return { description, loading };
}