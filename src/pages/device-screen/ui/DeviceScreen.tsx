import { useEffect, useState } from "react"
import ReactGridLayout, { useContainerWidth } from "react-grid-layout"
import type { Layout } from "react-grid-layout"

import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import "./device-screen.css"
import { useGetDeviceScreen } from "@/shared/api/generated/display-screen/display-screen"
import type { DeviceScreen } from "@/shared/api/generated/model"

declare global {
  interface Window {
    showEmergency?: (text: string) => void
  }
}

const tvLayout: Layout = [
  { i: "header", x: 0, y: 0, w: 4, h: 1 },
  { i: "weather", x: 0, y: 1, w: 2, h: 2 },
  { i: "parking", x: 2, y: 1, w: 2, h: 3 },
  { i: "news", x: 0, y: 3, w: 2, h: 4 },
  { i: "camera", x: 2, y: 4, w: 2, h: 4 },
  { i: "info", x: 0, y: 7, w: 2, h: 3 },
  { i: "promo", x: 0, y: 10, w: 4, h: 4 },
  { i: "footer", x: 0, y: 14, w: 4, h: 2 },
]

const compactorMy = {
  type: null,
  allowOverlap: false,
  preventCollision: true,
  compact: (nextLayout: Layout) => nextLayout,
}

function getCard(id: string) {
  if (id === "header") {
    return (
      <div>
        <span>09:24</span>
        <span>8 июня</span>
      </div>
    )
  }

  if (id === "weather") {
    return (
      <div>
        <b>Погода</b>
        <strong>+21°</strong>
      </div>
    )
  }

  if (id === "parking") {
    return (
      <div>
        <b>Парковки</b>
        <strong>27 свободно</strong>
        <p>Гостевые: 8</p>
        <p>Приватные: 14</p>
        <p>Нераспределённые: 5</p>
      </div>
    )
  }

  if (id === "news") {
    return (
      <div>
        <b>Новости дома</b>
        <strong>Проверка лифтов</strong>
        <p>9 июня с 10:00 до 14:00 будет проводиться профилактика.</p>
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

  return (
    <div>
      Аварийная служба: +7 (999) 000-00-00 · Передавайте показания до 25 числа
    </div>
  )
}

export function DeviceScreenPage() {
  const [alarmText, setAlarmText] = useState("")
  const [isAlarm, setIsAlarm] = useState(false)

  const { width, containerRef, mounted } = useContainerWidth({
    initialWidth: 360,
  })

  const [screenState, setScreenState] = useState<DeviceScreen>()
  const { data: deviceScreenData, status: deviceScreenStatus } =
    useGetDeviceScreen("0WSO6zel")

  useEffect(() => {
    if (deviceScreenStatus === "success" && deviceScreenData) {
      const rawData = deviceScreenData.data as DeviceScreen
      setScreenState(rawData)
    }
  }, [deviceScreenData, deviceScreenStatus])

//   console.log(screenState)

  useEffect(() => {
    let timer: number | undefined

    window.showEmergency = (text: string) => {
      console.log("ЧС:", text)

      setAlarmText(text)
      setIsAlarm(true)

      if (timer) {
        window.clearTimeout(timer)
      }

      timer = window.setTimeout(() => {
        setIsAlarm(false)
      }, 10000)
    }

    console.log('Вызов ЧС: showEmergency("ВНИМАНИЕ! Проверка системы")')

    return () => {
      delete window.showEmergency

      if (timer) {
        window.clearTimeout(timer)
      }
    }
  }, [])

  return (
    <div className="tv-screen">
      <div className={isAlarm ? "alarm alarm-on" : "alarm"}>{alarmText}</div>
      <div className="tv-main">
        <div ref={containerRef} className="tv-grid">
          {mounted && (
            <ReactGridLayout
              layout={tvLayout}
              width={width}
              autoSize={false}
              compactor={compactorMy}
              gridConfig={{
                cols: 4,
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
              {tvLayout.map((item) => (
                <div key={item.i}>{getCard(item.i)}</div>
              ))}
            </ReactGridLayout>
          )}
        </div>
      </div>
    </div>
  )
}
