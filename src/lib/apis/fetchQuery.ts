import { fetchGql } from "../utils/fetcher";
import {
  Config,
  FetchQueryReturnType,
  ResponseType,
  Variables,
} from "../types";
import { cacheResponse, getFromCache } from "../cache";
import { stringifyObjectValues } from "../utils/stringifyObjectValues";
import { config as globalConfig } from "../config";
import { cacheImagesFromQuery } from "../utils/cacheImagesFromQuery";

export async function fetchQuery<D extends ResponseType>(
  query: string,
  variables?: Variables,
  _config?: Config
): FetchQueryReturnType<D> {
  const _variables: Variables = stringifyObjectValues(variables || {});

  const config = { ...globalConfig, ..._config };

  let data: null | D = config.cache
    ? getFromCache<D>(query, _variables || {})
    : null;
  let error = null;

  if (!data) {
    const [response, _error] = await fetchGql<D>(query, _variables);
    data = response;
    error = _error;
    if (config.cache && data && !error) {
      cacheResponse(data, query, _variables);
    }
    cacheImagesFromQuery(data);
  } else {
    // return a new reference to the data object, so reference equality check in React components/hooks will work
    data = { ...data };
  }

  return {
    data,
    error,
  };
}

// type Test = {
//   user: {
//     name: string;
//   };
// };

// const u  = await fetchQuery<Test>("");
// u.data?.user.name
