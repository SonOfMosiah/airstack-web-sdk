import {
  Config,
  FetchPaginatedQueryReturnType,
  ResponseType,
  VariablesType,
} from "../types";
import { addPaginationToQuery } from "../utils/addPaginationToQuery";
import { fetchPaginatedQuery } from "./fetchPaginatedQuery";

export async function fetchQueryWithPagination<D extends ResponseType>(
  query: string,
  variables?: VariablesType,
  config?: Config
): FetchPaginatedQueryReturnType<D> {
  const queryWithPagination = await addPaginationToQuery(query);

  return fetchPaginatedQuery(
    queryWithPagination,
    variables || {},
    config || {}
  );
}
