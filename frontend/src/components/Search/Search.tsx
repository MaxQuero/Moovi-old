import React, { useCallback, useEffect, useState } from 'react';
import './Search.scss';
import { debounce } from 'lodash';
import { FaSearch } from 'react-icons/all';
import medias from "../../views/Medias/Medias";

interface SearchProps {
  searchMedias: any;
  mediaType?: any;
}

function Search({searchMedias, mediaType}: SearchProps) {
  const [inputSearch, setInputSearch] = useState('');

  const debouncedSave = useCallback(
    debounce((input) => {

      searchMedias(input)
    }, 300),
    [searchMedias],
  );

  useEffect(() => {
      debouncedSave(inputSearch);
  }, [inputSearch]);

    useEffect(() => {
        setInputSearch('')
    }, [mediaType])

  const changeValue = (e: any) => {
    setInputSearch(e.target.value);
  };

  return (
    <div className="search">
      <input type="text" value={inputSearch} placeholder="Rechercher" className="search__input" onChange={(e) => changeValue(e)} />
      <div className="search__button">
        <FaSearch className="fa-search" />
      </div>
    </div>
  );
}

export default Search;
