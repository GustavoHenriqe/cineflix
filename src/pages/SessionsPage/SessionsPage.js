import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

import Footer from "../../components/Footer/Footer"

import styled from "styled-components"

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
                        <SessionContainer key={session.id}>
                            {session.weekday} - {session.date}

                            <ButtonsContainer>
                                {session.showtimes.map(showtimes =>
                                        <Link 
                                            key={showtimes.id} 
                                            to={"/assentos/" + showtimes.id}
                                        >
                                            <button>
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
            <Footer />
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
`