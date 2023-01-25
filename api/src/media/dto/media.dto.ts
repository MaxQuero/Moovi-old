import {Field, InputType, Int, IntersectionType, ObjectType, PartialType, PickType} from '@nestjs/graphql';
import { TvShow } from '../../tvShow/models/tvShow.model';
import { Movie } from '../../movie/models/movie.model';
import {MediaDetail} from "../media.resolvers";
import {Genre} from "../../genre/models/genre.model";

export class MediaDto {
    media: TvShow | Movie;
    mediaType: MediaEnum
}

export enum MediaEnum {
    Movie = "movie",
    Tv = "tv",
    All = "all"
}

@InputType()
export class MediaInput {
    @Field()
    readonly id: string | undefined;

    @Field()
    readonly type: MediaEnum | undefined;

    @Field(type => Int, { nullable: true })
    readonly rating?: number;

    @Field({ nullable: true })
    readonly favorite?: boolean;

    @Field({ nullable: true })
    readonly watchlist?: boolean;
}
