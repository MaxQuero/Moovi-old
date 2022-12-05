
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Video {
  @Field()
  iso_639_1: string;

  @Field()
  iso_3166_1: string;

  @Field()
  name: string;

  @Field()
  key: string;

  @Field()
  site: string;

  @Field()
  type: string;

  @Field()
  published_at: string;

  @Field()
  id: string;
}