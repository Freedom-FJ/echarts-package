<template>
    <div ref="domBox" :style="{ width, height }">
        <div ref="domRef" :style="{ width, height }" />
    </div>
</template>

<script lang="ts" setup>
import { watch, ref, onMounted, onUnmounted, nextTick } from 'vue'
import type { ECharts } from 'echarts'
import { replaceVarStrings, useTheme } from './utils'
import echarts from './index'
const props = defineProps({
    width: {
        type: String,
        default: '100%',
    },
    height: {
        type: String,
        default: '100%',
    },
    lazy: {
        type: Boolean,
        default: false,
    },
    options: {
        type: Object,
        default: null,
    },
})
const { isDark } = useTheme()

const domRef = ref(null)
const domBox = ref(null)
let chartObj: null | ECharts = null
let observer: null | MutationObserver = null // dom 监听

onMounted(() => {
    if (!domRef.value) return
    init()
    if(props.lazy) return
    drawOption()
    observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList)
            if (mutation.target === domBox.value) resize()
    })
    nextTick(() => {
        domBox.value && (observer as MutationObserver).observe(domBox.value, {
            attributes: true,
            childList: false,
            characterData: true,
            subtree: true
        })
    })
})

onUnmounted(() => {
    if (chartObj) {
        chartObj.dispose()
        chartObj = null
    }
    observer?.disconnect()
})

watch(() => props.options, () => !props.lazy && drawOption())
watch(() => isDark.value, () => !props.lazy && drawOption())

// 绘制方法
const drawOption = (options = props.options) => {
    if(!chartObj) return
    if(!options) {
        chartObj.clear()
        chartObj.showLoading({
            text: '',
            color: '#409eff',
            textColor: '#000',
            maskColor: 'rgba(255, 255, 255, .95)',
            zlevel: 0,
            lineWidth: 2,
        })
    }
    else {
        chartObj.hideLoading()
        chartObj.setOption(replaceVarStrings(options))
    }
}

// 初始化
const init = () => {
    chartObj = (echarts.init(domRef.value) as any)
}

// 重绘 自适应尺寸
const resize = () => {
    chartObj?.resize()
}

defineExpose({
    drawOption,
    resize,
    init
})
</script>
