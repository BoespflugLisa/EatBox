<template>
    <div id="client-sidebar" class="d-flex justify-center flex-column pa-5 pt-2">
        <v-btn
            color="tertiary black--text"
            class="pr-10 pl-10"
            to="/"
        >
            Mon profil
        </v-btn>

        <v-btn
            color="tertiary black--text"
            class="pr-10 pl-10 mt-5"
            to="/"
        >
            Historique de mes commandes
        </v-btn>
    </div>
</template>

<script>
export default {
    name: "ClientSidebar"
}
</script>

<style scoped>

</style>