import styles from "../styles/movie-credits.module.css";

export default function Credit({name, profile_path}){
    return (
        <div className={styles.container}>
            <img src={profile_path}/>
            <p>{name}</p>
        </div>
    );
}