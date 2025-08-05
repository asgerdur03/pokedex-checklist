'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import PokemonCard from "@/components/PokemonCard/PokemonCard";

const allPokemonsUrl = "https://pokeapi.co/api/v2/pokemon?limit=1025"; 

/**
 * https://pokeapi.co/api/v2/pokemon?limit=1025"; allir pokemonar: [name, url]
 * https://pokeapi.co/api/v2/pokemon/{id}; single pokemon
 * [id, name, base_experience, sprites] (kannsk meira seinna?)
 */

type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}

type PokeList = {
  name: string;
  url: string;
};
export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokeList, setPokeList] = useState<PokeList[]>([]);

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const pageSize = 20;

  const getPokemons = async () => {
    const response = await fetch(allPokemonsUrl);
    const data = await response.json();

    setPokeList(data.results);
  };



  const getSinglePokemon = async (page: number) => {
    setLoading(true);
    const start = page * pageSize;
    const end = start + pageSize;
    const batch = pokeList.slice(start, end);

    const singlePokeData = await Promise.all(
      batch.map(async (pokemon) => {
        const response = await fetch(pokemon.url)
        const data = await response.json()
        return data
      })
    )

    const formattedData: Pokemon[] = singlePokeData.map((p: any) => ({
      id: p.id,
      name: p.name,
      base_experience: p.base_experience,
      sprites: {
        other: {
          "official-artwork": {
            front_default: p.sprites.other["official-artwork"].front_default,
          },
        },
      },
    }));

    setPokemons(prev => [...prev, ...formattedData]);
    setLoading(false);
  };

  useEffect(() => {
    getPokemons();
  }, []);
  

  useEffect(() => {
    if (pokeList.length > 0) {
      getSinglePokemon(page);
    }
  }, [pokeList]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    getSinglePokemon(nextPage);
  };





  return (
    <div className={styles.page}>
      {pokemons.map((pokemon, index) => (
        <PokemonCard
          key={index}
          id={pokemon.id}
          name={pokemon.name}
          base_experience={pokemon.base_experience}
          imageUrl={pokemon.sprites.other["official-artwork"].front_default}
          checked={false}
          onToggle={() => {}}
        />
      ))}
      <button onClick={loadMore}>more</button>
    </div>
  );
}
