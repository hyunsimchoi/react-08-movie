import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router";
import styles from "./Search.module.css";

function Search() {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const keyword = params.get("keyword") || "";

    const [text, setText] = useState(keyword);
    const [list, setList] = useState([]);

    useEffect(() => {
        if (!keyword) return;

        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&s=${keyword}`)
            .then(res => res.json())
            .then(data => setList(data.Search || []));
    }, [keyword]);

    return (
        <div className={styles.container}>
            <h3>검색 키워드 : {keyword}</h3>

            <form
                onSubmit={e => {
                    e.preventDefault();
                    navigate(`/search?keyword=${text}`);
                }}>
                <input value={text} onChange={e => setText(e.target.value)} />
                <button>Search</button>
            </form>

            <div className={styles.list}>
                {list.map(item => (
                    <Link key={item.imdbID} to={`/detail/${item.imdbID}`} className={styles.movie}>
                        <img src={item.Poster} alt={item.Title} />
                        <h3>{item.Title}</h3>
                        <p>{item.Year}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Search;
