import React, { useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Create } from './Create'
import { Join } from "./Join";
import { GameCreated } from "./GameCreated";

export const Main = () => {

    const [game, setGame] = useState(false)
    const [user, setUser] = useState('')
    const [gameID, setGameID] = useState()
    const submitGame = (user, gameID = '') => {
        // console.log("user name " + user + " on id " + gameID)
        setGame(true)
        setUser(user)
        setGameID(gameID)
    }

    return (
        <Grid container className="main-con" alignItems="center" justify="center" style={{padding: "0px"}}>
            <Grid item xs={12} style={{textAlign: "center"}}>
                <Typography variant="h3" color="initial">Tic Tac Toe</Typography>
            </Grid>
            {!game ?
            (<div>
            <Grid item xs={12}>
                <Create submitGame={submitGame} />
            </Grid>
            <Grid item xs={12}> <p>Or</p></Grid>
            <Grid item xs={12}>
                <Join submitGame={submitGame} />
            </Grid>
            </div>)
            :
            (<>
            {/* <Grid item xs={3} sm={3}>
                chat
            </Grid> */}
            <Grid className="main-itm" item xs={12} style={{padding: "0px"}}>
                <GameCreated gameID={gameID} user={user}  style={{padding: "0px"}}/>
            </Grid>
            {/* <Grid item xs={3} sm={3}>
                score
            </Grid> */}
            </>)}
        </Grid>
    )
}
