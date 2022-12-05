import { Field, Int, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class Test {
  @Field()
  rated: boolean;

  @Field()
  favorite: boolean;

  @Field()
  watchlist: boolean;
}

@ObjectType()
export class Genre {
  @Field(type => Int)
  id: string;

  @Field()
  name: string;
}