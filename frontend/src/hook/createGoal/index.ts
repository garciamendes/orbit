import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CreateGoal } from "../../utils/create-goal";

export const useCreateGoal = () => {
	const queryClient = useQueryClient();

	const { mutateAsync: createGoal, isPending } = useMutation({
		mutationFn: async (data: CreateGoal) => {
			const response = await fetch(
				`${import.meta.env.VITE_BASE_URL}/api/goals`,
				{
					method: "POST",
					body: JSON.stringify(data),
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
			toast.success("Meta criada com sucesso");
		},
		onError: () => toast.error("Error ao criar meta"),
	});

	return { createGoal, isPending };
};
