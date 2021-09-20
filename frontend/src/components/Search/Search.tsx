import React, {useCallback, useEffect, useState} from "react";
import "./Search.scss";
import {useDispatch, useSelector} from "react-redux";
import {getMoviesResults, getPopularMoviesList} from "../../redux/moviesReducer";
import {debounce} from 'lodash';
import {searchMovies} from "../../helpers/ApiCalls";
import {MovieInterface} from "../Movie/Movie.interface";


function Search() {
    const dispatch = useDispatch();
    const [inputSearch, setInputSearch] = useState();
    const movies = useSelector((state: any) => state.moviesReducer.popularMovies);

    const dispatchSearchMovies = (e: any) => {
        e.preventDefault();
        dispatch(getMoviesResults(inputSearch));
    }

    const debouncedSave  = useCallback(
        debounce(input =>  dispatch(getMoviesResults(input)) , 300)
        , []);


    useEffect(() => {
        if (inputSearch) {
            debouncedSave(inputSearch);
        } else {
            dispatch(getPopularMoviesList());
        }
    }, [inputSearch]);

    const changeValue = (e: any) =>
    {
        setInputSearch(e.target.value);
    }

    return (
        <div className="search" onSubmit={(e) => dispatchSearchMovies(e)}>
                <input type="text" className="search__input" onChange={e => changeValue(e) } />
        </div>
    )
}

export default Search;