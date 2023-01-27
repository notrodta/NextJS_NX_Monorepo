# NextJS_NX_Monorepo

tutorial: https://www.youtube.com/watch?v=WOfL5q2HznI&t=1211s&ab_channel=JackHerrington

repo: https://github.com/jherr/nx-with-exp-nextjs


create express app: npx create-nx-workspace --preset=express

create next app: nx g @nrwl/next:app

create shared-types: nx g @nrwl/node:lib shared-types


run server: nx run api:serve

run client: nx run next-pokemon:serve

run cypress test: nx run next-pokemon-e2e:e2e
