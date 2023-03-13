import axios from "axios"
import { API_CINEFLIX } from "../../constants/API"

import { useEffect, useState } from "react"

import { useParams, Link } from "react-router-dom"

import styled from "styled-components"
import Footer from "../../components/Footer/Footer"
import SeatsButton from "./SeatsButton.js/SeatsButton"

export default function SeatsPage() {
    const _colors = [{
        color: "#808F9D",
        border: "#C3CFD9"
    }, {
        color: "#0E7D71",
        border: "#1AAE9E"
    }, {
        color: "#FBE192",
        border: "#F7C52B"
    }]
    const { idSeats } = useParams()
    const [seats, setSeats] = useState([])

    const [idsOfSeats, setIdsOfSeats] = useState([])

    useEffect(() => {
        const requestSeatsAPI = axios.get(API_CINEFLIX + `cineflex/showtimes/${idSeats}/seats`)

        requestSeatsAPI.then(
            res => setSeats(res.data)
        )

        requestSeatsAPI.catch(
            res => alert(res)
        )

    }, [])

    if ( seats.length === 0 ) {
        return (
            <>
                carregando...
            </>
        )
    }

    return (
        <PageContainer>
            <h1>Selecione o(s) assento(s)</h1>
            <SeatsContainer>
                {seats.seats.map(seat =>
                        <SeatsButton
                            isAvailable={seat.isAvailable}
                            id={seat.id}
                            name={seat.name}
                            _colors={_colors}
                            setIdsOfSeats={setIdsOfSeats}
                            idsOfSeats={idsOfSeats}
                            key={seat.id}
                        />
                    )
                }
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle 
                        color={_colors[1].color} 
                        border={_colors[1].border}
                    />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle
                        color={_colors[0].color} 
                        border={_colors[0].border}
                    />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle 
                        color={_colors[2].color} 
                        border={_colors[2].border}
                    />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                <label>Nome do Comprador:</label>
                <input placeholder="Digite seu nome..." />

                <label>CPF do Comprador:</label>
                <input placeholder="Digite seu CPF..." />

                <button>Reservar Assento(s)</button>
            </FormContainer>

            <Footer />

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => props.border};
    background-color: ${props => props.color};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`