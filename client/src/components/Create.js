import React, { useState } from 'react'
import { Grid, TextField, Button } from '@material-ui/core'

export const Create = ({ submitGame }) => {

    const [user, setUser] = useState('')

    const usr = () => {
        let val =  user
        if(val !== ''){
            submitGame(val.trim())
        }

    }

    return (
        <Grid container spacing={1} justify="space-evenly" alignItems="center">
            <Grid item>
                <TextField id="create-game" onChange={(e) => setUser(e.target.value)} variant="outlined" label="enter your name" required/>
            </Grid>
            <Grid item>
                <Button onClick={() => usr()} variant="contained" color="primary">Create Game</Button>
            </Grid>
        </Grid>
    )
}
