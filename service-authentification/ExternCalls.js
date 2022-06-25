const axios = require('axios');
const mongoose = require("mongoose");
const UserModel = require('./models/User').model

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
        let res;
        let stats;
        try {
            res = await axios({
                url: `${REST_ENDPOINT}/${chemin}/${newUser._id}`,
                method: 'POST',
                data: newUser
            })

            console.log(res.data.restaurant);
            stats = await axios({
                url: `${REST_ENDPOINT}/stats/${res.data.restaurant._id}`,
                method: 'POST'
            })

            await UserModel.findByIdAndUpdate(newUser._id, {restaurant: new mongoose.Types.ObjectId(res.data.restaurant._id)})
            resolve()
        } catch (err) {
            console.error('Erreur lors de l\'inscription du restaurant: ', err)
            reject()
            return err
            //throw "Erreur lors de l'inscription du restaurant"
        }
        /*try {
            stats = await axios({
                url: `${REST_ENDPOINT}/stats/${res._id}`,
                method: 'POST'
            })
        } catch (err) {
            console.error('Erreur lors de la création des stats: ', err)
            reject()
        }*/

    })
}

module.exports = {createProfile}