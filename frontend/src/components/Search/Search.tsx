import React, { useCallback, useEffect, useState } from 'react';
import './Search.scss';
import { debounce } from 'lodash';
import { FaSearch } from 'react-icons/all';

interface Props {
  searchMedias: any;
}

function Search(props: Props) {
  const [inputSearch, setInputSearch] = useState();

  const debouncedSave = useCallback(
    debounce((input) => props.searchMedias(input), 300),
    [],
  );

  useEffect(() => {
    if (inputSearch) {
      debouncedSave(inputSearch);
    }
  }, [inputSearch]);

  const changeValue = (e: any) => {
    setInputSearch(e.target.value);
  };

  return (
    <div className="search">
      <input type="text" placeholder="Rechercher" className="search__input" onChange={(e) => changeValue(e)} />
      <div className="search__button">
        <FaSearch className="fa-search" />
      </div>
    </div>
  );
}

export default Search;
