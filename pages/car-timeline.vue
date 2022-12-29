<template>
  <h1>{{ $t('car.carTimeline') }}</h1>
  <div class="mt-6">
    <apexchart
      ref="timelineChart"
      type="rangeBar"
      height="250"
      :options="chartOptions"
      :series="toRaw(chartData)"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import * as dayjs from 'dayjs'
import { carData } from '../initial-data'

export default {
  name: 'CarTimeline',
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      chartData: [],
      chartOptions: {}
    }
  },
  mounted() {
    this.setupChartData(carData)
  },
  methods: {
    setupChartData(carData) {
      // trace data
      let tracesDataArr = []
      carData.traces.forEach((trace) => {
        let traceObj = {
          x: this.$t('car.traces'),
          y: [
            new Date(trace.start).getTime(),
            new Date(trace.end).getTime()
          ],
          id: trace.id,
          name: trace.name
        }
        tracesDataArr.push(traceObj)
      })

      // error memory
      let errorMemoryArr = []
      carData.errorMemories.forEach((errorMem) => {
        let errorMemObj = {
          x: this.$t('car.errorMemories'),
          y: [
            new Date(errorMem.start).getTime(),
            new Date(errorMem.end).getTime()
          ],
          id: errorMem.id,
          name: errorMem.name
        }
        errorMemoryArr.push(errorMemObj)
      })

      // metadata
      let metadataArr = []
      carData.metadata.forEach((data) => {
        let metadataObj = {
          x: this.$t('car.metadata'),
          y: [
            new Date(data.pointInTime).getTime(),
            new Date(data.pointInTime).getTime()
          ],
          id: data.id,
          name: data.name
        }
        metadataArr.push(metadataObj)
      })

      this.chartData = [
        {
          name: 'Traces',
          data: tracesDataArr
        },
        {
          name: 'Error Memory',
          data: errorMemoryArr
        },
        {
          name: 'Metadata',
          data: metadataArr
        },
      ]
      this.updateChartOptions();
    },
    updateChartOptions() {
      this.chartOptions = {
        chart: {
          // height: 250,
          type: 'rangeBar',
        },
        colors:['rgb(255,0,0)', 'rgb(51,102,255)', 'rgb(255,204,0)'],
        tooltip: {
          enabled: true,
          custom: ({seriesIndex, dataPointIndex, w}) => {
            let data = w.globals.initialSeries[seriesIndex].data[dataPointIndex]
            return this.renderTooltipsBasedOnDataType(data)
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '10%'
          }
        },
        yaxis: {
          show: false,
        },
        xaxis: {
          type: 'datetime',
          tickAmount: 10,
          tickPlacement: 'between',
          labels: {
            format: 'yyyy-MM-dd'
          },
        },
        stroke: {
          width: 10
        },
        fill: {
          type: 'solid',
          opacity: 0.6
        },
        legend: {
          position: 'top',
          horizontalAlign: 'center'
        }
      }
    },
    renderTooltipsBasedOnDataType(data) {
      switch (data.x) {
        case 'Traces':
        case 'Error Memories':
          return `
            <div class="text-center px-2">
              <div class="font-weight-bold">${data.id}: ${data.name} </div>
              <div>${ this.$t('general.start') }: ${this.formatDate(data.y[0])}</div>
              <div>${ this.$t('general.end') }: ${this.formatDate(data.y[1])}</div>
            </div>
          `
        case 'Metadata':
          return `
            <div class="text-center px-1">
              <div class="font-weight-bold">${data.id}: ${data.name} </div>
              <div>${ this.$t('general.uploadedOn') }: ${this.formatDate(data.y[0])}</div>
            </div>
          `
      }
    },
    formatDate(date) {
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
    },
  }
}
</script>
