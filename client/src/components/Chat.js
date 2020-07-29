import React, { useState } from 'react'
import { TextField, Grid, Button, Paper } from '@material-ui/core'


export const Chat = ({chat, sendedMessage}) => {

    const [message, setMessage] = useState('')
    // const [chatBox, setChatBox] = useState([])
    const chatMessage = (e) => {
        setMessage(e.target.value)
    }
    const sendMessage = () => {
       sendedMessage(message)
       setMessage('')
    }
    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                <Paper style={{height: "70vh", backgroundColor: "darkGray"}}>
                {
                    chat.map(({name, msg}, i) => <div key={i}>{name}: {msg}</div>)
                }
                </Paper>
                </Grid>
                
                <Grid item xs={12}>
                    <Grid container alignItems="center">
                        <Grid item xs={10}>
                            <TextField variant="filled" fullWidth name="message"  value={message} onChange={(e) => chatMessage(e)} />
                        </Grid>
                        <Grid item xs={2}>
                            <Button color="primary" onClick={() => sendMessage()}>send</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            
        </div>
    )
}
