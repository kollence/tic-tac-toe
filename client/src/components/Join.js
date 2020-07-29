import React, { useState } from 'react'
import { Grid, TextField, Button } from '@material-ui/core'

export const Join = ({ submitGame }) => {

    const [user, setUser] = useState('')
    const [gameID, setGameID] = useState('')

    const usr = () => {
        let val =  user
        if(val !== ''){
            submitGame(val.trim(), gameID )
        }

    }

    return (
        <Grid container spacing={1} alignItems="center">
            <Grid item>
                <TextField id="user-name" onChange={(e) => setUser(e.target.value)} variant="outlined" label="enter your name" required />
            </Grid>
            <Grid item>
                <TextField id="game-id" onChange={(e) => setGameID(e.target.value)} variant="outlined" label="enter game ID" required/>
            </Grid>
            <Grid item>
                <Button onClick={() => usr()} variant="contained" color="primary">join to game</Button>
            </Grid>
        </Grid>
    )
}
