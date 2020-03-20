import {MovieInterface} from "../../movie/interfaces/movie.dto";
import {UserInterface} from "../../user/interfaces/user.interface";

export class FavoriteDto {
    readonly id: string;
    readonly user: UserInterface;
    readonly movie: MovieInterface;
}