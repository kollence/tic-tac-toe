const players = []

const CreatePlayer = (id, gameID, name, icon) => {
   const player = {
       id,
       name,
       icon,
       gameID
   }
   players.push(player)
   return player
}

const GetPlayer = id => players.find(player => player.id == id)

const RemovePlayer = id => {
    const i = players.findIndex(player => player.id == id)
    if(i !== -1){
        // console.log(players)
        players.splice(i, 1)
    }
}

module.exports = { CreatePlayer, GetPlayer, RemovePlayer }