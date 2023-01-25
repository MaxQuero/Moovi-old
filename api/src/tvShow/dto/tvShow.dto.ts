export class TvShowDto {
    readonly id: string;
    readonly genres: {id: number, name: string}[];
    readonly originalTitle: string;
    readonly title: string;
    readonly runtime: number;
    readonly status: string;
    readonly tagline: string;
    readonly popularity: string;
    readonly poster: string;
    readonly voteAverage: number;
    readonly voteCount: number;
    readonly synopsis: string;
    readonly releaseDate: string;
    readonly backdropCover: string;
    readonly trailer: object[];
    readonly actors: object[];
    readonly directors: object[];
    readonly recommendations: [];
    readonly logo: object;
    rating: number;
    favorite: boolean;
    watchlist: boolean;
}