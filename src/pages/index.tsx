import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useRouter } from "next/router";
import { useState, ChangeEvent, FormEvent } from "react";

import useApi from "@/hooks/useApi";
import usePagination from "@/hooks/usePagination";

import Layout from '@/components/Layout';
import TabelView from '@/components/Table';

import { Version } from "@/types";
import { getVersionQuery, parseURL } from "@/utils";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const router = useRouter();
  const versionQuery = getVersionQuery(router.query.version as string);

  const [version, setVersion] = useState<Version>(versionQuery);

  const { page: currentPage, next, prev } = usePagination();

  const { result, loading, error } = useApi({
    get: "all-pokemon",
    url: `https://pokeapi.co/api/v2/pokemon/`,
    params: {
      offset: currentPage?.offset,
    },
  });

  console.log(result, "cek result")
  if (error) {
    return (
      <Layout>
        <section>
          <p>Oops, something went wrong!</p>
        </section>
      </Layout>
    );
  }
  return (
    <Layout>
     <title>Pokedex App</title>

     <section>
     <TabelView />
     </section>
    </Layout>
  )
}
