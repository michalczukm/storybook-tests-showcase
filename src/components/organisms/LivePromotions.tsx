import type React from "react";
import { usePromotions } from "../../hooks/usePromotions";
import { Promotions } from "../molecules/Promotions";

interface LivePromotionsProps {
  state: "ongoing" | "upcoming";
}

const promotionStateText = {
  ongoing: "🔥 Ongoing",
  upcoming: "⏰ Upcoming",
};

export const LivePromotions: React.FC<LivePromotionsProps> = ({ state }) => {
  const promotionsResponse = usePromotions({ state });

  if (promotionsResponse.status === "error") {
    return (
      <div className="text-center text-red-600">
        Error loading promotions: {promotionsResponse.error?.message}
      </div>
    );
  }

  if (promotionsResponse.status === "loading") {
    return (
      <div className="space-y-4">
        {[...Array(2)].map((_, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: loading state
            key={index}
            className="h-32 bg-gray-100 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl mb-4 font-bold ">
        <span className="text-red-600">{promotionStateText[state]}</span>{" "}
        promotions
      </h2>
      <Promotions
        promotions={promotionsResponse.promotions}
        onPromotionExpired={() => {}}
      />
    </div>
  );
};
