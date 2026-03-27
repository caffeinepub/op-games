import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Game {
    id: string;
    status: Status;
    title: string;
    link?: string;
    year: bigint;
    description: string;
    genre: string;
}
export enum Status {
    inDevelopment = "inDevelopment",
    released = "released",
    comingSoon = "comingSoon"
}
export interface backendInterface {
    getGames(): Promise<Array<Game>>;
}
