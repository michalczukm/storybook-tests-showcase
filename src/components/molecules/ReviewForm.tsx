import type React from "react";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { Rating } from "../atoms/Rating";
import { useCallback, useState } from "react";

interface ReviewFormProps {
  onSubmit: (review: {
    rating: number;
    title: string;
    comment: string;
    name: string;
  }) => void;
  initialRating?: number;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  onSubmit,
  initialRating = 0,
}) => {
  const [form, setForm] = useState({
    rating: initialRating,
    title: "",
    comment: "",
    name: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (form.rating === 0) {
      newErrors.rating = "Please select a rating";
    }
    if (!form.title.trim()) {
      newErrors.title = "Review title is required";
    }
    if (!form.comment.trim()) {
      newErrors.comment = "Review comment is required";
    }
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (validate()) {
        // Reset form
        onSubmit({
          rating: form.rating,
          title: form.title.trim(),
          comment: form.comment.trim(),
          name: form.name.trim(),
        });

        // Reset form
        setForm({ rating: 0, title: "", comment: "", name: "" });
        setErrors({});
      }
    },
    [validate, onSubmit, form],
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label
          htmlFor="rating"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Rating
        </label>
        <Rating
          value={form.rating}
          onChange={(value) => setForm({ ...form, rating: value })}
        />
        {errors.rating && (
          <span data-testid="input-error" className="text-sm text-red-500">
            {errors.rating}
          </span>
        )}
      </div>

      <Input
        label="Review Title"
        value={form.title}
        onChange={(value) => setForm({ ...form, title: value })}
        error={errors.title}
        placeholder="Summarize your experience"
      />

      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700"
        >
          Your Review
        </label>
        <textarea
          id="comment"
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          placeholder="Share your experience with this product"
          rows={4}
          className={`mt-1 block w-full border rounded-md px-3 py-2 ${
            errors.comment ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.comment && (
          <span data-testid="input-error" className="text-sm text-red-500">
            {errors.comment}
          </span>
        )}
      </div>

      <Input
        label="Your Name"
        value={form.name}
        onChange={(value) => setForm({ ...form, name: value })}
        error={errors.name}
        placeholder="Enter your name"
      />

      <Button type="submit" variant="primary">
        Submit Review
      </Button>
    </form>
  );
};
