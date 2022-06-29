<template>
    <div id="deliveryman-sidebar" class="d-flex justify-center flex-column pa-5 pt-2">
        <v-btn
            color="tertiary black--text"
            class="pr-10 pl-10"
            to="/MonProfil"
        >
            Mon profil
        </v-btn>

        <v-btn
            color="tertiary black--text"
            class="pr-10 pl-10 mt-5"
            to="/"
        >
            Commande en cours
        </v-btn>

        <v-btn
            color="tertiary black--text"
            class="pr-10 pl-10 mt-5"
            to="/"
        >
            Commande disponible
        </v-btn>
    </div>
</template>

<script>
export default {
    name: "DeliverymanSidebar"
}
</script>

<style scoped>

</style>