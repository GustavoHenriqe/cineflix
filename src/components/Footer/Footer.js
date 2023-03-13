import { useState } from "react"
import {  FooterContainer } from "../Footer/style"

export default function Footer() {
    const [image, setImage] = useState("")
    const [title, setTitle] = useState("")
    const [dateSession, setDateSession] = useState("")

    return (
        <FooterContainer>
            <div>
                <img src={image} alt={title} />
            </div>
            <div>
                <p>{title}</p>
                <p>{dateSession}</p>
            </div>
        </FooterContainer>
    )
}

