import { CheckCircle2, Plus } from "lucide-react"
import { Button } from "../components/ui/button"
import { DialogTrigger } from "../components/ui/dialog"
import IconOrbit from '../assets/images/in-orbit-icon.svg'
import { Progress, ProgressIndicator } from "../components/ui/progress-bar"
import { Separator } from "../components/ui/separator"
import { OutlineButton } from "../components/ui/outline-button"


export const Summary = () => {
  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img loading="eager" src={IconOrbit} alt="logo" />
          <span className="text-lg font-semibold">5 a 10 de Agosto</span>
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
        <Progress max={15} value={6}>
          <ProgressIndicator style={{ width: '50%' }} />
        </Progress>

        <div className="flex items-center justify-between trext-xs text-zinc-400">
          <span>
            Você completou
            <span className="text-zinc-100 mx-2">7</span>
            de
            <span className="text-zinc-100 mx-2">15</span>
            metas nessa semana
          </span>

          <span>50%</span>
        </div>
      </div>

      <Separator />

      <div className="flex flex-wrap gap-3">
        <OutlineButton className="duration-300">
          <Plus className="size-4 text-zinc-600" />
        </OutlineButton>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        <div className="flex flex-col ga-4">
          <h3 className="font-medium">Domingo <span className="text-zinc-400 text-xs">(10 de Agosto)</span></h3>

          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />

              <span>
                Você completou
                <span className="text-zinc-100 mx-2">"Acordar cedo"</span>
                às
                <span className="text-zinc-100 mx-2">08:12h</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}