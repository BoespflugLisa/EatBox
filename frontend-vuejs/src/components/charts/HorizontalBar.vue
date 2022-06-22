<template>
    <div id="horizontal-bar">
        <canvas ref="horizontalBar"/>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Chart from 'chart.js/auto';

@Component({
    components: {},
})
export default class HorizontalBar extends Vue {
    @Prop({default: []}) readonly labels!: Array<string>
    @Prop({default: []}) readonly backgroundColor!: Array<string>
    @Prop({default: []}) readonly borderColor!: Array<string>
    @Prop({default: []}) readonly data!: Array<number>

    $refs!: {
        horizontalBar: HTMLCanvasElement
    }

    mounted() {
        this.createChart()
    }

    createChart() {
        new Chart(this.$refs.horizontalBar, {
            type: 'bar',
            data: {
                datasets: [
                    {
                        data: this.data,
                        backgroundColor: this.backgroundColor,
                        borderColor: this.borderColor,
                        borderWidth: 1
                    }
                ],
                labels: this.labels
            },
            options: {
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        })
    }
}
</script>

<style scoped>

</style>