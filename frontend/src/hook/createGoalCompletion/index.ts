import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateGoalCompletion = () => {
	const queryClient = useQueryClient();
	const { mutateAsync: createGoalCompletion, isPending } = useMutation({
		mutationFn: async (goalId: string) => {
			const response = await fetch(
				`${import.meta.env.VITE_BASE_URL}/api/goals/completion`,
				{
					method: "POST",
					body: JSON.stringify({ goalId }),
					headers: { "Content-Type": "application/json" },
				},
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData?.message || "Erro ao completar a meta");
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["pendingsGoals"],
			});
			queryClient.invalidateQueries({
				queryKey: ["summaryGoals"],
			});
			toast.success("Meta concluída");
		},
		onError: () => toast.error("Error ao concluir a meta"),
	});

	return { createGoalCompletion, isPending };
};
