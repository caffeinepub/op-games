import { useQuery } from "@tanstack/react-query";
import type { Game } from "../backend.d";
import { useActor } from "./useActor";

export function useGetGames() {
  const { actor, isFetching } = useActor();
  return useQuery<Game[]>({
    queryKey: ["games"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGames();
    },
    enabled: !!actor && !isFetching,
  });
}
