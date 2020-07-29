const games = []

const CreateGame = (id, player1, player2) => {
    const newgame = {
        id,
        player1,
        player2,
        turn: player1,
        fields: Array(9).fill(null),
        status: 'waiting',
        winner: null
    }
    games.push(newgame)
    return newgame
}

const GetGame = (id) => games.find((game) => game.id == id)

const UpdateGame = (game) => { 
    const i = games.findIndex((gameId) => gameId.id == game.id)
    if(i !== -1) {
        games[i] = game
    }
}

module.exports = { CreateGame, GetGame, UpdateGame }