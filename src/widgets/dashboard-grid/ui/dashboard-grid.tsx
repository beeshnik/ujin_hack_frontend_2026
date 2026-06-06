import { useState } from "react"
import ReactGridLayout, { useContainerWidth } from "react-grid-layout"
import { noCompactor } from "react-grid-layout/core"
import type { Layout } from "react-grid-layout"

import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import "./dashboard-grid.css"

type GridColumns = 3 | 4 | 6

const initialLayout: Layout = []

export function DashboardGrid() {
  const [columns, setColumns] = useState<GridColumns>(3)
  const [layout, setLayout] = useState<Layout>(initialLayout)
  const { width, containerRef, mounted } = useContainerWidth({
    initialWidth: 800,
  })

  function getNextId() {
    const letters = "qwertyuiop".split("")
    const usedIds = new Set(layout.map((item) => item.i))
    return (
      letters.find((letter) => !usedIds.has(letter)) ??
      `item-${layout.length + 1}`
    )
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

  function handleAddObject() {
    const cell = findFreeCell()
    if (!cell) {
      return
    }
    const id = getNextId()
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

  function handleColumnsChange(value: GridColumns) {
    setColumns(value)
    setLayout([])
  }

  return (
    <div className="dashboard-grid-root">
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

        <button type="button" onClick={handleAddObject}>
          Добавить объект
        </button>
      </div>

      <div ref={containerRef} className="dashboard-grid">
        {mounted && (
          <ReactGridLayout
            layout={layout}
            width={width}
            autoSize={false}
            compactor={noCompactor}
            gridConfig={{
              cols: columns,
              rowHeight: (width * 9) / 16 / 16,
              margin: [0, 0],
              containerPadding: [0, 0],
              maxRows: 16,
            }}
            dragConfig={{
              enabled: true,
            }}
            resizeConfig={{
              enabled: true,
              handles: ["s", "e", "se"],
            }}
            onLayoutChange={(nextLayout) => {
              setLayout(nextLayout)
            }}
          >
            {layout.map((item) => (
              <div key={item.i} className="dashboard-grid__item">
                {item.i.toUpperCase()}
              </div>
            ))}
          </ReactGridLayout>
        )}
      </div>
    </div>
  )
}
