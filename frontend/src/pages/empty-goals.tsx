import LogoSvg from '../assets/images/logo-name.svg'
import LetsStartSvg from '../assets/images/lets-start.svg'
import { Plus } from 'lucide-react'
import { Button } from '../components/ui/button'
import { DialogTrigger } from '../components/ui/dialog'

export const EmptyGoals = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-8 h-screen">
      <img src={LogoSvg} alt="logo" />
      <img src={LetsStartSvg} alt="lest_start" />

      <p className='text-zinc-300 leading-relaxed max-w-80 text-center'>
        Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
      </p>

      <DialogTrigger asChild>
        <Button
          type='button'
          className='hover:ring-2 ring-violet-500 ring-offset-4 ring-offset-zinc-950 duration-300'
        >
          <Plus className='size-4' />
          Cadastrar meta
        </Button>
      </DialogTrigger>
    </div>
  )
}