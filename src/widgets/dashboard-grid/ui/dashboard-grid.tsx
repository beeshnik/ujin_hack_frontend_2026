import { useEffect, useState } from "react"
import ReactGridLayout, { useContainerWidth } from "react-grid-layout"
import type { Layout } from "react-grid-layout"

import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import "./dashboard-grid.css"
import { Button } from "@/shared/ui/button"
import { ArrowLeft, Save } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useCreateTemplate } from "@/shared/api/generated/templates/templates"

type props = {
  name: string
}

type GridColumns = 3 | 4 | 6

type WidgetType =
  | "header"
  | "footer"
  | "weather"
  | "house-news"
  | "parking"
  | "storage"
  | "external-news"
  | "image"
  | "text"
  | "camera"
  | "promo"

const widgetTypes = [
  { type: "header", title: "Верхний блок", single: true },
  { type: "footer", title: "Нижний блок", single: true },
  { type: "weather", title: "Погода", single: true },
  { type: "house-news", title: "Новости дома", single: true },
  { type: "parking", title: "Парковки", single: true },
  { type: "storage", title: "Кладовые", single: true },
  { type: "external-news", title: "RSS / внешние новости", single: true },
  { type: "image", title: "Картинка", single: false },
  { type: "text", title: "Текст", single: false },
  { type: "camera", title: "Камера", single: false },
  { type: "promo", title: "Объявление / промо", single: false },
] as const

const initialLayout: Layout = []

const compactorMy = {
  type: null,
  allowOverlap: false,
  preventCollision: true,
  compact: (nextLayout: Layout) => nextLayout,
}

export function DashboardGrid({name}: props) {
  const [columns, setColumns] = useState<GridColumns>(3)
  const [layout, setLayout] = useState<Layout>(initialLayout)


  const navigate = useNavigate()

  const {mutate: createTemplate, status: createTemplateStatus} = useCreateTemplate()

  const { width, containerRef, mounted } = useContainerWidth({
    initialWidth: 800,
  })

  useEffect(() => {
    if (createTemplateStatus === "success")
      navigate(-1)
  }, [createTemplateStatus])

  function getWidgetType(id: string): WidgetType {
    const widget = widgetTypes.find((item) => {
      return item.type === id || id.startsWith(`${item.type}-`)
    })

    return widget?.type ?? "text"
  }

  function getWidgetTitle(id: string) {
    const type = getWidgetType(id)
    const widget = widgetTypes.find((item) => item.type === type)

    return widget?.title ?? id
  }

  function getNextId(type: WidgetType) {
    const widget = widgetTypes.find((item) => item.type === type)

    if (widget?.single) {
      return type
    }

    const sameTypeCount = layout.filter((item) => {
      return getWidgetType(item.i) === type
    }).length

    return `${type}-${sameTypeCount + 1}`
  }

  function canAddWidget(type: WidgetType) {
    const widget = widgetTypes.find((item) => item.type === type)

    if (!widget?.single) {
      return true
    }

    return !layout.some((item) => getWidgetType(item.i) === type)
  }

  function isCellBusy(x: number, y: number) {
    return layout.some((item) => {
      return (
        x < item.x + item.w &&
        x + 1 > item.x &&
        y < item.y + item.h &&
        y + 1 > item.y
      )
    })
  }

  function findFreeCell() {
    for (let y = 0; y < 16; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        if (!isCellBusy(x, y)) {
          return { x, y }
        }
      }
    }
    return null
  }

  function handleAddObject(type: WidgetType) {
    if (!canAddWidget(type)) {
      return
    }

    const id = getNextId(type)

    if (type === "header") {
      setLayout([
        ...layout,
        {
          i: id,
          x: 0,
          y: 0,
          w: columns,
          h: 1,
          isDraggable: false,
          isResizable: true,
          resizeHandles: ["s"],
        },
      ])

      return
    }

    if (type === "footer") {
      setLayout([
        ...layout,
        {
          i: id,
          x: 0,
          y: 15,
          w: columns,
          h: 1,
          isDraggable: false,
          isResizable: true,
          resizeHandles: ["n"],
        },
      ])

      return
    }

    const cell = findFreeCell()

    if (!cell) {
      return
    }

    setLayout([
      ...layout,
      {
        i: id,
        x: cell.x,
        y: cell.y,
        w: 1,
        h: 1,
        isResizable: true,
        resizeHandles: ["s", "e", "se"],
      },
    ])
  }

  function handleRemoveObject(id: string) {
    setLayout((currentLayout) => currentLayout.filter((item) => item.i !== id))
  }

  function handleColumnsChange(value: GridColumns) {
    setColumns(value)
    setLayout([])
  }

  const gridJson = {
    columns,
    layout: layout.map((item) => ({
      ...item,
      type: getWidgetType(item.i),
    })),
  }

  const handleBack = () => {
    navigate(-1)
  }

  const handleSave = () => {
    createTemplate({
      data: {
        name: name || "default_name",
        body: gridJson,
      },
    })
  }



  return (
    <div className="dashboard-grid-root">
      <div className="flex flex-row justify-between">
        <Button onClick={handleBack}>
          <ArrowLeft /> Назад
        </Button>
        <Button onClick={handleSave}>
          <Save />
          Сохранить
        </Button>
      </div>
      <div className="dashboard-grid-toolbar">
        <select
          value={columns}
          onChange={(event) => {
            handleColumnsChange(Number(event.target.value) as GridColumns)
          }}
        >
          <option value={3}>3 колонки</option>
          <option value={4}>4 колонки</option>
          <option value={6}>6 колонок</option>
        </select>

        <div className="dashboard-grid-widget-buttons">
          {widgetTypes.map((widget) => (
            <button
              key={widget.type}
              type="button"
              disabled={!canAddWidget(widget.type)}
              onClick={() => handleAddObject(widget.type)}
            >
              {widget.title}
            </button>
          ))}
        </div>
      </div>

      <div ref={containerRef} className="dashboard-grid">
        {mounted && (
          <ReactGridLayout
            layout={layout}
            width={width}
            autoSize={false}
            compactor={compactorMy}
            gridConfig={{
              cols: columns,
              rowHeight: (width * 16) / 9 / 16,
              margin: [0, 0],
              containerPadding: [0, 0],
              maxRows: 16,
            }}
            dragConfig={{
              enabled: true,
            }}
            resizeConfig={{
              enabled: true,
              handles: ["s", "e", "se", "n"],
            }}
            onLayoutChange={(nextLayout) => {
              setLayout(nextLayout)
            }}
          >
            {layout.map((item) => (
              <div key={item.i} className="dashboard-grid__item">
                <button
                  type="button"
                  className="dashboard-grid__remove-button"
                  onMouseDown={(event) => event.stopPropagation()}
                  onClick={() => handleRemoveObject(item.i)}
                >
                  ×
                </button>
                {getWidgetTitle(item.i)}
              </div>
            ))}
          </ReactGridLayout>
        )}
      </div>
      {/* <pre className="dashboard-grid-json">
        {JSON.stringify(gridJson, null, 2)}
      </pre> */}
    </div>
  )
}
