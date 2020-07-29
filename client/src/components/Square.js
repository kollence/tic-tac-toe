import React from 'react'
import { Button } from '@material-ui/core'

export const Square = ({value, onClick, canPlay, enable, colorFields}) => {

    const select = !value && enable && canPlay
    const waitYourTurn = select ? '' : 'disabled'
    const clr = colorFields ? "green" : "white"
    return (
        <div className={`square ${waitYourTurn}`} style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
           <Button onClick={onClick} disabled={!select} style={{width: "100%", height: "100%", fontSize: "60px",color: clr}} >{value}</Button>
        </div>
    )
}
