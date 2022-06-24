

<template>

    <div class="side-padding">
        <DashboardRestaurant v-if="this.role==='Restaurant'" />
    </div>


</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import DashboardRestaurant from "./Restaurateur/DashboardRestaurant.vue";

@Component({
    components: {DashboardRestaurant},
})

export default class DashBoard extends Vue {

    restaurantName = null
    nbCommandes = null
    moyenneNote = null
    recetteDuMois = null

    mounted() {
        this.$axios.get(`stats/62b04dcfff5bc1bbf9802446`)
            .then(response => {
                this.restaurantName = response.data.stat.belongs_to.Name;
                this.nbCommandes = response.data.stat.NbOrders;
                this.moyenneNote = response.data.stat.MeanNotes;
                this.recetteDuMois = response.data.stat.Benefit;
            })
    }


    nFormatter(num, digits) {
        let si = [
            {value: 1, symbol: ""},
            {value: 1E3, symbol: "k"},
            {value: 1E6, symbol: "M"},
            {value: 1E9, symbol: "G"},
            {value: 1E12, symbol: "T"},
            {value: 1E15, symbol: "P"},
            {value: 1E18, symbol: "E"}
        ];
        let rx = /\.0+$|(\.\d*[1-9])0+$/;
        let i;
        for (i = si.length - 1; i > 0; i--) {
            if (num >= si[i].value) {
                break;
            }
        }
        return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
    }


    role = this.$store.state.UserRole
}
</script>

