<template>
    <div>
        <div id="openToWork" class="mx-auto mt-10 ">

        </div>
        <div class="d-flex justify-center  mt-5">
            <v-btn
              elevation="2"
              outlined
              x-large
              @click="free=true"
              class="ma-auto align-content-center align-self text-center">
                Open to work
            </v-btn>
        </div>

    </div>
</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})

export default class OpenToWork extends Vue {
    free = false
}
</script>

<style scoped>

#openToWork {
    background-image: url("../assets/img/undraw_on_the_way_re_swjt.svg");
    background-position: center;
    background-size: contain;
    width: 300px;
    height: 300px;
}

</style>