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
            console.log("response ", res.data)
            resolve()
        } catch (err) {
            console.error('Erreur lors de l\'inscription: ', err)
            reject()
            throw err
        }
    })
}

module.exports = {createProfile}