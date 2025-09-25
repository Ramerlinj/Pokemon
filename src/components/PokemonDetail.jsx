import React, { useState } from "react";
import { usePokemonDescription } from "../hooks/description-poke";
import { ArrowRight } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';

const typeImages = import.meta.glob('../assets/types/*.png', { eager: true, import: 'default' });

function getTypeIcon(type) {
  let key = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  let path = `../assets/types/${key}.png`;
  if (typeImages[path]) return typeImages[path];

  key = type.toLowerCase();
  path = `../assets/types/${key}.png`;
  if (typeImages[path]) return typeImages[path];

  key = type.toUpperCase();
  path = `../assets/types/${key}.png`;
  if (typeImages[path]) return typeImages[path];

  return null;
}

const STAT_LABELS = {
  'hp': 'HP',
  'attack': 'Attack',
  'defense': 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  'speed': 'Speed',
  'total': 'Total'
};

const PokemonDetail = ({ pokemon, onClose, onNext, onPrev }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState('');

  if (!pokemon) return null;

  const { description, loading } = usePokemonDescription(pokemon.id);
  const totalStats = pokemon.stats?.reduce((acc, stat) => acc + stat.base_stat, 0) || 0;

  const handleNext = () => {
    if (isAnimating || pokemon.id === 1025) return;
    setIsAnimating(true);
    setAnimationDirection('slide-left');
    setTimeout(() => {
      onNext();
      setAnimationDirection('slide-from-right');
      setTimeout(() => {
        setIsAnimating(false);
        setAnimationDirection('');
      }, 300);
    }, 300);
  };

  const handlePrev = () => {
    if (isAnimating || pokemon.id === 1) return;
    setIsAnimating(true);
    setAnimationDirection('slide-right');
    setTimeout(() => {
      onPrev();
      setAnimationDirection('slide-from-left');
      setTimeout(() => {
        setIsAnimating(false);
        setAnimationDirection('');
      }, 300);
    }, 300);
  };

      {/* animations */}

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <style jsx>{`
        @keyframes slideLeft {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(-100px); opacity: 0; }
        }
        @keyframes slideRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100px); opacity: 0; }
        }
        @keyframes slideFromRight {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideFromLeft {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-left { animation: slideLeft 0.3s ease-in-out; }
        .animate-slide-right { animation: slideRight 0.3s ease-in-out; }
        .animate-slide-from-right { animation: slideFromRight 0.3s ease-in-out; }
        .animate-slide-from-left { animation: slideFromLeft 0.3s ease-in-out; }
      `}</style>

      {/* Arrow left */}
      <button
        onClick={handlePrev}
        disabled={pokemon.id === 1 || isAnimating}
        className={`fixed top-1/2 left-4 transform -translate-y-1/2 bg-[var(--color-subcard)] text-white rounded-full p-4 text-4xl hover:bg-gray-700 flex items-center justify-center transition-all duration-200 z-10 ${
          (pokemon.id === 1 || isAnimating) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
        }`}
      >
        <ArrowLeft size={40} />
      </button>

      {/* Arrow right */}
      <button
        onClick={handleNext}
        disabled={pokemon.id === 1025 || isAnimating}
        className={`fixed top-1/2 right-4 transform -translate-y-1/2 bg-[var(--color-subcard)] text-white rounded-full p-4 text-4xl hover:bg-gray-700 flex items-center justify-center transition-all duration-200 z-10 ${
          (pokemon.id === 1025 || isAnimating) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
        }`}
      >
        <ArrowRight size={40} />
      </button>

      <div className={`relative bg-[var(--color-card-date-dark)] rounded-2xl shadow-2xl p-8 min-w-[700px] max-w-[900px] text-white transition-all duration-300 ${
        animationDirection === 'slide-left' ? 'animate-slide-left' :
        animationDirection === 'slide-right' ? 'animate-slide-right' :
        animationDirection === 'slide-from-right' ? 'animate-slide-from-right' :
        animationDirection === 'slide-from-left' ? 'animate-slide-from-left' : ''
      }`}>

        <button
          className="absolute top-4 right-6 text-3xl text-white hover:text-gray-300 focus:outline-none"
          onClick={onClose}
        >
          ×
        </button>
 
        <div className="flex flex-row gap-10 max-md:flex-col max-md:gap-5">
          
          <div className="bg-[var(--color-subcard)] rounded-xl p-6 min-w-[260px] flex flex-col items-center flex-1">
            <div className="flex gap-2 mb-2">
              {pokemon.types?.map((typeObj) => {
                const typeName = typeObj.type.name;
                const icon = getTypeIcon(typeName);
                return (
                  <span
                    key={typeName}
                    className="px-3 py-1 rounded-lg font-bold capitalize text-white text-sm flex items-center gap-1"
                  >
                    {icon && (
                      <img
                        src={icon}
                        alt={typeName}
                        className="w-5 h-5 inline-block mr-1"
                      />
                    )}
                    {typeName}
                  </span>
                );
              })}
            </div>
            <img
              src={pokemon.sprites?.other?.['official-artwork']?.front_default}
              alt={pokemon.name}
              className={`w-32 h-32 object-contain mb-2 transition-all duration-500 ${
                isAnimating ? 'scale-95 opacity-70' : 'scale-100 opacity-100'
              }`}
            />
            <div className="text-gray-400 text-base mb-1">
              Nº.{pokemon.id.toString().padStart(3, '0')}
            </div>
            <h2 className="text-2xl font-bold mb-2 capitalize">
              {pokemon.name}
            </h2>
            <div className="flex gap-4 mb-2">
              <div className="text-gray-400 mr-1">
                Weight <span className="text-white ml-1">{pokemon.weight / 10}kg</span>
              </div>
              <div className="text-gray-400 mr-1">
                Height <span className="text-white ml-1">{pokemon.height / 10}m</span>
              </div>
            </div>
            <div className="text-gray-300 text-center text-sm mb-3">
              <p>{loading ? "Loading description..." : description}</p>
            </div>
            <div className="mt-2 text-center">
              <span className="text-gray-300 text-sm">Habilidades:</span>
              <div className="flex gap-2 flex-wrap justify-center mt-1">
                {pokemon.abilities?.map((ab) => (
                  <span
                    key={ab.ability.name}
                    className="bg-[var(--color-Badge-hability)] text-white rounded-lg px-3 py-1 text-sm font-medium"
                  >
                    {ab.ability.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1.2 flex flex-col justify-start">
            <h3 className="text-lg font-bold mb-4">Estadísticas</h3>
            <div className="flex flex-col gap-4">
              {pokemon.stats?.map((stat, index) => (
                <div key={stat.stat.name} className={`flex items-center gap-3 transition-all duration-300 ${
                  isAnimating ? 'opacity-60 transform translate-x-2' : 'opacity-100 transform translate-x-0'
                }`} style={{ transitionDelay: `${index * 50}ms` }}>
                  <span className="w-[90px] text-left text-gray-400 font-medium text-sm">
                    {STAT_LABELS[stat.stat.name] || stat.stat.name}
                  </span>
                  <span className="w-8 font-bold text-yellow-300 text-sm">{stat.base_stat}</span>
                  <div className="bg-[#393e4b] rounded-lg w-[180px] h-3 overflow-hidden">
                    <div
                      className="h-full rounded-lg bg-gradient-to-r from-yellow-200 to-green-200 transition-all duration-700 ease-out"
                      style={{ 
                        width: `${Math.min(stat.base_stat, 100)}%`,
                        transitionDelay: isAnimating ? '0ms' : `${index * 100}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}

              <div className={`flex items-center gap-3 mt-2 border-t border-gray-600 pt-2 transition-all duration-300 ${
                isAnimating ? 'opacity-60' : 'opacity-100'
              }`}>
                <span className="w-[90px] text-left text-gray-200 font-bold text-sm">{STAT_LABELS['total']}</span>
                <span className="w-8 font-bold text-yellow-200 text-sm">{totalStats}</span>
                <div className="w-[180px]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;