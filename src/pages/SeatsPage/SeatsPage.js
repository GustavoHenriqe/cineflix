import axios from "axios"
import { API_CINEFLIX } from "../../constants/API"

import { useEffect, useState } from "react"

import { 
    PageContainer, 
    SeatsContainer, 
    CaptionItem, 
    CaptionContainer, 
    CaptionCircle, 
    FormContainer
} from "./style"

import { useParams, useNavigate } from "react-router-dom"

import Footer from "../../components/Footer/Footer"
import SeatsButton from "./SeatsButton.js/SeatsButton"

export default function SeatsPage({setSucessResponse}) {
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
    const navigate = useNavigate()

    const [namesOfSeats, setNameOfSeats] = useState([])
    const [idsOfSeats, setIdsOfSeats] = useState([])
    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")

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

    function nameInput(event) {
        setName(event.target.value)
    }

    function cpfInput(event) {
        setCpf(event.target.value)
    }

    function sendToChechFormAndSend(event){
        event.preventDefault()

        if ( name !== "" || cpf !== "" || idsOfSeats.length !== 0 ) {

            const objectForm = { ids: idsOfSeats, name: name, cpf: cpf }
            const requestFormAPI = axios.post(API_CINEFLIX + "cineflex/seats/book-many", objectForm)

            requestFormAPI.then(
                res => {
                    setSucessResponse({
                        title: seats.movie.title,
                        date: seats.day.date,
                        hour: seats.name,
                        seats: namesOfSeats,
                        cpf: cpf,
                        name: name
                    })
                    navigate("/sucesso")
                }
            )
            
            requestFormAPI.catch(
                res => alert(res)
            )
        }
        
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
                            namesOfSeats={namesOfSeats}
                            setNameOfSeats={setNameOfSeats}
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
                <input 
                    type="text" 
                    placeholder="Digite seu nome..."
                    value={name}
                    onChange={(event) => nameInput(event)}
                    required 
                />

                <label>CPF do Comprador:</label>
                <input 
                    type="text" 
                    placeholder="Digite seu CPF..."
                    onChange={(event) => cpfInput(event)}
                    value={cpf}
                    maxLength={11}
                />

                <button 
                    type="submit"
                    onClick={sendToChechFormAndSend}
                >Reservar Assento(s)</button>
            </FormContainer>

            <Footer />
            
        </PageContainer>
    )
}