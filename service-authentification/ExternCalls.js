const axios = require('axios');

const REST_ENDPOINT = 'http://localhost:3031'

function createProfile(newUser) {
    let chemin = ""
    switch (newUser.Role) {
        case "Restaurant":
            chemin = "restaurants"
            break;

        case "Client":
            chemin = "clients"
            break;

        case "Livreur":
            chemin = "deliverymans"
            break;
    }

    return new Promise(async (resolve, reject) => {
        try {
            let res = await axios({
                url: `${REST_ENDPOINT}/${chemin}/${newUser._id}`,
                method: 'POST',
                data: newUser
            })
        } catch (err) {
            console.error('Erreur lors de l\'inscription du restaurant: ', err)
            reject()
        }
        try {
            let stats = await axios({
                url: `${REST_ENDPOINT}/stats/${newUser._id}`,
                method: 'POST'
            })
            //console.log("restaurant ", res.data)
            resolve()
        } catch (err) {
            console.error('Erreur lors de la création des stats: ', err)
            reject()
        }
    })
}

module.exports = {createProfile}