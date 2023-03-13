import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { PageContainer, ListContainer, MovieContainer } from "./style"

import { API_CINEFLIX } from "../../constants/API"
import axios from "axios"

export default function HomePage() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const requestMoviesAPI = axios.get(API_CINEFLIX + "cineflex/movies")

        requestMoviesAPI.then(
            res => setMovies(res.data)
        )

        requestMoviesAPI.catch(
            res => window.alert(res)
        )
        
    }, [])

    if ( movies.length === 0 ) {
        return (
            <>
                Carregando...
            </>
        )
    }

    return (
        <PageContainer>
            <h1>Selecione o filme</h1>

            <ListContainer>
                {movies.map(movie =>
                 
                        <MovieContainer key={movie.id}>
                            <Link 
                                to={"/sessoes/" + movie.id}
                            >
                                <img src={movie.posterURL} alt={movie.title} />
                            </Link>
                        </MovieContainer>
                    )
                }
            </ListContainer>

        </PageContainer>
    )
}