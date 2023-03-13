import { useState } from "react"

import { SeatItem } from "./style"

export default function SeatsButton({isAvailable, id, name, _colors, setIdsOfSeats, idsOfSeats, setNameOfSeats, namesOfSeats}) {

    const [isSelected, setIsSelected] = useState(false)

    function whichColor() {
        if ( isSelected === true ) {
            return _colors[1]
        }

        if ( isAvailable === true ) {
            return _colors[2]

        }else if (isAvailable === false) {
            return _colors[0]
        }
    }

    function toCheckArrayIdsAndToReplace() {
        if ( idsOfSeats.includes(id) === false ) {
            setIdsOfSeats([...idsOfSeats, id])

        }else {
            const newArray = idsOfSeats.filter(index => index != id)
            setIdsOfSeats(newArray)
        }
    }

    function toCheckArrayNameAndToReplace() {
        if ( namesOfSeats.includes(name) === false ) {
            setNameOfSeats([...namesOfSeats, name])

        } else {
            const newArray = namesOfSeats.filter(index => index != name)
            setNameOfSeats(newArray)
        }
    }

    function clickButton() {
        toCheckArrayIdsAndToReplace()
        toCheckArrayNameAndToReplace()
        setIsSelected(!isSelected)
    }

    return (
        <>
            <SeatItem 
                disabled={isAvailable} 
                _color={whichColor()}
                onClick={clickButton}
            >
                {name}
            </SeatItem>
        </>
    )
}