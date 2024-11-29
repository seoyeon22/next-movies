import Link from "next/link";
import { API_URL } from "../app/(home)/page";
import styles from "../styles/movie-info.module.css";
import Credit from "./movie-credit";

export async function getMovie(id: string) {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}

export async function getCredits(id: string) {
    const response = await fetch(`${API_URL}/${id}/credits`);
    return response.json();
}

export async function getProviders(id: string) {
    const response = await fetch(`${API_URL}/${id}/providers`);
    return response.json();
}

export default async function MovieInfo({id} : {id: string}){
    const movie = await getMovie(id);
    const credits = await getCredits(id);
    const providers = await getProviders(id);
    const locale = Intl.DateTimeFormat().resolvedOptions().locale.split('-')[1];
    const provider = providers[locale];

    return (
        <div className={styles.container}>
            <img src={movie.poster_path} className={styles.poster}/>
            <div className={styles.info}>
                <h1 className={styles.title}>{movie.title}</h1>
                <h3>⭐️{movie.vote_average.toFixed(1)}</h3>
                <p>{movie.overview}</p>
                <p>credits</p>
                <div className={styles.credits}>
                    {credits.map((credit) => (
                        <Credit
                            name={credit.name}
                            profile_path={credit.profile_path}
                        />
                    ))}
                </div>
                <div className={styles.providers}>
                    {provider ? <a href={provider.link}>Provider &rarr;</a>: null}
                </div>
                <a href={movie.homepage} target={"_blank"}>Homepage &rarr;</a>
                <Link href={`/movies/${id}/similar`}>Similar Movies &rarr;</Link>
            </div>
        </div>
    )
}