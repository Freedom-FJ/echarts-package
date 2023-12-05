/*
 * @Author: mjh
 * @Date: 2023-08-11 12:16:33
 * @LastEditors: mjh
 * @LastEditTime: 2023-08-15 10:20:14
 * @Description:
 */
import * as echarts from 'echarts/core'
import { GraphicComponent, GridComponent, LegendComponent, PolarComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import { BarChart, BoxplotChart, LineChart, PieChart, RadarChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
    GraphicComponent,
    GridComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    LineChart,
    BarChart,
    PieChart,
    BoxplotChart,
    CanvasRenderer,
    UniversalTransition,
    RadarChart,
    PolarComponent,
])

// 初始化语法糖
const draw = (dom: HTMLElement, option: Record<string, any>) => {
    const chart = echarts.init(dom)
    chart.clear()
    chart.setOption(option)
    return chart
}

export default {
    ...echarts,
    draw
} as any
