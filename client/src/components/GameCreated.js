import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { GameBoard } from './GameBoard'
import { Grid, Container } from '@material-ui/core'
import { Chat } from "./Chat"
import { Score } from "./Score";

let socket

export const GameCreated = ({gameID, user}) => {

    const URL_SERVER = 'http://localhost:7000'

    const [player, setPlayer] = useState({})
    const [game, setGame] = useState({})
    const [notification, setNotification] = useState([])
    const [winner, setWinner] = useState(null)
    const [chat, setChat] = useState([])
    

    useEffect(() => {
        const event = gameID ? "Join" : "Create"
        socket = new io(URL_SERVER)
        socket.emit(event, {user, gameID})
        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    },[URL_SERVER, gameID, user])

    useEffect(() => {
        socket.on("CreatedGame", data => {
            // console.log('JoinToGame ',data );
            const { player } = data
            setPlayer(player)
        })
        socket.on("UpdateGame", data => {
            // console.log('UpdateGame ',data );
            const { game } = data
            setGame(game)
        })
        socket.on('TheEnd', data => {
            const { winnerOfGame } = data
            setWinner(winnerOfGame)
        })
        
    })
    useEffect(() => {
        socket.on('chat', ({name, msg}) => {
            setChat([...chat, {name, msg}])
            // console.log(name, msg)
        })
    })
    useEffect(() => {
        socket.on('info', (data) => {
            // console.log(data)
            const { message = '' } = data
            notification.push(message)
            setNotification([...notification])
        })
    }, [notification])

    const onFieldClicked = (val) => {
        socket.emit('fieldClicked', {
            field: val,
            player,
            gameID: game.id
        })
    }
    const sendedMessage = (e) => {

    const body = {
        name: player.name,
        msg: e
    }
    console.log(body);
    socket.emit('chat', body)
        
    }
    const onMove =  game.turn === player.id ? (<span style={{color: "green"}}>You are on move</span>) : (<span style={{color: "red"}}>Waiting for opponent move</span>)
    const showMessage = <><span>{!game.player2 && (<strong>Game ID: {game.id}</strong>)}</span> <span>{game.status === 'playing' && onMove}</span></>
    const resultMessage = () => winner.player.id === player.id ? <span style={{color: "green"}}>You Win !</span> : <span style={{color: "red"}}>You Lose</span>
    const TheEndMessage = winner ? resultMessage() : <span style={{color: "orange"}}>Draw</span>
    return (
        <Container  fixed  style={{padding: "0px"}}>
        <Grid container className="con1" spacing={3}>
            <Grid item xs={12} sm={4}>
                <Chat chat={chat} sendedMessage={sendedMessage} />
            </Grid>
            <Grid item xs={12} sm={4}>
                
                    {player && (<h4>Welcome {player.name}. Your symbol is {player.icon}</h4>)}
                    {game.status === "GameOver" ? TheEndMessage : showMessage}
                    <hr />
                    <GameBoard player={ player } game={ game } onFieldClicked={onFieldClicked} colorWonCombination={winner} />
                    <br />
                    {notification.map((msg, i) => (<p key={i}>{msg}</p>))}
                
            </Grid>
            <Grid item xs={12} sm={4}>
                <Score />
            </Grid>

        </Grid>
        </Container>
    )
}
