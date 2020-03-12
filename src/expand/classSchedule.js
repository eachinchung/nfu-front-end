import scheduleBackground from "@/assets/json/scheduleBackground"

// 计算当前是第几周
export function handleWeek(timestamp) {
  const timestampInterval = new Date().getTime() - timestamp
  if (timestampInterval < 0) return 0

  const week = timestampInterval / 604800000
  if (week > 19) return 19
  return ~~week
}


export function classCalendar(timestamp) {
  const schoolOpens = new Date(timestamp)
  const year = schoolOpens.getFullYear()
  const month = schoolOpens.getMonth()
  const calendar = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]

  let day = schoolOpens.getDate()

  for (let i = 0; i < 20; i++) for (let j = 0; j < 7; j++) calendar[i][j] = new Date(year, month, day++)
  return calendar
}

// 课程数据写入缓存
export function cachingClassSchedule(classList) {
  let myClassList = {}
  const classScheduleList = classScheduleModels()
  const weekdayModels = [1, 2, 3, 4, 5, 6, 0]

  // 课程按照上课时间的先后排序
  classList.message.sort((a, b) => a.startNode - b.startNode)

  for (const item of classList.message) {
    myClassList[item.courseName] = item.credit
    for (let i = item.startWeek; i <= item.endWeek; i++) {
      item.background = scheduleBackground[Math.floor(Math.random() * scheduleBackground.length)]
      classScheduleList[i][weekdayModels[item.weekday]].push(item)
    }
  }

  // 写入缓存
  localStorage.setItem("classScheduleVersion", classList.version)
  localStorage.setItem("classList", JSON.stringify(myClassList))
  localStorage.setItem("classSchedule", JSON.stringify(classScheduleList))

  return classScheduleList
}

// 生成课表模型
function classScheduleModels() {
  const models = []
  for (let i = 0; i < 20; i++) models[i] = [[], [], [], [], [], [], []]
  return models
}