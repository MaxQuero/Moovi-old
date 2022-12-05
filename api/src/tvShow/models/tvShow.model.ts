import {Field, InputType, Int, ObjectType} from '@nestjs/graphql';
import { Movie } from '../../movie/models/movie.model';
import { Season } from '../../season/models/season.model';
import { Expose, Transform } from 'class-transformer';


@ObjectType()
export class TvShow extends Movie {
  @Field(type => [Season], {nullable: true})
  seasons: Season[]

  @Field(type => [TvShow], {nullable: true})
  recommandations: TvShow[]
}