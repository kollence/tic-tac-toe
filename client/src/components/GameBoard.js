import React from 'react'
// import { Grid } from '@material-ui/core'
// import { Box } from "./Box";
import { Square } from './Square';

export const GameBoard = ({game, player,  onFieldClicked, colorWonCombination}) => {

    const { fields = [], status = 'waiting' } = game
    const enable = status === 'playing'
    const canPlay = player.id === game.turn
    // console.log(enable,canPlay);
    const { winningFields = [] } = colorWonCombination || {}

    return (
                <div className="board">
                {fields.map((item, i) => {
                    const colorFields = winningFields.includes(i) 
                    return (
                    <Square 
                        key={i} 
                        value={item}
                        onClick={()=> onFieldClicked(i)}
                        enable={enable}
                        canPlay={canPlay}
                        colorFields={colorFields} 

                    />
                )})}
                </div>
    )
}
