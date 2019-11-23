import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
// 导入语言包汉化时间
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

// 获取相对时间的方法
export const fmtDate = (value) => {
    // dayjs() 获取当前时间 dayjs中一个特殊的对象
    // dayjs(value)指定的时间 dayjs中一个特殊的对象
    return dayjs().from(dayjs(value))
}
