import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

import Footer from "../../components/Footer/Footer"

import { PageContainer, SessionContainer, ButtonsContainer } from "./style"

import axios from "axios"
import { API_CINEFLIX } from "../../constants/API"

export default function SessionsPage() {
    const { idFilm } = useParams()
    const [ sessions, setSessions ] = useState([])
    
    useEffect(() => {
        const requestSessionsAPI = axios.get(API_CINEFLIX + `cineflex/movies/${idFilm}/showtimes`)
        
        requestSessionsAPI.then(
            res => setSessions(res.data)
        )

        requestSessionsAPI.catch(
            res => alert(res)
        )

    }, [])

    if ( sessions.length === 0 ) {
        return (
            <>
                Carregando...
            </>
        )
    }
    return (
        <PageContainer>
            Selecione o horário
            <div>
                {sessions.days.map(session => 
                        <SessionContainer data-test="movie-day" key={session.id}>
                            {session.weekday} - {session.date}

                            <ButtonsContainer>
                                {session.showtimes.map(showtimes =>
                                        <Link 
                                            key={showtimes.id} 
                                            to={"/assentos/" + showtimes.id}
                                        >
                                            <button data-test="showtime" >
                                                {showtimes.name}
                                            </button>
                                        </Link>
                                    )
                                }
                            </ButtonsContainer>
                        </SessionContainer>
                    )
                }
            </div>
            <Footer 
                image={sessions.posterURL} 
                title={sessions.title}
            />
        </PageContainer>
    )
}