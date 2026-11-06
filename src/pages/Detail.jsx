import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import styles from "./Detail.module.css";

function Detail() {
    const { imdbID } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&i=${imdbID}&plot=full`)
            .then(res => res.json())
            .then(data => setMovie(data));
    }, [imdbID]);

    if (!movie) return <p>Loading...</p>;
    if (movie.Response === "False") return <p>{movie.Error}</p>;

    return (
        <div className={styles.container}>
            <button onClick={() => navigate(-1)}>← Back</button>

            <div>
                <img src={movie.Poster} alt={movie.Title} />

                <h1>{movie.Title}</h1>
                <p>
                    <b>Year:</b> {movie.Year}
                </p>
                <p>
                    <b>Genre:</b> {movie.Genre}
                </p>
                <p>
                    <b>Director:</b> {movie.Director}
                </p>
                <p>{movie.Plot}</p>
            </div>
        </div>
    );
}

export default Detail;
