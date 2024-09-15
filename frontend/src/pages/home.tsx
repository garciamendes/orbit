import { CreateGoal } from "../components/create-goal";
import { Dialog } from "../components/ui/dialog";
import { useGetSummaryGoals } from "../hook/getSummaryGoals";
import { EmptyGoals } from "../pages/empty-goals";
import { Summary } from "./summary";
import { Loader2 } from "lucide-react";

export function Home() {
  const { data, isLoading } = useGetSummaryGoals()

  const renderChildren = () => {
    if (data && data?.total > 0) return <Summary />

    return <EmptyGoals />
  }

  if (isLoading) {
    return <div className="flex justify-center mt-5">
      <Loader2 className="size-7 text-violet-600 animate-spin" />
    </div>
  }

  return (
    <Dialog>
      {renderChildren()}

      <CreateGoal />
    </Dialog>
  )
}