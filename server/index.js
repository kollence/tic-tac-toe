const HTTP = require('http')
const SERVER = HTTP.createServer()
const io = require('socket.io')(SERVER)

const PORT = process.env.PORT || 7000

const { keyGenerator, winnerIs } = require("./conf")
const { CreateGame, GetGame, UpdateGame } = require("./data/game")
const { CreatePlayer, GetPlayer, RemovePlayer } = require("./data/players")

io.on("connect", (socket) => {
    //ON DISCONNECT
    socket.on('disconnect', () => {
       const player = GetPlayer(socket.id) //console.log('disconnected');
       if(player) {
           RemovePlayer(player.id)
       }
    })
    //USER CREATING GAME
    socket.on('Create', ({ user }) => {
        const gameID = `${keyGenerator()}`
        const player = CreatePlayer(socket.id, gameID, user, 'X') //console.log(player)
        const game = CreateGame(gameID, player.id, null) //console.log(game)
        
    //USER JOING TO CREATED GAME
    socket.join(gameID)
    socket.emit('CreatedGame', { player })
    socket.emit('UpdateGame', { game })

    // socket.emit('info', {message: `Game is created. Give this id: ${gameID} to player so he could join the game`,})
    socket.emit('info', {message: "Waiting for opponent to enter id: "+ gameID })
    })

    socket.on('Join', ({ user, gameID }) => {
        //Check gameID, players
        const game = GetGame(gameID)
        if (!game) {
            socket.emit('info', {message: `Wrong game ID`})
            return
        }
        if (game.player2) {
            socket.emit('info', {message: "Game is already full"})
            return
        }
        // //Create player
        const player = CreatePlayer(socket.id, gameID, user, "O")
        // //Update game and send info
        game.player2 = player.id
        game.status = 'playing'
        UpdateGame(game)

        socket.join(gameID)
        socket.emit('CreatedGame', { player })
        socket.emit('UpdateGame', { game })

        socket.broadcast.emit('UpdateGame', { game })
        socket.broadcast.emit('info', { message: `${user} has join the game` })
        

    })
    socket.on('fieldClicked', (data) => {
        const {player, field, gameID} = data
        //GET GAME
        const game = GetGame(gameID)
        //UPDATE BOARD
        const { fields = [], turn, player1, player2 } = game
        fields[field] = player.icon
        //UPDATE PLAYER TURN
        const nextPlayer = turn === player1 ? player2 : player1
        //UPDATE GAME OBJECT
        game.turn = nextPlayer
        game.fields = fields
        UpdateGame(game)
        //BODCAST UPDATED GAME TO EVERYONE
        io.in(gameID).emit('UpdateGame', {game})
        //CHECK STATUS - win or lose
        const gameWon = winnerIs(fields)
        if (gameWon) {
            const winnerOfGame = {...gameWon, player}
            game.status = "GameOver"
            io.in(gameID).emit('UpdateGame', {game})
            io.in(gameID).emit('TheEnd', {winnerOfGame})
            return
        }
        //CHECK STATU draw
        const emptyField = fields.findIndex((item) => item === null)
        if (emptyField == -1) {
            game.status = "GameOver"
            io.in(gameID).emit('UpdateGame', {game})
            io.in(gameID).emit('TheEnd', {winnerOfGame: null})
            
        }
    })
    socket.on('chat', ({name, msg}) => {
        io.emit('chat', {name, msg})
    })
})

SERVER.listen(PORT, () => {
    console.log("Test port: " + PORT)
})