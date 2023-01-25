import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Episode } from '../../episode/models/episode.model';

@ObjectType()
export class Season {
  @Field(type => Int, {nullable: true})
  id: string;

  @Field({nullable: true})
  name: string;

  @Field({nullable: true})
  overview: string;

  @Field({nullable: true})
  posterPath: string;

  @Field(type => Int, {nullable: true})
  seasonNumber: number;

  @Field({nullable: true})
  loading: boolean;

  @Field({nullable: true})
  airDate: Date;

  @Field(type => Int, {nullable: true})
  episodeCount: number;

  @Field(type => [Episode], {nullable: true})
  episodes: Episode[];
}