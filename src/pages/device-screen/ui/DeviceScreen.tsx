import { useEffect, useState } from "react"
import ReactGridLayout, { useContainerWidth } from "react-grid-layout"
import type { Layout } from "react-grid-layout"

import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import "./device-screen.css"
import { useGetDeviceScreen } from "@/shared/api/generated/display-screen/display-screen"
import type { DeviceScreen } from "@/shared/api/generated/model"

// declare global {
//   interface Window {
//     showEmergency?: (text: string) => void
//   }
// }

const compactorMy = {
  type: null,
  allowOverlap: false,
  preventCollision: true,
  compact: (nextLayout: Layout) => nextLayout,
}

function clearHtml(text?: string) {
  return text
    ?.replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .trim()
}

function getWidget(screenState: DeviceScreen | undefined, id: string) {
  return screenState?.rendered_template?.widgets?.find((widget) => {
    return widget.id === id
  })
}

function getActiveEmergency(screenState: DeviceScreen | undefined) {
  const emergencies = screenState?.emergencies ?? []

  if (emergencies.length === 0) {
    return undefined
  }

  return [...emergencies].sort((a, b) => {
    return a.priority - b.priority
  })[0]
}

function getCard(
  id: string,
  screenState: DeviceScreen | undefined,
  time: string,
  date: string,
) {
  const widget = getWidget(screenState, id)
  const data = widget?.body?.data as any
  if (id === "header") {
    return (
      <div>
        <span>{time}</span>
        <span>{date}</span>
        <span>{screenState?.complexName ?? "ЖК не указан"}</span>
        <span>{screenState?.houseName ?? "Дом не указан"}</span>
      </div>
    )
  }

  if (id === "weather") {
    return (
      <div>
        <b>Погода</b>
        <strong>
          {data?.temperature !== undefined
            ? `${Math.round(data.temperature)}°`
            : "—"}
        </strong>
        <p>{data?.city ?? "Город не указан"}</p>
        <p>{data?.weatherType ?? "Нет данных"}</p>
      </div>
    )
  }

  if (id === "parking") {
    const publicFree = data?.publicFreeTotal ?? 0
    const privateFree = data?.privateFreeTotal ?? 0
    const unassignedFree = data?.unassignedFreeTotal ?? 0
    const total = publicFree + privateFree + unassignedFree

    return (
      <div>
        <b>Парковки</b>
        <strong>{total} свободно</strong>
        <p>Гостевые: {publicFree}</p>
        <p>Приватные: {privateFree}</p>
        <p>Нераспределённые: {unassignedFree}</p>
      </div>
    )
  }

  if (id === "storage") {
    const publicFree = data?.publicFreeTotal ?? 0
    const privateFree = data?.privateFreeTotal ?? 0
    const unassignedFree = data?.unassignedFreeTotal ?? 0
    const total = publicFree + privateFree + unassignedFree

    return (
      <div>
        <b>Кладовые</b>
        <strong>{total} свободно</strong>
        <p>Гостевые: {publicFree}</p>
        <p>Приватные: {privateFree}</p>
        <p>Нераспределённые: {unassignedFree}</p>
      </div>
    )
  }

  if (id === "house_news") {
    const news = Array.isArray(data) ? data[0] : undefined

    return (
      <div>
        <b>Новости дома</b>
        <strong>{news?.title ?? "Новостей нет"}</strong>
        <p>{clearHtml(news?.text) ?? "Нет данных"}</p>
        <p>{news?.date ?? ""}</p>
      </div>
    )
  }

  if (id === "camera") {
    return (
      <div>
        <b>Камера</b>
        <div>LIVE</div>
      </div>
    )
  }

  if (id === "info") {
    return (
      <div>
        <b>Информация</b>
        <p>Пожалуйста, соблюдайте чистоту в подъездах и общих зонах.</p>
      </div>
    )
  }

  if (id === "promo") {
    return <div>Промо для жителей ЖК</div>
  }

  if (id === "footer") {
    return (
      <div>
        Аварийная служба: +7 (999) 000-00-00 · Передавайте показания до 25 числа
      </div>
    )
  }

  return (
    <div>
      <b>{id}</b>
      <p>Нет данных для виджета</p>
    </div>
  )
}

export function DeviceScreenPage() {
  //   const [alarmText, setAlarmText] = useState("")
  //   const [isAlarm, setIsAlarm] = useState(false)
  const [now, setNow] = useState(new Date())
  const [screenState, setScreenState] = useState<DeviceScreen>()

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date())
    }, 60000)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  const { width, containerRef, mounted } = useContainerWidth({
    initialWidth: 360,
  })

  const { data: deviceScreenData, status: deviceScreenStatus } =
    useGetDeviceScreen("M8EdMJL9")
  useEffect(() => {
    if (deviceScreenStatus === "success" && deviceScreenData) {
      const rawData = deviceScreenData.data as DeviceScreen
      setScreenState(rawData)
    }
  }, [deviceScreenData, deviceScreenStatus])

  //   console.log(screenState)

  //   useEffect(() => {
  //     let timer: number | undefined

  //     window.showEmergency = (text: string) => {
  //       console.log("ЧС:", text)

  //       setAlarmText(text)
  //       setIsAlarm(true)

  //       if (timer) {
  //         window.clearTimeout(timer)
  //       }

  //       timer = window.setTimeout(() => {
  //         setIsAlarm(false)
  //       }, 60000)
  //     }

  //     // console.log('Вызов ЧС: showEmergency("ВНИМАНИЕ! Проверка системы")')

  //     return () => {
  //       delete window.showEmergency

  //       if (timer) {
  //         window.clearTimeout(timer)
  //       }
  //     }
  //   }, [])

  const time = now.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  })

  const date = now.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    weekday: "long",
  })

  const screenTemplate = screenState?.template as
    | {
        columns?: number
        layout?: Layout
      }
    | undefined

  const currentLayout = screenTemplate?.layout ?? []
  const currentColumns = screenTemplate?.columns ?? 3
  const activeEmergency = getActiveEmergency(screenState)
  const alarmTextFromBack = activeEmergency?.text ?? ""
  //   console.log(screenTemplate?.columns)

  return (
    <div className="tv-screen">
      <div className={activeEmergency ? "alarm alarm-on" : "alarm"}>
        {alarmTextFromBack}
      </div>
      <div ref={containerRef} className="tv-grid">
        {mounted && currentLayout.length > 0 && (
          <ReactGridLayout
            layout={currentLayout}
            width={width}
            autoSize={false}
            compactor={compactorMy}
            gridConfig={{
              cols: currentColumns,
              rowHeight: (width * 16) / 9 / 16,
              margin: [0, 0],
              containerPadding: [0, 0],
              maxRows: 16,
            }}
            dragConfig={{
              enabled: false,
            }}
            resizeConfig={{
              enabled: false,
            }}
          >
            {currentLayout.map((item) => (
              <div key={item.i}>{getCard(item.i, screenState, time, date)}</div>
            ))}
          </ReactGridLayout>
        )}
      </div>
    </div>
  )
}
