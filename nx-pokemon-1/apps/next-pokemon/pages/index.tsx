import React, { useEffect, useState, useCallback } from 'react';
import type { Pokemon } from '@nx-pokemon-1/shared-types'

import styles from './index.module.css';

export function Index() {
  const [search, setSearch] = useState('')
  const [pokemon, setPokemon] = useState<Pokemon[]>([])

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

export default Index;
