<template>
    <div id="restaurant-information">
<!--        <div class="d-flex justify-space-around  info-menu">
            <v-btn
                :color="activeBtn === 'info' ? 'secondary ' : 'tertiary'"
                class="ma-2" width="150px"
            >
                Mes infos
            </v-btn>
            <v-btn
                :color="activeBtn === 'preference' ? 'secondary ' : 'tertiary'"
                class="ma-2" width="150px"
            >
                Préférences
            </v-btn>
            <v-btn
                :color="activeBtn === 'sponsorship' ? 'secondary ' : 'tertiary'"
                class="ma-2" width="150px"
            >
                Parrainage
            </v-btn>
        </div>-->

        <v-card>
            <v-tabs
                v-model="tab"
                background-color="deep-purple accent-4"
                fixed-tabs
            >
                <v-tabs-slider></v-tabs-slider>

                <v-tab href="#tab-1">
                    Mes infos
                </v-tab>

                <v-tab href="#tab-2">
                    Préférences
                </v-tab>

                <v-tab href="#tab-3">
                    Parrainage
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
                <v-tab-item
                    v-for="i in 3"
                    :key="i"
                    :value="'tab-' + i"
                >
                    <v-card flat>
                        <v-card-text>{{ text }}</v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>

    </div>
</template>

<script>
export default {
    name: "RestaurantInformation",

    data: function () {
        return {
            activeBtn: 'info',
            tab: null,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }
    },
}
</script>

<style scoped>
@media screen and (min-width: 960px) {
    .info-menu {
        margin-top: 5px;
    }
}
</style>