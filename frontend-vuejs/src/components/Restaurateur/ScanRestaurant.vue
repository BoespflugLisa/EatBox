<template>
    <div id="scan-restaurant">
        <h2 class="pt-2 align-center text-center">Scanez le code de votre livreur</h2>
        <qrcode-stream class=" mt-5" :camera="camera" @decode="onDecode" @init="onInit">
            <div v-if="showScanError || showScanConfirmation" class="scan-confirmation align-center">
                <div v-if="showScanConfirmation">
                    <img v-show="showScanConfirmation" src="../../assets/img/coche.png" alt="CheckmarkValidate"
                         width="128px" height="128px"/>
                </div>
                <div v-if="showScanError">
                    <img v-show="showScanError" src="../../assets/img/close.png" alt="CheckmarkError" width="128px"
                         height="128px"/>
                </div>
            </div>
        </qrcode-stream>
        <p class="decode-result pt-2 align-center text-center"><b>{{ result }}</b></p>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {QrcodeStream} from 'vue-qrcode-reader'

@Component({
    components: {
        QrcodeStream,
    },
})

export default class ScanRestaurant extends Vue {
    name = "ScanRestaurant"
    camera = 'off'
    result: null | string = null
    showScanConfirmation = false
    showScanError = false
    order = {
        _id: "",
        State: 1,
        Deliveryman_token: "",
        CheckTime: {
            Pickedup_at: Date.now(),
        },
        Client: {
            _id: ""
        }
    }

    mounted() {
        this.$emit('ready');
    }

    getOrderToDeliver(orderToDeliver) {
        this.unpause()
        this.order = orderToDeliver;
    }

    async onInit(promise) {
        try {
            await promise
        } catch (e) {
            console.error(e)
        }
    }

    async onDecode(content) {
        this.result = content
        if (this.result === this.order.Deliveryman_token) {
            this.pause()
            await this.timeout(500)
            this.unpause()

            this.showScanConfirmation = true;

            this.order.State = 3;
            this.order.CheckTime.Pickedup_at = Date.now();
            let access_token = this.$cookies.get('token');
            await this.$axios.put('/orders/'+ this.order._id, {data:this.order}, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                }
            });
            await this.$axios.post("/notifications/" + this.order.Client._id, {
                data: {
                    action: "OrderIsComming",
                    Types: {
                        Command: true,
                        Delivery: false,
                    }
                }
            }, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                }
            })

            await this.timeout(2000);
            await this.$router.push('/commandes');

        } else {
            this.result = "QrCode incorrect! Réessayez."
            this.pause()
            await this.timeout(500)
            this.unpause()
            this.showScanError = true;
            await this.timeout(2000);
            this.showScanError = false;
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
