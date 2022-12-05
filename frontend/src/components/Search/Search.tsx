import React, { useCallback, useEffect, useState } from 'react';
import './Search.scss';
import { debounce } from 'lodash';
import { FaSearch } from 'react-icons/all';
import medias from "../../views/Medias/Medias";

interface Props {
  searchMedias: any;
  mediaType: any;
}

function Search(props: Props) {
  const [inputSearch, setInputSearch] = useState('');

  const debouncedSave = useCallback(
    debounce((input) => {

      props.searchMedias(input)
    }, 300),
    [props.searchMedias],
  );



  useEffect(() => {
      debouncedSave(inputSearch);
  }, [inputSearch]);

    useEffect(() => {
        setInputSearch('')
    }, [props.mediaType])

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
