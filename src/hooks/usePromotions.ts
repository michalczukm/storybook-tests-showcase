import { useCallback, useEffect, useState } from "react";

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  endDate: Date;
}

export type PromotionsResponse = (
  | {
      status: "loading";
      isLoading: true;
      promotions: Promotion[];
    }
  | {
      status: "success";
      promotions: Promotion[];
      isLoading: false;
    }
  | {
      status: "error";
      error: Error | null;
    }
) & {
  refetch: () => Promise<void>;
};

const transformData = (promotion: Record<keyof Promotion, string>) => {
  return {
    ...promotion,
    endDate: new Date(promotion.endDate),
  };
};

export const usePromotions = (filters: {
  state: "ongoing" | "upcoming";
}): PromotionsResponse => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPromotions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();
      params.append("state", filters.state);

      const response = await fetch(`/api/promotions?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch promotions");
      }

      const data = await response.json();
      setPromotions(data.map(transformData));
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Unknown error occurred"),
      );
    } finally {
      setIsLoading(false);
    }
  }, [filters.state]);

  useEffect(() => {
    fetchPromotions();
  }, [fetchPromotions]);

  if (isLoading) {
    return {
      status: "loading",
      isLoading,
      promotions: [],
      refetch: fetchPromotions,
    };
  }

  if (error) {
    return {
      status: "error",
      error,
      refetch: fetchPromotions,
    };
  }

  return {
    status: "success",
    promotions,
    isLoading: false,
    refetch: fetchPromotions,
  };
};
