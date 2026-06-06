import { useState } from "react";
import ReactGridLayout, { useContainerWidth } from "react-grid-layout";
import type { Layout } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./dashboard-grid.css";

const initialLayout: Layout = [
    { i: "a", x: 0, y: 0, w: 2, h: 2 },
    { i: "b", x: 2, y: 0, w: 2, h: 2 },
    { i: "c", x: 4, y: 0, w: 2, h: 2 },
];

export function DashboardGrid() {
    const [layout, setLayout] = useState<Layout>(initialLayout);
    const { width, containerRef, mounted } = useContainerWidth({
        initialWidth: 800,
    });

    return (
        <div ref={containerRef} className="dashboard-grid">
            {mounted && (
                <ReactGridLayout
                    layout={layout}
                    width={width}
                    gridConfig={{
                        cols: 10,
                        rowHeight: 60,
                        margin: [8, 8],
                        containerPadding: [8, 8],
                    }}
                    dragConfig={{
                        enabled: true,
                    }}
                    resizeConfig={{
                        enabled: true,
                        handles: ["se"],
                    }}
                    onLayoutChange={(nextLayout) => {
                        console.log("layout change", nextLayout);
                        setLayout(nextLayout);
                    }}
                    onDragStart={() => {
                        console.log("drag start");
                    }}
                    onResizeStart={() => {
                        console.log("resize start");
                    }}
                >
                    <div
                        key="a"
                        className="dashboard-grid__item"
                        onMouseDown={() => console.log("native mouse down A")}
                    >
                        A
                    </div>

                    <div key="b" className="dashboard-grid__item">
                        B
                    </div>

                    <div key="c" className="dashboard-grid__item">
                        C
                    </div>
                </ReactGridLayout>
            )}
        </div>
    );
}
