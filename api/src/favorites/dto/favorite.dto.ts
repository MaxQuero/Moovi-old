import {UserInterface} from "../../user/interfaces/user.interface";
import {MovieInterface} from "../../movie/interfaces/movie.interface";

export class FavoriteDto {
    readonly id: string;
    readonly user: UserInterface;
    readonly movie: MovieInterface;
}