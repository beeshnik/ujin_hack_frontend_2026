import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/shared/ui/alert-dialog"
import { Button } from "@/shared/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Plus } from "lucide-react"
import { useEffect, useState, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"


export function CreateTemplate() {
    const [templateName, setTemplateName] = useState()

    const navigate = useNavigate()

    const handleOnClick = () => {
        navigate(`/create-template/${templateName}`)
    }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>
            <Plus />
            Создать шаблон
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Создание нового шаблона</DialogTitle>
            <DialogDescription>
              Введите название для нового макета. После создания вы перейдете в
              визуальный конструктор.
            </DialogDescription>
          </DialogHeader>
          <Label htmlFor="name-1">Название шаблона</Label>
          <Input
            id="name-1"
            name="name"
            value={templateName}
            onChange={(e) => {
              setTemplateName(e.target.value)
            }}
            placeholder="Например: Инфо-панель холла"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Отмена</Button>
            </DialogClose>
            <Button onClick={handleOnClick}>Перейти в редактор</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
