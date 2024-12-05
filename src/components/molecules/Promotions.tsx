import type React from "react";
import { Badge } from "../atoms/Badge";
import { useCountdown } from "../../hooks/useCountdown";
import { useEffect } from "react";

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  endDate: Date;
}

interface PromotionCardProps {
  promotion: Promotion;
  onExpired: () => void;
}

const PromotionCard: React.FC<PromotionCardProps> = ({
  promotion,
  onExpired,
}) => {
  const countdown = useCountdown(promotion.endDate);

  useEffect(() => {
    if (countdown.isExpired) {
      onExpired();
    }
  }, [countdown.isExpired, onExpired]);

  //   if (countdown.isExpired) {
  //     return null;
  //   }

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{promotion.title}</h3>
          <p className="text-gray-600 mt-1">{promotion.description}</p>
        </div>
        <Badge variant="warning" size="md">
          {promotion.discount}% OFF
        </Badge>
      </div>

      {!countdown.isExpired ? (
        <div className="mt-4 flex gap-4">
          <TimeUnit value={countdown.days} label="days" />
          <TimeUnit value={countdown.hours} label="hours" />
          <TimeUnit value={countdown.minutes} label="min" />
          <TimeUnit value={countdown.seconds} label="sec" />
        </div>
      ) : (
        <div className="text-red-500">Promotion expired</div>
      )}
    </div>
  );
};

interface TimeUnitProps {
  value: number;
  label: string;
}

const TimeUnit: React.FC<TimeUnitProps> = ({ value, label }) => (
  <div className="text-center">
    <div className="text-2xl font-bold bg-gray-100 rounded-md px-3 py-2 min-w-[3rem]">
      {value.toString().padStart(2, "0")}
    </div>
    <div className="text-xs text-gray-500 mt-1">{label}</div>
  </div>
);

interface PromotionsProps {
  promotions: Promotion[];
  onPromotionExpired?: (promotionId: string) => void;
}

export const Promotions: React.FC<PromotionsProps> = ({
  promotions,
  onPromotionExpired,
}) => {
  return (
    <div className="space-y-4">
      {promotions.map((promotion) => (
        <PromotionCard
          key={promotion.id}
          promotion={promotion}
          onExpired={() => onPromotionExpired?.(promotion.id)}
        />
      ))}
    </div>
  );
};
