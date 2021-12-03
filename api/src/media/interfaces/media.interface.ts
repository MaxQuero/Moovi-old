import {Document} from "mongoose";
import { TvShowInterface } from '../../tvShow/interfaces/tvShow.interface';
import { MovieInterface } from '../../movie/interfaces/movie.interface';
import { MediaEnum } from '../dto/media.dto';

export class MediaInterface extends Document {
    medias: TvShowInterface[] | MovieInterface[];
    mediaType: MediaEnum
}