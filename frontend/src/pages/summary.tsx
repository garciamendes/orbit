import { CheckCircle2, Heading1, Plus } from "lucide-react"
import { Button } from "../components/ui/button"
import { DialogTrigger } from "../components/ui/dialog"
import IconOrbit from '../assets/images/in-orbit-icon.svg'
import { Progress, ProgressIndicator } from "../components/ui/progress-bar"
import { Separator } from "../components/ui/separator"
import { OutlineButton } from "../components/ui/outline-button"
import { useGetSummaryGoals } from "../hook/getSummaryGoals"
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { PendingGoals } from "../components/pending-goals"
import { Suspense } from "react"
dayjs.locale(ptBr)


export const Summary = () => {
  const { data } = useGetSummaryGoals()

  if (!data) return null

  const firstDayOfWeek = dayjs().startOf('week').format('DD[ a ]')
  const lastDayOfWeek = dayjs().endOf('week').format('DD[ de ]')
  const lastMonthDayOfWeek = dayjs().endOf('week').format('MMM')

  const completedPercentage = Math.round(data?.completed * 100 / data?.total)

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img loading="eager" src={IconOrbit} alt="logo" />
          <span className="text-lg font-semibold">
            {firstDayOfWeek} {lastDayOfWeek} <span className="capitalize">{lastMonthDayOfWeek}</span>
          </span>
        </div>

        <DialogTrigger asChild>
          <Button
            size="sm"
            type='button'
            className='hover:ring-2 ring-violet-500 ring-offset-4 ring-offset-zinc-950 duration-300'
          >
            <Plus className='size-4' />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress max={data.total} value={data.completed}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>

        <div className="flex items-center justify-between trext-xs text-zinc-400">
          <span>
            Você completou
            <span className="text-zinc-100 mx-2">{data?.completed || 0}</span>
            de
            <span className="text-zinc-100 mx-2">{data?.total || 0}</span>
            metas nessa semana
          </span>

          <span>{completedPercentage}%</span>
        </div>
      </div>

      <Separator />

      <PendingGoals />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        <div className="overflow-auto flex flex-1">
          {Object.entries(data.goalsPerDay).map(([date, goals]) => {
            const weekDay = dayjs(date).format('dddd')
            const formatedDate = dayjs(date).format('DD[ de ]MMMM')

            return (
              <div key={date} className="flex flex-col ga-4">
                <h3 className="font-medium mb-2">
                  <span className="capitalize">{weekDay}</span>
                  <span className="text-zinc-400 text-xs ml-2">({formatedDate})</span>
                </h3>

                <ul className="flex flex-col gap-">
                  {goals.map(goal => {
                    const time = dayjs(goal.completedAt).format('HH[:]MM[h]')

                    return (
                      <li key={goal.id} className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-violet-500" />

                        <span>
                          Você completou
                          <span className="text-zinc-100 mx-2">"{goal.title}"</span>
                          às
                          <span className="text-zinc-100 mx-2">{time}</span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}