import { PageContainer, TextContainer } from "./style"

import { Link } from "react-router-dom"

export default function SuccessPage({sucessResponse}) {

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{sucessResponse.title}</p>
                <p>{sucessResponse.date} - {sucessResponse.hour}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>
                {sucessResponse.seats.map(seat => 
                        <p key={seat}>Assento {seat}</p>
                    )
                }
            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: {sucessResponse.name}</p>
                <p>CPF: {sucessResponse.cpf}</p>
            </TextContainer>

            <Link to="/" data-test="go-home-btn">
                <button >Voltar para Home</button>
            </Link>
        </PageContainer>
    )
}