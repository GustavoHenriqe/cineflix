import { useState } from "react"
import {  FooterContainer } from "../Footer/style"

export default function Footer({image, title, date, weekday}) {

    return (
        <FooterContainer>
            <div>
                <img src={image} alt={title} />
            </div>
            <div>
                <p>{title}</p>
                <p>{weekday} - {date}</p>
            </div>
        </FooterContainer>
    )
}

