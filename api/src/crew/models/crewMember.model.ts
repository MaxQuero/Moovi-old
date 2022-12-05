import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CrewMember {
  @Field(type => Int)
  id: string;

  @Field(type => Int)
  gender: number;

  @Field()
  character: string;

  @Field()
  name: string;

  @Field({nullable: true})
  profilePath: string;

  @Field()
  department: string;

  @Field()
  job: string;
}