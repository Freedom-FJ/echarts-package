import { ref } from 'vue'
/**
 * echarts样式
 */
export const useThemeValue = (styleVariables: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(styleVariables)
}

export function replaceVarStrings(obj: Record<string, any>) {
  const newObj: Record<string, any> = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
      if (typeof obj[key] === 'object') {
          newObj[key] = replaceVarStrings(obj[key]) // 递归处理子对象
      }
      else if (typeof obj[key] === 'string' && obj[key].startsWith('var(') && obj[key].endsWith(')')) {
          const varContent = obj[key].slice(4, -1) // 提取括号内的内容
          newObj[key] = useThemeValue(varContent) // 替换为括号内的内容
      }
      else {
          newObj[key] = obj[key] // 其他情况直接复制值
      }
  }

  return newObj
}

/**
 * @name: 判断当前主题hook
 * @desc:
 * @return {*}
 */
export const useTheme = () => {
  const htmlDom = document.querySelector('html')
  if (!htmlDom) return { isDark: ref(false) }
  const isDark = ref(!!htmlDom.classList.contains('dark'))

  // 创建 MutationObserver 实例
  const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
              const currentClass = (mutation.target as any).className
              isDark.value = currentClass.includes('dark')
          }
      }
  })

  // 配置 MutationObserver 监听的选项
  const observerOptions = {
      attributes: true,
      attributeFilter: ['class'],
  }

  // 开始监听目标节点
  observer.observe(htmlDom, observerOptions)

  return {
      isDark
  }
}

