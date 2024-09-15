import { X } from "lucide-react"
import { DialogClose, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from "./ui/radio-group"
import { WEEKS_GOALS_OPTIONS } from "../utils/constants"
import { Button } from "./ui/button"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { CreateGoal as ICreateGoal } from "../utils/create-goal"
import { createGoalSchema } from "../utils/create-goal"
import { useCreateGoal } from "../hook/createGoal"
import { useRef } from "react"

export const CreateGoal = () => {
  const closeModalSuccessCreateGoal = useRef<HTMLInputElement>(null)

  const { register, control, handleSubmit, reset } = useForm<ICreateGoal>({
    resolver: zodResolver(createGoalSchema),
  })

  const { createGoal } = useCreateGoal()

  const handleCreateGoal = async (data: ICreateGoal) => {
    await createGoal(data)
    reset()
    closeModalSuccessCreateGoal.current?.click()
  }

  return (
    <>
      <DialogClose asChild>
        <input hidden ref={closeModalSuccessCreateGoal} />
      </DialogClose>

      <DialogContent>
        <div className="flex flex-col gap-6 h-full">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <DialogTitle>Cadastrar meta</DialogTitle>

              <DialogClose>
                <X className="size-5 text-zinc-600" />
              </DialogClose>
            </div>

            <DialogDescription>
              Adicione atividades que te fazem bem e que você quer continuar praticando toda semana.
            </DialogDescription>
          </div>

          <form onSubmit={handleSubmit(handleCreateGoal)} className="flex flex-col flex-1 justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Qual a atividade?</Label>
                <Input
                  id="title"
                  autoFocus
                  placeholder="Praticar exercícios, meditar, etc..." {...register('title')} />
                {/* {formState.errors.title &&
                <span className="text-xs text-red-500">{formState.errors.title?.message}</span>
              } */}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="week-goals">Quantas vezes na semana?</Label>
                <Controller
                  control={control}
                  name="desiredWeeklyFrequency"
                  defaultValue={1}
                  render={({ field }) => {
                    return (
                      <RadioGroup onValueChange={field.onChange} value={String(field.value)}>
                        {WEEKS_GOALS_OPTIONS.map(goal => {
                          return (
                            <RadioGroupItem key={goal.value} value={String(goal.value)}>
                              <RadioGroupIndicator />
                              <span className="text-zinc-300 text-sm font-medium leading-none">{goal.label}</span>
                              <span className="text-lg leading-none">{goal.icon}</span>
                            </RadioGroupItem>
                          )
                        })}
                      </RadioGroup>
                    )
                  }} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DialogClose asChild>
                <Button type="button" className="flex-1 duration-300" variant="secondary">Fechar</Button>
              </DialogClose>

              <Button
                className="flex-1 duration-300 hover:ring-2 ring-violet-500 ring-offset-4 ring-offset-zinc-950">
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </>
  )
}