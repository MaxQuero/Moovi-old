
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Image {
  @Field()
  filePath: string;
}