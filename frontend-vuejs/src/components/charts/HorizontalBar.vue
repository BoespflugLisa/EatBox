<template>
    <div>
        <canvas :id="`horizontal-bar${this.id}`" ref="horizontalBar"/>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Chart from 'chart.js/auto';

@Component({
    components: {},
})
export default class HorizontalBar extends Vue {
    @Prop({default: []}) labels!: Array<string>
    @Prop({default: []}) backgroundColor!: Array<string>
    @Prop({default: []}) borderColor!: Array<string>
    @Prop({default: []}) data!: Array<number>
    @Prop({default: []}) readonly id!: number

    chart: Chart|null = null



    $refs!: {
        horizontalBar: HTMLCanvasElement
    }

    mounted() {
        //this.createChart()
        this.updateChart()
    }

    updateChart() {
        this.chart?.update()
    }

    createChart() {
        this.chart = new Chart(this.$refs.horizontalBar, {
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
        this.chart?.update()
    }
}
</script>

<style scoped>

</style>