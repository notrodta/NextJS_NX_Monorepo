import React, { useEffect, useState, useCallback } from 'react';
import type { Pokemon } from '@nx-pokemon-1/shared-types'

import styles from './index.module.css';
import { JL } from 'jsnlog';
import { ErrorBoundary } from "react-error-boundary";

JL.setOptions({
  "defaultAjaxUrl": "http://localhost:3333/logger",
});

const logOptions: any = { appName: 'Market', sid: 'D123456', appVersion: '1' }

var logger = JL(JSON.stringify(logOptions));

function ErrorFallback({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong!!!!!!!!:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

export function Index({ q, pokemon: initialPokemon }: { q: string; pokemon: Pokemon[] }) {
  const [search, setSearch] = useState(q)
  const [pokemon, setPokemon] = useState<Pokemon[]>(initialPokemon)
  const [showErrorPage, setShowErrorPage] = useState<boolean>(false);

  // console.log(initialPokemon);

  const logError = (error: Error, info: { componentStack: string }) => {
    // Do something with the error, e.g. log to an external API
    // JL('client ERROR!!').error(error);
    // JL('client INFO!!').error(info);
    // JL('client FATAL!!').fatalException("Exception was thrown!", info);
    // JL('client end!!').info("end!!!!!!!@@#");
    // logger.fatalException("Exception was thrown!", info);
    // logger.info("end!!!!!!!@@#");
    logger.fatalException("Exception was thrown!", info);
    logger.info("This is logging test!");
  };

  const handleOnClick = () => {
    // JL('clientABC@').info('message from the client');
    // JL('client').debug({ x: 5, y: 7 });
    // logger.info("test!!!!!!!");
    setShowErrorPage(true);
  }

  useEffect(() => {
    fetch(`http://localhost:3333/search?q=${search}`)
      .then((resp) => resp.json())
      .then((data) => setPokemon(data));
  }, [search]);

  const onSetSearch = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value);
  }, []);

  const ButtonComponentForceError = () => {
    throw Error("error!");
    return <></>;
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
    >
      {showErrorPage ? (<ButtonComponentForceError />) : (<div className={styles.page}>
        Search:
        <input value={search} onChange={onSetSearch} />
        <button onClick={handleOnClick}>test</button>
        <ul>
          {pokemon.map(({ name: { english } }, id) => (
            <li key={id}>{english}</li>
          ))}
        </ul>
      </div>)}
      {/* <ButtonComponent /> */}
      {/* <div className={styles.page}>
        Search:
        <input value={search} onChange={onSetSearch} />
        <button onClick={handleOnClick}>test</button>
        <ul>
          {pokemon.map(({ name: { english } }, id) => (
            <li key={id}>{english}</li>
          ))}
        </ul>
      </div> */}
    </ErrorBoundary >
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
