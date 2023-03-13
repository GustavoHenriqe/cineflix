import styled from "styled-components"

import { BrowserRouter, Routes, Route} from "react-router-dom"

import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import Header from "./components/Header/Header"

export default function App() {

    

    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route 
                        path="/" 
                        element={<HomePage />} 
                    />
                    <Route 
                        path="/sessoes/:idFilm" 
                        element={<SessionsPage />} 
                    />
                    <Route 
                        path="/assentos/:idSeats" 
                        element={<SeatsPage />}
                    />
                    <Route
                        path="/sucesso"
                        element={<SuccessPage />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    )
}
