import { Link } from "react-router-dom"

import { NavContainer } from "./style"

export default function Header () {
    return (
        <NavContainer>
            <Link to="/">
                CINEFLEX
            </Link>
        </NavContainer>
    )
}