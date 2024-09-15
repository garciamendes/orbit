import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { ISummary } from "../../utils/summary-types";
import { toast } from "sonner";

export const useGetSummaryGoals = () => {
	const { data, isLoading, isError } = useQuery<ISummary>({
		queryKey: ["summaryGoals"],
		queryFn: async () => {
			const response = await fetch(
				`${import.meta.env.VITE_BASE_URL}/api/goals/summary`,
			);
			return await response.json();
		},
		staleTime: 1000 * 60, // 60 seconds (usar o cache em um tempo de 60 segundos),
	});

	useEffect(() => {
		if (!isError) return;

		toast.error("Error ao tentar as metas");
	}, [isError]);

	return { data, isLoading };
};
