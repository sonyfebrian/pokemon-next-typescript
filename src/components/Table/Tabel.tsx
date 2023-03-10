import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, ChangeEvent, FormEvent } from "react";

import useApi from "@/hooks/useApi";
import usePagination from "@/hooks/usePagination";

import { Version } from "@/types";
import { getVersionQuery, parseURL } from "@/utils";





const TabelView = ()=> {
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

  
    return (
      <>  
<div className="bg-white p-8 rounded-md w-full">
<table className="min-w-full leading-normal">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        ID
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        Detail
                                    </th>
                                    
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
							{loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {result && (
              <>
                {Array.isArray(result.data) && (
                  <>
                    {result.data.map((pokemon, i) => {
                      return (
						<tr key={i}><td>{pokemon.pid.padStart(4, "0")}</td>
						<td><div className="flex items-center">
    <div className="flex-shrink-0 w-10 h-10 hidden sm:table-cell">
        <img className="w-full h-full rounded-full"
            src={parseURL(version, pokemon.pid)}
            alt="" />
    </div>
    <div className="ml-3">
        <span className="text-gray-900 whitespace-no-wrap">
            {pokemon.name}
        </span>

    </div>
</div></td>
						<td> <Link
          
          href={`/pokemon/${pokemon.pid}${`?version=${version}&from=${currentPage?.number as number}`}`}
          as={`/pokemon/${pokemon.pid}`}
        >
         Detail
        </Link></td>
						</tr>
                        
                      );
                    })}
                  </>
                )}

              </>
            )}
          </>
        )}
                            </tbody>
                        </table>	
						<div
						className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
						
						<div className="inline-flex mt-2 xs:mt-0">
							<a
							href={
								currentPage?.number === 1
								  ? "/"
								  : `/?page=${currentPage?.prev as number}`
							  }
							  onClick={prev}
                                className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l" >
                                Prev
								
                            </a>
							&nbsp; &nbsp;
							<a
							 href={`/?page=${currentPage?.next as number}`}
							 onClick={next}	
                                className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                                Next
                            </a>
						</div>
					</div>
	</div>		
      </>
    );
  };
  
  export default TabelView;