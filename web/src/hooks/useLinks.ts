import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
// import { fetchLinks } from "../http/fetch-links";

/**
 * Configuração da Query para buscar links com suporte a paginação infinita.
 *
 * - queryKey: Identificador único da lista de links no cache global do TanStack Query.
 *   Qualquer mutação (criar link, apagar link) que invalidar 'links' fará essa query refazer o fetch.
 *
 * - queryFn: Função assíncrona executada para buscar os dados. Recebe pageParam (cursor atual)
 *   e o signal (para abortar requisições caso o componente desmonte).
 *
 * - initialPageParam: Parâmetro da primeira página (inicialmente undefined).
 *
 * - getNextPageParam: Informa ao TanStack Query como obter o cursor da próxima página.
 */
export const linksQueryOptions = infiniteQueryOptions({
	queryKey: ["links"],
	queryFn: ({ pageParam, signal }) =>
		fetchLinks({ cursor: pageParam }, { signal }),
	initialPageParam: undefined as string | undefined,
	getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
});

/**
 * Hook customizado useLinks.
 *
 * Utiliza o useInfiniteQuery para gerenciar o estado da requisição:
 * - data (links): Lista de todos os links acumulados de todas as páginas (via flatMap)
 * - isPending: Indica se a busca inicial está em andamento
 * - isError: Indica se ocorreu algum erro na requisição HTTP
 * - isFetching: Indica se está ocorrendo qualquer requisição em segundo plano
 * - refetch: Função para forçar a re-execução da requisição
 */
export function useLinks() {
	return useInfiniteQuery({
		...linksQueryOptions,
		// O select transforma os dados do cache: pega todas as páginas e junta os arrays de links em um só
		select: (data) => data.pages.flatMap((page) => page.links),
	});
}
