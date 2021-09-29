import React, {useCallback, useEffect, useState} from "react";
import "./Search.scss";
import {useDispatch, useSelector} from "react-redux";
import {getMoviesResults, getPopularMoviesList} from "../../redux/moviesReducer";
import {debounce} from 'lodash';
import {searchMovies} from "../../helpers/ApiCalls";
import {MovieInterface} from "../Movie/Movie.interface";

interface Props {
    searchMovies: any;
}

function Search(props: Props) {
    const dispatch = useDispatch();
    const [inputSearch, setInputSearch] = useState();
    const movies = useSelector((state: any) => state.moviesReducer.popularMovies);

    const debouncedSave  = useCallback(
        debounce(input =>  props.searchMovies(input) , 300)
        , []);


    useEffect(() => {
        if (inputSearch) {
            debouncedSave(inputSearch);
        } else {
            debouncedSave(inputSearch);
            dispatch(getPopularMoviesList());
        }
    }, [inputSearch]);

    const changeValue = (e: any) =>
    {
        setInputSearch(e.target.value);
    }

    return (
        <div className="search" >
            <input type="text" placeholder="Rechercher" className="search__input" onChange={e => changeValue(e) } />
        </div>
    )
}

export default Search;