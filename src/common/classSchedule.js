// 计算当前是第几周
import calendarModels from "@/assets/json/calendarModels"
import classScheduleModels from "@/assets/json/classScheduleModels"
import scheduleBackground from "@/assets/json/scheduleBackground"

export function handleWeek(timestamp) {
  const timestampInterval = new Date().getTime() - timestamp
  if (timestampInterval < 0) return 0

  const week = timestampInterval / 604800000
  if (week > 20) return 20
  return ~~week
}

// 课程日历
export function classCalendar(timestamp) {
  const schoolOpens = new Date(timestamp)
  const year = schoolOpens.getFullYear()
  const month = schoolOpens.getMonth()

  let day = schoolOpens.getDate()
  let calendar = calendarModels

  for (let i = 0; i < 20; i++) for (let j = 0; j < 7; j++)
    calendar[i][j] = new Date(year, month, day++)

  return calendar
}

// 课程数据写入缓存
export function cachingClassSchedule(classList) {
  const classSchedule = classScheduleModels
  const weekdayModels = [1, 2, 3, 4, 5, 6, 0]

  // 课程按照上课时间的先后排序
  classList.message.sort((a, b) => a.startNode - b.startNode)

  for (const item of classList.message) for (let i = item.startWeek; i <= item.endWeek; i++) {
    item.background = scheduleBackground[Math.floor(Math.random() * scheduleBackground.length)]
    classSchedule[i][weekdayModels[item.weekday]].push(item)
  }

  // 写入缓存
  localStorage.setItem("classScheduleVersion", classList.version)
  localStorage.setItem("classList", JSON.stringify(classList.message))
  localStorage.setItem("classSchedule", JSON.stringify(classSchedule))

  return classSchedule
}