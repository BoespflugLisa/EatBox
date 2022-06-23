<template>
    <div class="side-padding">


        <v-card
          class="mx-auto mt-3"
          max-width="470"
          outlined
        >
            <v-list-item three-line>
                <v-list-item-content>
                    <div class="text-overline mb-1">
                        Etat de la commande
                    </div>
                    <v-list-item-title class="text-h5 mb-1">
                        {{this.commandState}}
                    </v-list-item-title>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="100"
                  color="grey">
                    <v-img
                      src="../assets/img/sacrifice.gif">
                    </v-img>
                </v-list-item-avatar>
            </v-list-item>

        </v-card>



        <h3 class="align-center d-flex justify-center mt-5"> QR code de la commande </h3>
        <div class="align-center d-flex justify-center">
            <vue-qr :text=this.token :callback="test" qid="testid"></vue-qr>
        </div>

    </div>
</template>

<script>
import VueQr from 'vue-qr';

export default {




    components: {
        VueQr
    },

    data() {
        return {
            token: "string",
            src: '',
            commandState: '',
            states:[ 'En attente de validation','En préparation','En attente du livreur','En livraison','Livré']

        }

    },

    methods: {
        test(dataUrl, id) {
            console.log(this.token, id)
        },


    },

    mounted(){
        this.$axios.get(`orders/62b42f825b8ad063a37b74d9`)
          .then(response => {
              console.log(response.data)
              this.commandState =this.states[response.data.data.State]
          })

    }

}
</script>

<style scoped>

</style>