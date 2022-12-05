import {Document} from "mongoose";
import { MediaEnum } from '../dto/media.dto';
import { Movie } from '../../movie/models/movie.model';
import { TvShow } from '../../tvShow/models/tvShow.model';

export class MediaInterface extends Document {
    medias: TvShow[] | Movie[];
    mediaType: MediaEnum
}