import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type CrewMember = {
  __typename?: 'CrewMember';
  character: Scalars['String'];
  department: Scalars['String'];
  gender: Scalars['Int'];
  id: Scalars['Int'];
  job: Scalars['String'];
  name: Scalars['String'];
  profilePath?: Maybe<Scalars['String']>;
};

export type Episode = {
  __typename?: 'Episode';
  airDate?: Maybe<Scalars['Date']>;
  episodeNumber?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Int']>;
  stillPath?: Maybe<Scalars['String']>;
  voteAverage?: Maybe<Scalars['Float']>;
  voteCount?: Maybe<Scalars['Int']>;
};

export type Genre = {
  __typename?: 'Genre';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  filePath: Scalars['String'];
};

export type MediaDetails = Movie | TvShow;

export type MediaInput = {
  favorite?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  rating?: InputMaybe<Scalars['Int']>;
  type: Scalars['String'];
  watchlist?: InputMaybe<Scalars['Boolean']>;
};

export type Movie = {
  __typename?: 'Movie';
  actors?: Maybe<Array<CrewMember>>;
  backdropCover?: Maybe<Scalars['String']>;
  directors?: Maybe<Array<CrewMember>>;
  favorite?: Maybe<Scalars['Boolean']>;
  genres?: Maybe<Array<Genre>>;
  id: Scalars['Int'];
  logo?: Maybe<Image>;
  originalTitle?: Maybe<Scalars['String']>;
  popularity?: Maybe<Scalars['String']>;
  poster?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Int']>;
  recommendations?: Maybe<Array<Movie>>;
  releaseDate?: Maybe<Scalars['Date']>;
  runtime?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  synopsis?: Maybe<Scalars['String']>;
  tagline?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  trailer?: Maybe<Array<Video>>;
  type: Scalars['String'];
  voteAverage?: Maybe<Scalars['Float']>;
  voteCount?: Maybe<Scalars['Int']>;
  watchlist?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  favoriteMedia: MediaDetails;
  rateMedia: MediaDetails;
  watchlistMedia: MediaDetails;
};


export type MutationFavoriteMediaArgs = {
  accountId: Scalars['Int'];
  media: MediaInput;
  sessionId: Scalars['String'];
};


export type MutationRateMediaArgs = {
  media: MediaInput;
  sessionId: Scalars['String'];
};


export type MutationWatchlistMediaArgs = {
  accountId: Scalars['Int'];
  media: MediaInput;
  sessionId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  latestMedias: Array<MediaDetails>;
  mediaDetails: MediaDetails;
  onTheAirMedias: Array<MediaDetails>;
  popularMedias: Array<MediaDetails>;
  searchResults: Array<MediaDetails>;
  seasonDetails: Season;
  trendingMedias: Array<MediaDetails>;
  watchlistMedias: Array<MediaDetails>;
};


export type QueryLatestMediasArgs = {
  mediaType: Scalars['String'];
};


export type QueryMediaDetailsArgs = {
  mediaId: Scalars['Int'];
  mediaType: Scalars['String'];
  sessionId: Scalars['String'];
};


export type QueryOnTheAirMediasArgs = {
  mediaType: Scalars['String'];
};


export type QueryPopularMediasArgs = {
  mediaType: Scalars['String'];
};


export type QuerySearchResultsArgs = {
  mediaType: Scalars['String'];
  page: Scalars['Int'];
  query: Scalars['String'];
  sessionId: Scalars['String'];
};


export type QuerySeasonDetailsArgs = {
  mediaId: Scalars['Int'];
  seasonNumber: Scalars['Int'];
  sessionId: Scalars['String'];
};


export type QueryTrendingMediasArgs = {
  mediaType: Scalars['String'];
};


export type QueryWatchlistMediasArgs = {
  accountId: Scalars['Int'];
  mediaType: Scalars['String'];
  page: Scalars['Int'];
  sessionId: Scalars['String'];
};

export type Season = {
  __typename?: 'Season';
  airDate?: Maybe<Scalars['Date']>;
  episodeCount?: Maybe<Scalars['Int']>;
  episodes?: Maybe<Array<Episode>>;
  id?: Maybe<Scalars['Int']>;
  loading?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  posterPath?: Maybe<Scalars['String']>;
  seasonNumber?: Maybe<Scalars['Int']>;
};

export type TvShow = {
  __typename?: 'TvShow';
  actors?: Maybe<Array<CrewMember>>;
  backdropCover?: Maybe<Scalars['String']>;
  directors?: Maybe<Array<CrewMember>>;
  favorite?: Maybe<Scalars['Boolean']>;
  genres?: Maybe<Array<Genre>>;
  id: Scalars['Int'];
  logo?: Maybe<Image>;
  originalTitle?: Maybe<Scalars['String']>;
  popularity?: Maybe<Scalars['String']>;
  poster?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Int']>;
  recommandations?: Maybe<Array<TvShow>>;
  recommendations?: Maybe<Array<Movie>>;
  releaseDate?: Maybe<Scalars['Date']>;
  runtime?: Maybe<Scalars['Int']>;
  seasons?: Maybe<Array<Season>>;
  status?: Maybe<Scalars['String']>;
  synopsis?: Maybe<Scalars['String']>;
  tagline?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  trailer?: Maybe<Array<Video>>;
  type: Scalars['String'];
  voteAverage?: Maybe<Scalars['Float']>;
  voteCount?: Maybe<Scalars['Int']>;
  watchlist?: Maybe<Scalars['Boolean']>;
};

export type Video = {
  __typename?: 'Video';
  id: Scalars['String'];
  iso_639_1: Scalars['String'];
  iso_3166_1: Scalars['String'];
  key: Scalars['String'];
  name: Scalars['String'];
  published_at: Scalars['String'];
  site: Scalars['String'];
  type: Scalars['String'];
};

export type GetTrendingMediasQueryVariables = Exact<{
  mediaType: Scalars['String'];
}>;


export type GetTrendingMediasQuery = { __typename?: 'Query', trendingMedias: Array<{ __typename: 'Movie', id: number, type: string, title?: string | null, originalTitle?: string | null, releaseDate?: any | null, poster?: string | null, voteAverage?: number | null, rating?: number | null, favorite?: boolean | null, watchlist?: boolean | null, logo?: { __typename?: 'Image', filePath: string } | null } | { __typename: 'TvShow', id: number, type: string, title?: string | null, originalTitle?: string | null, releaseDate?: any | null, poster?: string | null, voteAverage?: number | null, rating?: number | null, favorite?: boolean | null, watchlist?: boolean | null, logo?: { __typename?: 'Image', filePath: string } | null }> };

export type GetPopularMediasQueryVariables = Exact<{
  mediaType: Scalars['String'];
}>;


export type GetPopularMediasQuery = { __typename?: 'Query', popularMedias: Array<{ __typename: 'Movie', backdropCover?: string | null, id: number, type: string, title?: string | null, originalTitle?: string | null, releaseDate?: any | null, poster?: string | null, voteAverage?: number | null, rating?: number | null, favorite?: boolean | null, watchlist?: boolean | null, logo?: { __typename?: 'Image', filePath: string } | null } | { __typename: 'TvShow', backdropCover?: string | null, id: number, type: string, title?: string | null, originalTitle?: string | null, releaseDate?: any | null, poster?: string | null, voteAverage?: number | null, rating?: number | null, favorite?: boolean | null, watchlist?: boolean | null, logo?: { __typename?: 'Image', filePath: string } | null }> };

export type GetOnTheAirMediasQueryVariables = Exact<{
  mediaType: Scalars['String'];
}>;


export type GetOnTheAirMediasQuery = { __typename?: 'Query', onTheAirMedias: Array<{ __typename: 'Movie', id: number, type: string, title?: string | null, originalTitle?: string | null, releaseDate?: any | null, poster?: string | null, voteAverage?: number | null, rating?: number | null, favorite?: boolean | null, watchlist?: boolean | null, logo?: { __typename?: 'Image', filePath: string } | null } | { __typename: 'TvShow', id: number, type: string, title?: string | null, originalTitle?: string | null, releaseDate?: any | null, poster?: string | null, voteAverage?: number | null, rating?: number | null, favorite?: boolean | null, watchlist?: boolean | null, logo?: { __typename?: 'Image', filePath: string } | null }> };

export type GetLatestMediasQueryVariables = Exact<{
  mediaType: Scalars['String'];
}>;


export type GetLatestMediasQuery = { __typename?: 'Query', latestMedias: Array<{ __typename: 'Movie', id: number, type: string, title?: string | null, originalTitle?: string | null, releaseDate?: any | null, poster?: string | null, voteAverage?: number | null, rating?: number | null, favorite?: boolean | null, watchlist?: boolean | null, logo?: { __typename?: 'Image', filePath: string } | null } | { __typename: 'TvShow', id: number, type: string, title?: string | null, originalTitle?: string | null, releaseDate?: any | null, poster?: string | null, voteAverage?: number | null, rating?: number | null, favorite?: boolean | null, watchlist?: boolean | null, logo?: { __typename?: 'Image', filePath: string } | null }> };

export type GetMediaDetailsQueryVariables = Exact<{
  mediaId: Scalars['Int'];
  mediaType: Scalars['String'];
  sessionId: Scalars['String'];
}>;


export type GetMediaDetailsQuery = { __typename?: 'Query', mediaDetails: { __typename: 'Movie', id: number, type: string, originalTitle?: string | null, title?: string | null, runtime?: number | null, status?: string | null, tagline?: string | null, popularity?: string | null, poster?: string | null, voteAverage?: number | null, voteCount?: number | null, synopsis?: string | null, releaseDate?: any | null, backdropCover?: string | null, rating?: number | null, favorite?: boolean | null, watchlist?: boolean | null, genres?: Array<{ __typename?: 'Genre', id: number, name: string }> | null, actors?: Array<{ __typename?: 'CrewMember', name: string, character: string, profilePath?: string | null }> | null, directors?: Array<{ __typename?: 'CrewMember', name: string, job: string, profilePath?: string | null }> | null, recommendations?: Array<{ __typename?: 'Movie', id: number, title?: string | null, poster?: string | null, rating?: number | null, favorite?: boolean | null, watchlist?: boolean | null, voteAverage?: number | null }> | null } | { __typename: 'TvShow', id: number, type: string, originalTitle?: string | null, title?: string | null, runtime?: number | null, status?: string | null, tagline?: string | null, popularity?: string | null, poster?: string | null, voteAverage?: number | null, voteCount?: number | null, synopsis?: string | null, releaseDate?: any | null, backdropCover?: string | null, rating?: number | null, favorite?: boolean | null, watchlist?: boolean | null, genres?: Array<{ __typename?: 'Genre', id: number, name: string }> | null, actors?: Array<{ __typename?: 'CrewMember', name: string, character: string, profilePath?: string | null }> | null, directors?: Array<{ __typename?: 'CrewMember', name: string, job: string, profilePath?: string | null }> | null, recommendations?: Array<{ __typename?: 'Movie', id: number, title?: string | null, poster?: string | null, rating?: number | null, favorite?: boolean | null, watchlist?: boolean | null, voteAverage?: number | null }> | null, seasons?: Array<{ __typename?: 'Season', airDate?: any | null, episodeCount?: number | null, id?: number | null, name?: string | null, overview?: string | null, posterPath?: string | null, seasonNumber?: number | null, episodes?: Array<{ __typename?: 'Episode', airDate?: any | null, episodeNumber?: number | null, id?: number | null, name?: string | null, overview?: string | null, stillPath?: string | null, voteAverage?: number | null, voteCount?: number | null, rating?: number | null }> | null }> | null } };

export type GetSeasonDetailsQueryVariables = Exact<{
  mediaId: Scalars['Int'];
  seasonNumber: Scalars['Int'];
  sessionId: Scalars['String'];
}>;


export type GetSeasonDetailsQuery = { __typename?: 'Query', seasonDetails: { __typename: 'Season', name?: string | null, seasonNumber?: number | null, posterPath?: string | null, overview?: string | null, episodes?: Array<{ __typename?: 'Episode', name?: string | null, overview?: string | null, episodeNumber?: number | null, stillPath?: string | null, voteAverage?: number | null }> | null } };

export type GetWatchlistMediasQueryVariables = Exact<{
  mediaType: Scalars['String'];
  accountId: Scalars['Int'];
  sessionId: Scalars['String'];
  page: Scalars['Int'];
}>;


export type GetWatchlistMediasQuery = { __typename?: 'Query', watchlistMedias: Array<{ __typename: 'Movie', id: number, type: string, title?: string | null, originalTitle?: string | null, releaseDate?: any | null, poster?: string | null, voteAverage?: number | null, rating?: number | null, favorite?: boolean | null, watchlist?: boolean | null, logo?: { __typename?: 'Image', filePath: string } | null } | { __typename: 'TvShow', id: number, type: string, title?: string | null, originalTitle?: string | null, releaseDate?: any | null, poster?: string | null, voteAverage?: number | null, rating?: number | null, favorite?: boolean | null, watchlist?: boolean | null, logo?: { __typename?: 'Image', filePath: string } | null }> };

export type MutateRateMediaMutationVariables = Exact<{
  media: MediaInput;
  sessionId: Scalars['String'];
}>;


export type MutateRateMediaMutation = { __typename?: 'Mutation', rateMedia: { __typename: 'Movie', id: number, rating?: number | null } | { __typename: 'TvShow', id: number, rating?: number | null } };

export type MutateWatchlistMediaMutationVariables = Exact<{
  media: MediaInput;
  accountId: Scalars['Int'];
  sessionId: Scalars['String'];
}>;


export type MutateWatchlistMediaMutation = { __typename?: 'Mutation', watchlistMedia: { __typename: 'Movie', id: number, type: string, watchlist?: boolean | null } | { __typename: 'TvShow', id: number, type: string, watchlist?: boolean | null } };

export type MutateFavoriteMediaMutationVariables = Exact<{
  media: MediaInput;
  accountId: Scalars['Int'];
  sessionId: Scalars['String'];
}>;


export type MutateFavoriteMediaMutation = { __typename?: 'Mutation', favoriteMedia: { __typename: 'Movie', id: number, favorite?: boolean | null } | { __typename: 'TvShow', id: number, favorite?: boolean | null } };

export type SearchMediasQueryVariables = Exact<{
  mediaType: Scalars['String'];
  query: Scalars['String'];
  sessionId: Scalars['String'];
  page: Scalars['Int'];
}>;


export type SearchMediasQuery = { __typename?: 'Query', searchResults: Array<{ __typename: 'Movie', id: number, type: string, title?: string | null, originalTitle?: string | null, releaseDate?: any | null, poster?: string | null, voteAverage?: number | null, rating?: number | null, favorite?: boolean | null, watchlist?: boolean | null, logo?: { __typename?: 'Image', filePath: string } | null } | { __typename: 'TvShow', id: number, type: string, title?: string | null, originalTitle?: string | null, releaseDate?: any | null, poster?: string | null, voteAverage?: number | null, rating?: number | null, favorite?: boolean | null, watchlist?: boolean | null, logo?: { __typename?: 'Image', filePath: string } | null }> };

export type MovieOverviewFragment = { __typename?: 'Movie', id: number, type: string, title?: string | null, originalTitle?: string | null, releaseDate?: any | null, poster?: string | null, voteAverage?: number | null, rating?: number | null, favorite?: boolean | null, watchlist?: boolean | null, logo?: { __typename?: 'Image', filePath: string } | null };

export type TvShowOverviewFragment = { __typename?: 'TvShow', id: number, type: string, title?: string | null, originalTitle?: string | null, releaseDate?: any | null, poster?: string | null, voteAverage?: number | null, rating?: number | null, favorite?: boolean | null, watchlist?: boolean | null, logo?: { __typename?: 'Image', filePath: string } | null };

export type MovieDetailsFragment = { __typename?: 'Movie', id: number, type: string, originalTitle?: string | null, title?: string | null, runtime?: number | null, status?: string | null, tagline?: string | null, popularity?: string | null, poster?: string | null, voteAverage?: number | null, voteCount?: number | null, synopsis?: string | null, releaseDate?: any | null, backdropCover?: string | null, rating?: number | null, favorite?: boolean | null, watchlist?: boolean | null, genres?: Array<{ __typename?: 'Genre', id: number, name: string }> | null, actors?: Array<{ __typename?: 'CrewMember', name: string, character: string, profilePath?: string | null }> | null, directors?: Array<{ __typename?: 'CrewMember', name: string, job: string, profilePath?: string | null }> | null, recommendations?: Array<{ __typename?: 'Movie', id: number, title?: string | null, poster?: string | null, rating?: number | null, favorite?: boolean | null, watchlist?: boolean | null, voteAverage?: number | null }> | null };

export type TvShowDetailsFragment = { __typename?: 'TvShow', id: number, type: string, originalTitle?: string | null, title?: string | null, runtime?: number | null, status?: string | null, tagline?: string | null, popularity?: string | null, poster?: string | null, voteAverage?: number | null, voteCount?: number | null, synopsis?: string | null, releaseDate?: any | null, backdropCover?: string | null, rating?: number | null, favorite?: boolean | null, watchlist?: boolean | null, genres?: Array<{ __typename?: 'Genre', id: number, name: string }> | null, actors?: Array<{ __typename?: 'CrewMember', name: string, character: string, profilePath?: string | null }> | null, directors?: Array<{ __typename?: 'CrewMember', name: string, job: string, profilePath?: string | null }> | null, recommendations?: Array<{ __typename?: 'Movie', id: number, title?: string | null, poster?: string | null, rating?: number | null, favorite?: boolean | null, watchlist?: boolean | null, voteAverage?: number | null }> | null, seasons?: Array<{ __typename?: 'Season', airDate?: any | null, episodeCount?: number | null, id?: number | null, name?: string | null, overview?: string | null, posterPath?: string | null, seasonNumber?: number | null, episodes?: Array<{ __typename?: 'Episode', airDate?: any | null, episodeNumber?: number | null, id?: number | null, name?: string | null, overview?: string | null, stillPath?: string | null, voteAverage?: number | null, voteCount?: number | null, rating?: number | null }> | null }> | null };

export const MovieOverviewFragmentDoc = gql`
    fragment MovieOverview on Movie {
  id
  type
  title
  originalTitle
  releaseDate
  logo {
    filePath
  }
  poster
  voteAverage
  rating
  favorite
  watchlist
}
    `;
export const TvShowOverviewFragmentDoc = gql`
    fragment TvShowOverview on TvShow {
  id
  type
  title
  originalTitle
  releaseDate
  logo {
    filePath
  }
  poster
  voteAverage
  rating
  favorite
  watchlist
}
    `;
export const MovieDetailsFragmentDoc = gql`
    fragment MovieDetails on Movie {
  id
  type
  genres {
    id
    name
  }
  originalTitle
  title
  runtime
  status
  tagline
  popularity
  poster
  voteAverage
  voteCount
  synopsis
  releaseDate
  backdropCover
  actors {
    name
    character
    profilePath
  }
  directors {
    name
    job
    profilePath
  }
  recommendations {
    id
    title
    poster
    title
    rating
    favorite
    watchlist
    voteAverage
  }
  rating
  favorite
  watchlist
}
    `;
export const TvShowDetailsFragmentDoc = gql`
    fragment TvShowDetails on TvShow {
  id
  type
  genres {
    id
    name
  }
  originalTitle
  title
  runtime
  status
  tagline
  popularity
  poster
  voteAverage
  voteCount
  synopsis
  releaseDate
  backdropCover
  actors {
    name
    character
    profilePath
  }
  directors {
    name
    job
    profilePath
  }
  recommendations {
    id
    title
    poster
    title
    rating
    favorite
    watchlist
    voteAverage
  }
  seasons {
    airDate
    episodeCount
    id
    name
    overview
    posterPath
    seasonNumber
    episodes {
      airDate
      episodeNumber
      id
      name
      overview
      stillPath
      voteAverage
      voteCount
      rating
    }
  }
  rating
  favorite
  watchlist
}
    `;
export const GetTrendingMediasDocument = gql`
    query GetTrendingMedias($mediaType: String!) {
  trendingMedias(mediaType: $mediaType) {
    __typename
    ... on Movie {
      __typename
      ...MovieOverview
    }
    ... on TvShow {
      __typename
      ...TvShowOverview
    }
  }
}
    ${MovieOverviewFragmentDoc}
${TvShowOverviewFragmentDoc}`;

/**
 * __useGetTrendingMediasQuery__
 *
 * To run a query within a React component, call `useGetTrendingMediasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrendingMediasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrendingMediasQuery({
 *   variables: {
 *      mediaType: // value for 'mediaType'
 *   },
 * });
 */
export function useGetTrendingMediasQuery(baseOptions: Apollo.QueryHookOptions<GetTrendingMediasQuery, GetTrendingMediasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTrendingMediasQuery, GetTrendingMediasQueryVariables>(GetTrendingMediasDocument, options);
      }
export function useGetTrendingMediasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTrendingMediasQuery, GetTrendingMediasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTrendingMediasQuery, GetTrendingMediasQueryVariables>(GetTrendingMediasDocument, options);
        }
export type GetTrendingMediasQueryHookResult = ReturnType<typeof useGetTrendingMediasQuery>;
export type GetTrendingMediasLazyQueryHookResult = ReturnType<typeof useGetTrendingMediasLazyQuery>;
export type GetTrendingMediasQueryResult = Apollo.QueryResult<GetTrendingMediasQuery, GetTrendingMediasQueryVariables>;
export const GetPopularMediasDocument = gql`
    query GetPopularMedias($mediaType: String!) {
  popularMedias(mediaType: $mediaType) {
    __typename
    ... on Movie {
      __typename
      ...MovieOverview
      backdropCover
    }
    ... on TvShow {
      __typename
      ...TvShowOverview
      backdropCover
    }
  }
}
    ${MovieOverviewFragmentDoc}
${TvShowOverviewFragmentDoc}`;

/**
 * __useGetPopularMediasQuery__
 *
 * To run a query within a React component, call `useGetPopularMediasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPopularMediasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPopularMediasQuery({
 *   variables: {
 *      mediaType: // value for 'mediaType'
 *   },
 * });
 */
export function useGetPopularMediasQuery(baseOptions: Apollo.QueryHookOptions<GetPopularMediasQuery, GetPopularMediasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPopularMediasQuery, GetPopularMediasQueryVariables>(GetPopularMediasDocument, options);
      }
export function useGetPopularMediasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPopularMediasQuery, GetPopularMediasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPopularMediasQuery, GetPopularMediasQueryVariables>(GetPopularMediasDocument, options);
        }
export type GetPopularMediasQueryHookResult = ReturnType<typeof useGetPopularMediasQuery>;
export type GetPopularMediasLazyQueryHookResult = ReturnType<typeof useGetPopularMediasLazyQuery>;
export type GetPopularMediasQueryResult = Apollo.QueryResult<GetPopularMediasQuery, GetPopularMediasQueryVariables>;
export const GetOnTheAirMediasDocument = gql`
    query GetOnTheAirMedias($mediaType: String!) {
  onTheAirMedias(mediaType: $mediaType) {
    __typename
    ... on Movie {
      __typename
      ...MovieOverview
    }
    ... on TvShow {
      __typename
      ...TvShowOverview
    }
  }
}
    ${MovieOverviewFragmentDoc}
${TvShowOverviewFragmentDoc}`;

/**
 * __useGetOnTheAirMediasQuery__
 *
 * To run a query within a React component, call `useGetOnTheAirMediasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOnTheAirMediasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOnTheAirMediasQuery({
 *   variables: {
 *      mediaType: // value for 'mediaType'
 *   },
 * });
 */
export function useGetOnTheAirMediasQuery(baseOptions: Apollo.QueryHookOptions<GetOnTheAirMediasQuery, GetOnTheAirMediasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOnTheAirMediasQuery, GetOnTheAirMediasQueryVariables>(GetOnTheAirMediasDocument, options);
      }
export function useGetOnTheAirMediasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOnTheAirMediasQuery, GetOnTheAirMediasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOnTheAirMediasQuery, GetOnTheAirMediasQueryVariables>(GetOnTheAirMediasDocument, options);
        }
export type GetOnTheAirMediasQueryHookResult = ReturnType<typeof useGetOnTheAirMediasQuery>;
export type GetOnTheAirMediasLazyQueryHookResult = ReturnType<typeof useGetOnTheAirMediasLazyQuery>;
export type GetOnTheAirMediasQueryResult = Apollo.QueryResult<GetOnTheAirMediasQuery, GetOnTheAirMediasQueryVariables>;
export const GetLatestMediasDocument = gql`
    query GetLatestMedias($mediaType: String!) {
  latestMedias(mediaType: $mediaType) {
    __typename
    ... on Movie {
      __typename
      ...MovieOverview
    }
    ... on TvShow {
      __typename
      ...TvShowOverview
    }
  }
}
    ${MovieOverviewFragmentDoc}
${TvShowOverviewFragmentDoc}`;

/**
 * __useGetLatestMediasQuery__
 *
 * To run a query within a React component, call `useGetLatestMediasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLatestMediasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLatestMediasQuery({
 *   variables: {
 *      mediaType: // value for 'mediaType'
 *   },
 * });
 */
export function useGetLatestMediasQuery(baseOptions: Apollo.QueryHookOptions<GetLatestMediasQuery, GetLatestMediasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLatestMediasQuery, GetLatestMediasQueryVariables>(GetLatestMediasDocument, options);
      }
export function useGetLatestMediasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLatestMediasQuery, GetLatestMediasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLatestMediasQuery, GetLatestMediasQueryVariables>(GetLatestMediasDocument, options);
        }
export type GetLatestMediasQueryHookResult = ReturnType<typeof useGetLatestMediasQuery>;
export type GetLatestMediasLazyQueryHookResult = ReturnType<typeof useGetLatestMediasLazyQuery>;
export type GetLatestMediasQueryResult = Apollo.QueryResult<GetLatestMediasQuery, GetLatestMediasQueryVariables>;
export const GetMediaDetailsDocument = gql`
    query GetMediaDetails($mediaId: Int!, $mediaType: String!, $sessionId: String!) {
  mediaDetails(mediaId: $mediaId, mediaType: $mediaType, sessionId: $sessionId) {
    __typename
    ... on Movie {
      __typename
      ...MovieDetails
    }
    ... on TvShow {
      __typename
      ...TvShowDetails
    }
  }
}
    ${MovieDetailsFragmentDoc}
${TvShowDetailsFragmentDoc}`;

/**
 * __useGetMediaDetailsQuery__
 *
 * To run a query within a React component, call `useGetMediaDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMediaDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMediaDetailsQuery({
 *   variables: {
 *      mediaId: // value for 'mediaId'
 *      mediaType: // value for 'mediaType'
 *      sessionId: // value for 'sessionId'
 *   },
 * });
 */
export function useGetMediaDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetMediaDetailsQuery, GetMediaDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMediaDetailsQuery, GetMediaDetailsQueryVariables>(GetMediaDetailsDocument, options);
      }
export function useGetMediaDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMediaDetailsQuery, GetMediaDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMediaDetailsQuery, GetMediaDetailsQueryVariables>(GetMediaDetailsDocument, options);
        }
export type GetMediaDetailsQueryHookResult = ReturnType<typeof useGetMediaDetailsQuery>;
export type GetMediaDetailsLazyQueryHookResult = ReturnType<typeof useGetMediaDetailsLazyQuery>;
export type GetMediaDetailsQueryResult = Apollo.QueryResult<GetMediaDetailsQuery, GetMediaDetailsQueryVariables>;
export const GetSeasonDetailsDocument = gql`
    query GetSeasonDetails($mediaId: Int!, $seasonNumber: Int!, $sessionId: String!) {
  seasonDetails(
    mediaId: $mediaId
    seasonNumber: $seasonNumber
    sessionId: $sessionId
  ) {
    __typename
    name
    seasonNumber
    posterPath
    overview
    episodes {
      name
      overview
      episodeNumber
      stillPath
      voteAverage
    }
  }
}
    `;

/**
 * __useGetSeasonDetailsQuery__
 *
 * To run a query within a React component, call `useGetSeasonDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSeasonDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSeasonDetailsQuery({
 *   variables: {
 *      mediaId: // value for 'mediaId'
 *      seasonNumber: // value for 'seasonNumber'
 *      sessionId: // value for 'sessionId'
 *   },
 * });
 */
export function useGetSeasonDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetSeasonDetailsQuery, GetSeasonDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSeasonDetailsQuery, GetSeasonDetailsQueryVariables>(GetSeasonDetailsDocument, options);
      }
export function useGetSeasonDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSeasonDetailsQuery, GetSeasonDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSeasonDetailsQuery, GetSeasonDetailsQueryVariables>(GetSeasonDetailsDocument, options);
        }
export type GetSeasonDetailsQueryHookResult = ReturnType<typeof useGetSeasonDetailsQuery>;
export type GetSeasonDetailsLazyQueryHookResult = ReturnType<typeof useGetSeasonDetailsLazyQuery>;
export type GetSeasonDetailsQueryResult = Apollo.QueryResult<GetSeasonDetailsQuery, GetSeasonDetailsQueryVariables>;
export const GetWatchlistMediasDocument = gql`
    query GetWatchlistMedias($mediaType: String!, $accountId: Int!, $sessionId: String!, $page: Int!) {
  watchlistMedias(
    mediaType: $mediaType
    accountId: $accountId
    sessionId: $sessionId
    page: $page
  ) {
    ... on Movie {
      __typename
      ...MovieOverview
    }
    ... on TvShow {
      __typename
      ...TvShowOverview
    }
  }
}
    ${MovieOverviewFragmentDoc}
${TvShowOverviewFragmentDoc}`;

/**
 * __useGetWatchlistMediasQuery__
 *
 * To run a query within a React component, call `useGetWatchlistMediasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWatchlistMediasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWatchlistMediasQuery({
 *   variables: {
 *      mediaType: // value for 'mediaType'
 *      accountId: // value for 'accountId'
 *      sessionId: // value for 'sessionId'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetWatchlistMediasQuery(baseOptions: Apollo.QueryHookOptions<GetWatchlistMediasQuery, GetWatchlistMediasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWatchlistMediasQuery, GetWatchlistMediasQueryVariables>(GetWatchlistMediasDocument, options);
      }
export function useGetWatchlistMediasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWatchlistMediasQuery, GetWatchlistMediasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWatchlistMediasQuery, GetWatchlistMediasQueryVariables>(GetWatchlistMediasDocument, options);
        }
export type GetWatchlistMediasQueryHookResult = ReturnType<typeof useGetWatchlistMediasQuery>;
export type GetWatchlistMediasLazyQueryHookResult = ReturnType<typeof useGetWatchlistMediasLazyQuery>;
export type GetWatchlistMediasQueryResult = Apollo.QueryResult<GetWatchlistMediasQuery, GetWatchlistMediasQueryVariables>;
export const MutateRateMediaDocument = gql`
    mutation MutateRateMedia($media: MediaInput!, $sessionId: String!) {
  rateMedia(media: $media, sessionId: $sessionId) {
    ... on Movie {
      __typename
      id
      rating
    }
    ... on TvShow {
      __typename
      id
      rating
    }
  }
}
    `;
export type MutateRateMediaMutationFn = Apollo.MutationFunction<MutateRateMediaMutation, MutateRateMediaMutationVariables>;

/**
 * __useMutateRateMediaMutation__
 *
 * To run a mutation, you first call `useMutateRateMediaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutateRateMediaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutateRateMediaMutation, { data, loading, error }] = useMutateRateMediaMutation({
 *   variables: {
 *      media: // value for 'media'
 *      sessionId: // value for 'sessionId'
 *   },
 * });
 */
export function useMutateRateMediaMutation(baseOptions?: Apollo.MutationHookOptions<MutateRateMediaMutation, MutateRateMediaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutateRateMediaMutation, MutateRateMediaMutationVariables>(MutateRateMediaDocument, options);
      }
export type MutateRateMediaMutationHookResult = ReturnType<typeof useMutateRateMediaMutation>;
export type MutateRateMediaMutationResult = Apollo.MutationResult<MutateRateMediaMutation>;
export type MutateRateMediaMutationOptions = Apollo.BaseMutationOptions<MutateRateMediaMutation, MutateRateMediaMutationVariables>;
export const MutateWatchlistMediaDocument = gql`
    mutation MutateWatchlistMedia($media: MediaInput!, $accountId: Int!, $sessionId: String!) {
  watchlistMedia(media: $media, accountId: $accountId, sessionId: $sessionId) {
    ... on Movie {
      __typename
      id
      type
      watchlist
    }
    ... on TvShow {
      __typename
      id
      type
      watchlist
    }
  }
}
    `;
export type MutateWatchlistMediaMutationFn = Apollo.MutationFunction<MutateWatchlistMediaMutation, MutateWatchlistMediaMutationVariables>;

/**
 * __useMutateWatchlistMediaMutation__
 *
 * To run a mutation, you first call `useMutateWatchlistMediaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutateWatchlistMediaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutateWatchlistMediaMutation, { data, loading, error }] = useMutateWatchlistMediaMutation({
 *   variables: {
 *      media: // value for 'media'
 *      accountId: // value for 'accountId'
 *      sessionId: // value for 'sessionId'
 *   },
 * });
 */
export function useMutateWatchlistMediaMutation(baseOptions?: Apollo.MutationHookOptions<MutateWatchlistMediaMutation, MutateWatchlistMediaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutateWatchlistMediaMutation, MutateWatchlistMediaMutationVariables>(MutateWatchlistMediaDocument, options);
      }
export type MutateWatchlistMediaMutationHookResult = ReturnType<typeof useMutateWatchlistMediaMutation>;
export type MutateWatchlistMediaMutationResult = Apollo.MutationResult<MutateWatchlistMediaMutation>;
export type MutateWatchlistMediaMutationOptions = Apollo.BaseMutationOptions<MutateWatchlistMediaMutation, MutateWatchlistMediaMutationVariables>;
export const MutateFavoriteMediaDocument = gql`
    mutation MutateFavoriteMedia($media: MediaInput!, $accountId: Int!, $sessionId: String!) {
  favoriteMedia(media: $media, accountId: $accountId, sessionId: $sessionId) {
    ... on Movie {
      __typename
      id
      favorite
    }
    ... on TvShow {
      __typename
      id
      favorite
    }
  }
}
    `;
export type MutateFavoriteMediaMutationFn = Apollo.MutationFunction<MutateFavoriteMediaMutation, MutateFavoriteMediaMutationVariables>;

/**
 * __useMutateFavoriteMediaMutation__
 *
 * To run a mutation, you first call `useMutateFavoriteMediaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutateFavoriteMediaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutateFavoriteMediaMutation, { data, loading, error }] = useMutateFavoriteMediaMutation({
 *   variables: {
 *      media: // value for 'media'
 *      accountId: // value for 'accountId'
 *      sessionId: // value for 'sessionId'
 *   },
 * });
 */
export function useMutateFavoriteMediaMutation(baseOptions?: Apollo.MutationHookOptions<MutateFavoriteMediaMutation, MutateFavoriteMediaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutateFavoriteMediaMutation, MutateFavoriteMediaMutationVariables>(MutateFavoriteMediaDocument, options);
      }
export type MutateFavoriteMediaMutationHookResult = ReturnType<typeof useMutateFavoriteMediaMutation>;
export type MutateFavoriteMediaMutationResult = Apollo.MutationResult<MutateFavoriteMediaMutation>;
export type MutateFavoriteMediaMutationOptions = Apollo.BaseMutationOptions<MutateFavoriteMediaMutation, MutateFavoriteMediaMutationVariables>;
export const SearchMediasDocument = gql`
    query SearchMedias($mediaType: String!, $query: String!, $sessionId: String!, $page: Int!) {
  searchResults(
    mediaType: $mediaType
    query: $query
    sessionId: $sessionId
    page: $page
  ) {
    ... on Movie {
      __typename
      ...MovieOverview
    }
    ... on TvShow {
      __typename
      ...TvShowOverview
    }
  }
}
    ${MovieOverviewFragmentDoc}
${TvShowOverviewFragmentDoc}`;

/**
 * __useSearchMediasQuery__
 *
 * To run a query within a React component, call `useSearchMediasQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchMediasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchMediasQuery({
 *   variables: {
 *      mediaType: // value for 'mediaType'
 *      query: // value for 'query'
 *      sessionId: // value for 'sessionId'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useSearchMediasQuery(baseOptions: Apollo.QueryHookOptions<SearchMediasQuery, SearchMediasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchMediasQuery, SearchMediasQueryVariables>(SearchMediasDocument, options);
      }
export function useSearchMediasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchMediasQuery, SearchMediasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchMediasQuery, SearchMediasQueryVariables>(SearchMediasDocument, options);
        }
export type SearchMediasQueryHookResult = ReturnType<typeof useSearchMediasQuery>;
export type SearchMediasLazyQueryHookResult = ReturnType<typeof useSearchMediasLazyQuery>;
export type SearchMediasQueryResult = Apollo.QueryResult<SearchMediasQuery, SearchMediasQueryVariables>;