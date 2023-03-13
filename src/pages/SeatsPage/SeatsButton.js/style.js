import styled from "styled-components"

export const SeatItem = styled.button`
    border: 1px solid ${props => props._color.border};         
    background-color: ${props => props._color.color};
    color: black;
    font-weight: 700;
    height: 30px;
    width: 20px;
    border-radius: 50%;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.5s;
    margin: 5px 3px;
    cursor: pointer;
    &:disabled{
        cursor: auto
    }
`