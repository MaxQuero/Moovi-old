import React from 'react';

import './SearchResults.scss';
import {Movie, TvShow} from "../../generated/graphql";
import Media from "../Media/Media";
import {v4 as uuidv4} from "uuid";


type SearchResultsProps =  {
  searchResults: TvShow[] | Movie[];
}

function SearchResults({searchResults}: SearchResultsProps) {
    return (
        <div className="medias__section medias-list__results">
            {searchResults &&
                searchResults.map((media: Movie | TvShow) => (
                    <Media className="homepage__media" media={media} hasActions key={uuidv4()}/>
                ))}
        </div>
    )
}

export default SearchResults;
