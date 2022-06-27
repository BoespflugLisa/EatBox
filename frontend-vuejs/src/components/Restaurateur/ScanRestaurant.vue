<template>
    <div id="scan-restaurant" class="mt-5 side-padding">
        <h2 class="mt-5 align-center text-center">Scanez le code de votre livreur</h2>
        <qrcode-stream class=" mt-5" :camera="camera" @decode="onDecode" @init="onInit">
            <div v-if="showScanConfirmation === true" class="scan-confirmation align-center">
                <img v-show="showScanConfirmation" src="../../assets/img/coche.png" alt="CheckmarkValidate"
                     width="128px" height="128px"/>
            </div>
<!--            <div v-if="showScanError === true" class="scan-confirmation align-center">
                <img v-show="showScanError" src="../../assets/img/close.png" alt="CheckmarkError" width="128px"
                     height="128px"/>
            </div>-->
        </qrcode-stream>
        <p class="decode-result"><b>{{ result }}</b></p>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {QrcodeStream, QrcodeDropZone, QrcodeCapture} from 'vue-qrcode-reader'

@Component({
    components: {
        QrcodeStream,
    },
})

export default class ScanRestaurant extends Vue {
    name = "ScanRestaurant"


    camera = 'auto'
    result: null | string = null
    showScanConfirmation = false
    showScanError = false
    order = {
        _id: "",
        State: 1,
        Deliveryman_token: "",
        CheckTime: {
            Pickedup_at: Date.now(),
        }
    }

    mounted() {
        this.$emit('ready');
    }

    getOrderToDeliver(orderToDeliver) {
        this.order = orderToDeliver;
    }

    async onInit(promise) {
        try {
            await promise
        } catch (e) {
            console.error(e)
        } finally {
            this.showScanConfirmation = this.camera === "off"
            //this.showScanError = this.camera === "off"
        }
    }

    async onDecode(content) {
        console.log(content)
        this.result = content
        if (this.result === this.order.Deliveryman_token) {
            this.pause()
            await this.timeout(500)
            this.unpause()

            this.order.State = 3;
            this.order.CheckTime.Pickedup_at = Date.now();
            console.log(this.order);
            /*this.$axios.put(`orders/` + this.order._id, {data: this.order}).then(response => {
                response.data;
            })*/

            this.$router.push('/commandes');

        } else {
            this.result = "QrCode incorrect! Réessayez."
            this.pause()
            await this.timeout(500)
            this.unpause()
        }
    }

    unpause() {
        this.camera = 'auto'
    }

    pause() {
        this.camera = 'off'
    }

    timeout(ms) {
        return new Promise(resolve => {
            window.setTimeout(resolve, ms)
        })
    }

    /* scanQrCode(){
         this.$router.push('/ScanRestaurant');
         this.order.State = 3;
         this.order.CheckTime.Pickedup_at = PickedupDate;
         this.$axios.put(`orders/` + this.order._id, {data: this.order}).then(response => {
             response.data;
         })}
 */


}
</script>

<style scoped>
.scan-confirmation {
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: rgba(255, 255, 255, .8);

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
}
</style>