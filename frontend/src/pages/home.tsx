import { CreateGoal } from "../components/create-goal";
import { Dialog } from "../components/ui/dialog";
import { EmptyGoals } from "../pages/empty-goals";
import { Summary } from "./summary";

export function Home() {

  const renderChildren = () => {
    if (true) return <Summary />

    return <EmptyGoals />
  }

  return (
    <Dialog>
      {renderChildren()}

      <CreateGoal />
    </Dialog>
  )
}