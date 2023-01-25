
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Episode {
  @Field({nullable: true})
  airDate: Date;

  @Field(type => Int, {nullable: true})
  episodeNumber: number;

  @Field(type => Int, {nullable: true})
  id: string;

  @Field({nullable: true})
  name: string;

  @Field({nullable: true})
  overview: string;

  @Field({nullable: true})
  stillPath: string;

  @Field(type => Float, {nullable: true})
  voteAverage: number;

  @Field(type => Int, {nullable: true})
  voteCount: number;

  @Field(type => Int, {nullable: true})
  rating: number;
}