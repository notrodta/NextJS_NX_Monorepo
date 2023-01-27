import React, { useEffect, useState, useCallback } from 'react';
import type { Pokemon } from '@nx-pokemon-1/shared-types'

import styles from './index.module.css';

export function Index({ q, pokemon: initialPokemon }: { q: string; pokemon: Pokemon[] }) {
  const [search, setSearch] = useState(q)
  const [pokemon, setPokemon] = useState<Pokemon[]>(initialPokemon)

  console.log(initialPokemon);

  useEffect(() => {
    fetch(`http://localhost:3333/search?q=${search}`)
      .then((resp) => resp.json())
      .then((data) => setPokemon(data));
  }, [search]);

  const onSetSearch = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value);
  }, []);

  return (
    <div className={styles.page}>
      <input value={search} onChange={onSetSearch} />
      <ul>
        {pokemon.map(({ name: { english } }, id) => (
          <li key={id}>{english}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  let pokemon = [];
  if (context.query.q) {
    const res = await fetch(`http://localhost:3333/search?q=${context.query.q}`);
    pokemon = await res.json();
  }
  return {
    props: {
      q: context.query.q ?? '',
      pokemon
    },
  }
}

export default Index;
