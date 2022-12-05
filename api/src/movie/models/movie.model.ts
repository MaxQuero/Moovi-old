import {Directive, Field, Float, InputType, Int, ObjectType} from '@nestjs/graphql';
import { CrewMember } from '../../crew/models/crewMember.model';
import { Video } from '../../video/models/video.model';
import { Image } from '../../image/models/image.model';
import { Genre } from '../../genre/models/genre.model';
import { Expose, Transform } from 'class-transformer';
import { MediaEnum } from '../../media/dto/media.dto';

//TODO: a deplacer ?
const trailer = (language) => (video) => (video.site === 'Youtube' && (video.type === 'Trailer' && video.iso_639_1 === language));
const logo = (language) => (logo) => logo.iso_639_1 === language;

function getDirectors(media) {
  const directors = crewPeople => crewPeople.job === 'Director';

  if(media.created_by) {
    return media?.created_by;
  } else {
    return media?.credits?.crew && media.credits.crew.filter(directors)
  }
}

@ObjectType()
export class Movie {
  constructor(partial: Partial<Movie>) {
    Object.assign(this, partial);
  }

  @Field(type => Int)
  readonly id: number;

  @Field()
  readonly type: MediaEnum;

  @Field({nullable: true})
  readonly originalTitle: string;

  @Field({nullable: true})
  readonly title: string;

  @Field(type => [Genre],{nullable: true})
  readonly genres: Genre[];

  @Field(type => Int, {nullable: true})
  readonly runtime: number;

  @Field({nullable: true})
  readonly status: string;

  // TODO : Add translations
  @Field({nullable: true})
  readonly tagline: string;

  @Field({nullable: true})
  readonly popularity: string;

  @Field({ nullable: true })
  readonly poster: string;

  @Field(type => Float, {nullable: true})
  readonly voteAverage: number;

  @Field(type => Int, {nullable: true})
  readonly voteCount: number;

  // TODO : Add translations
  @Field({nullable: true})
  readonly synopsis: string;

  @Field({nullable: true})
  readonly releaseDate: Date;

  @Field({nullable: true})
  readonly backdropCover: string;

  @Field(type => [Video], {nullable: true})
  @Transform(({ value }) => value && (value.find(trailer('fr')) || value.find(trailer('en'))))
  readonly trailer: Video[];

  @Field(type => [CrewMember], {nullable: true})
  readonly actors: CrewMember[];

  @Field(type => [CrewMember], {nullable: true})
  readonly directors: CrewMember[];

  @Field({nullable: true})
  readonly logo: Image;

  // TODO a check
  @Field(type => [Movie], {nullable: true})
  recommendations: Movie[]

//TODO : rattacher a la base
  @Field(type => Int, {nullable: true})
  rating: number;


  @Field({nullable: true})
  favorite: boolean;

  @Field({nullable: true})
  watchlist: boolean;
}