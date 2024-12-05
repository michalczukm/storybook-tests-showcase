import type React from "react";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { Rating } from "../atoms/Rating";
import { useState } from 'react';

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
  const [rating, setRating] = useState(initialRating);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (rating === 0) {
      newErrors.rating = "Please select a rating";
    }
    if (!title.trim()) {
      newErrors.title = "Review title is required";
    }
    if (!comment.trim()) {
      newErrors.comment = "Review comment is required";
    }
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit({
        rating,
        title: title.trim(),
        comment: comment.trim(),
        name: name.trim(),
      });

      // Reset form
      setRating(0);
      setTitle("");
      setComment("");
      setName("");
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label
          htmlFor="rating"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Rating
        </label>
        <Rating value={rating} onChange={setRating} />
        {errors.rating && (
          <span className="text-sm text-red-500">{errors.rating}</span>
        )}
      </div>

      <Input
        label="Review Title"
        value={title}
        onChange={setTitle}
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
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this product"
          rows={4}
          className={`mt-1 block w-full border rounded-md px-3 py-2 ${
            errors.comment ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.comment && (
          <span className="text-sm text-red-500">{errors.comment}</span>
        )}
      </div>

      <Input
        label="Your Name"
        value={name}
        onChange={setName}
        error={errors.name}
        placeholder="Enter your name"
      />

      <Button type="submit" variant="primary">
        Submit Review
      </Button>
    </form>
  );
}; 