import { Plus } from "lucide-react"
import { OutlineButton } from "./ui/outline-button"
import { useGetPendingsGoals } from "../hook/getPendingGoals"
import { useCreateGoalCompletion } from "../hook/createGoalCompletion"

export const PendingGoals = () => {
  const { data } = useGetPendingsGoals()
  const { createGoalCompletion } = useCreateGoalCompletion()

  if (!data) return null

  const handleCompleteGoal = async (goalId: string) => {
    await createGoalCompletion(goalId)
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.map(goal => {
        const isCompletedGoal = goal.completionCount >= goal.desiredWeeklyFrequency

        return (
          <OutlineButton
            onClick={() => handleCompleteGoal(goal.id)}
            key={goal.id}
            disabled={isCompletedGoal}
            className="duration-300 hover:border-violet-500 hover:text-violet-500">
            <Plus className="size-4 text-zinc-600" />

            {goal.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}