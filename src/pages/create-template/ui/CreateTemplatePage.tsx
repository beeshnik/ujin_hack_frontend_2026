import { DashboardGrid } from "@/widgets/dashboard-grid"
import { useParams } from "react-router-dom"


export function CreateTemplate() {
    const { templateName } = useParams()
    return (
      <div>
        <DashboardGrid name={templateName || "defaultName"} />
      </div>
    )
}