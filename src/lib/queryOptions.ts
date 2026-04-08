import { queryOptions } from "@tanstack/react-query";
import { api } from "./api";

export const bobsGamesOptions = (offset: number) =>
  queryOptions({
    queryKey: ["bobsGames", offset],
    queryFn: () => api.getBobsGames({ amount: 50, offset }),
  });