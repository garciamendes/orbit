import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import type { IPendingGoal } from "../../utils/pendings-goal-types";

export const useGetPendingsGoals = () => {
	const { data, isLoading, isError } = useQuery<IPendingGoal[]>({
		queryKey: ["pendingsGoals"],
		queryFn: async () => {
			const response = await fetch(
				`${import.meta.env.VITE_BASE_URL}/api/goals/pendings`,
			);
			return await response.json();
		},
	});

	useEffect(() => {
		if (!isError) return;

		toast.error("Error ao tentar as metas pendentes");
	}, [isError]);

	return { data, isLoading };
};
