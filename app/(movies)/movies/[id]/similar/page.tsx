import Movie from "../../../../../components/movie";
import { getMovie } from "../../../../../components/movie-info";
import styles from "../../../../../styles/movie-similar.module.css";
import { API_URL } from "../../../../constants";

async function getSimilarMovies(id: string){
    const response = await fetch(`${API_URL}/${id}/similar`);
    return response.json();
}

export default async function SimilarMovies({ params: { id }} : {params: { id: string }}){
    const original = await getMovie(id);
    const movies = await getSimilarMovies(id);
    return (
        <div>
            <div className={styles.movie}>
                <h3>Movies similar to</h3>
                <Movie
                    key={original.id}
                    id={original.id}
                    poster_path={original.poster_path}
                    title={original.title}
                 />
            </div>
            <div className={styles.container}>
                {movies.map((movie) => (
                    <Movie 
                        key={movie.id} 
                        id={movie.id} 
                        poster_path={movie.poster_path}
                        title={movie.title}
                    />
                ))}
            </div>
        </div>
        
    );
}