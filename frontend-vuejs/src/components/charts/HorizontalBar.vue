<template>
    <div id="horizontal-bar">
        <canvas ref="horizontalBar"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Chart from 'chart.js';

@Component({
    components: {},
})
export default class HorizontalBar extends Vue {
    @Prop({ default: [] }) readonly labels!: Array<string>
    @Prop({ default: [] }) readonly colors!: Array<string>
    @Prop({ default: [] }) readonly data!: Array<number>

    $refs!: {
        horizontalBar: HTMLCanvasElement
    }

    createChart() {
        console.log('test')
    }
}
</script>

<style scoped>

</style>