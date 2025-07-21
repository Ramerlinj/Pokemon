import PokemonList from "./components/PokemonList"

function App() {
  return (
    <>
      <div className="min-h-screen w-full relative bg-black text-white z-10">
        {/* Fondo con gradiente */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.35), transparent 80%)",
          }}
        />
        
        <div className="relative z-10 p-4">
          <PokemonList/>
        </div>
      </div>
    </>
  );
}


export default App
