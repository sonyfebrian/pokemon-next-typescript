import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import clsx from "clsx";

import useApi from "@/hooks/useApi";
import Layout from "@/components/Layout";

import { Version } from "@/types";
import { parseURL, getVersionQuery, capitalize } from "@/utils";


const PokemonView = () => {
    const router = useRouter();
    const { version, number } = router.query;
    const versionQuery = getVersionQuery(version as string);
  
    const {
      result: pokemon,
      loading,
      error,
    } = useApi({
      get: "pokemon",
      url: `https://pokeapi.co/api/v2/pokemon/`,
      params: {
        number: number as string,
      },
    });

    
    if (loading) {
        return (
          <Layout pokeView>
            <section>
              <p>Loading...</p>
            </section>
          </Layout>
        );
      }
    
      if (error) {
        return (
          <Layout pokeView>
            <p>Oops, something went wrong!</p>
          </Layout>
        );
      }

      return (<>
      {pokemon && !Array.isArray(pokemon.data) && (
        <Layout pokeView>
            <Head><title>{capitalize(pokemon.data.name)}</title></Head>

            
            <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={parseURL(versionQuery, number as string)} />
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
      {pokemon.data.types.map(({ slot, type }) => {
                 

                  return (
                    <div key={slot} >
                     
                      <h2 className="text-sm title-font text-gray-500 tracking-widest"> {type.name}</h2>
                    </div>
                  );
                })}
       
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{pokemon.data.name}</h1>
        <div className="flex mb-4">
          <span className="flex items-center">
            
            <span className="text-gray-600 ml-3"> Weight: {pokemon.data.weight}</span>
          </span>
          <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
          Height: {pokemon.data.height}
          </span>
        </div>
        <p className="leading-relaxed">{pokemon.data.flavor_text}</p>
        <p>{pokemon.data.stats.map(({ base_stat, stat }) => (
                  <div key={`${stat.name}`}     >
                    {stat.name}: {base_stat}
                  </div>
                ))}</p>
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
         
        </div>
        <div className="flex">
          
          <button onClick={() => {
                const page = router.query.from as string;
                const ver = router.query?.version as Version;

                router.push(
                  `/?page=${page}&version=${ver}`,
                  page === "1" ? "/" : `/?page=${page}`
                );
              }}className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Button</button>
          <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
        </Layout>
      )}
      </>);
};

export default PokemonView