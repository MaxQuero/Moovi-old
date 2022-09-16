export class EpisodeDto {
    readonly season
    readonly air_date: Date;
    readonly episode_number: number;
    readonly id: string;
    readonly name: string;
    readonly overview: string;
    readonly still_path: string;
    readonly vote_average: number;
    readonly vote_count: number;
    rating: number;
}