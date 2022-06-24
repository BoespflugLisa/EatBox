<template>
    <div class="mt-5 side-padding ">
        <p class="decode-result">Dernier résultat : <b>{{ result }}</b></p>


        <qrcode-stream class=" mt-5" :camera="camera" @decode="onDecode" @init="onInit">
            <div  v-show="showScanConfirmation" class="scan-confirmation align-center">
                <img src="../assets/img/coche.png" alt="Checkmark"  width="128px" height="128px"/>
            </div>
        </qrcode-stream>

        <h2 class="mt-5 align-center text-center">Scanez le code de votre livreur</h2>
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


    camera = 'auto'

    result = null

    showScanConfirmation = false

    async onInit(promise) {
        try {
            await promise
        } catch (e) {
            console.error(e)
        } finally {
            this.showScanConfirmation = this.camera === "off"
        }
    }

    async onDecode(content) {
        this.result = content

        this.pause()
        await this.timeout(500)
        this.unpause()
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