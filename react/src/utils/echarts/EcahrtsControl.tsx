/*
 * @Author: mjh
 * @Date: 2023-11-25 16:04:13
 * @LastEditors: mjh
 * @LastEditTime: 2023-11-25 23:23:28
 * @Description:
 */
import { useEffect, useRef } from 'react';
import echarts from './index';
import { replaceVarStrings, useTheme } from './utils';
export interface EchartControllerProps {
    width?: string;
    height?: string;
    options?: Record<string, any> | null;
}
export default function EchartController(props: EchartControllerProps) {
    const { height = '100%', width = '100%', options } = props;
    const chartRef = useRef<any>();
    const cInstance = useRef<any>();
    const { isDark } = useTheme();

    useEffect(() => {
        if (!chartRef.current) return;
        if (!cInstance.current) {
            cInstance.current = echarts.init(chartRef.current);
        }
        const observer = new ResizeObserver(() => {
            cInstance.current.resize();
        });
        observer.observe(chartRef.current);
        return () => {
            cInstance.current?.dispose()
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!cInstance.current) return;
        if (!options) {
            cInstance.current.showLoading({
                text: '',
                color: '#409eff',
                textColor: '#000',
                maskColor: 'rgba(255, 255, 255, .95)',
                zlevel: 0,
                lineWidth: 2,
            });
            return;
        }
        cInstance.current.hideLoading();
        cInstance.current.setOption(replaceVarStrings(options));
    }, [options, isDark]);

    return (
      <div ref={chartRef} style={{ height, width }} />
    );
}
