import { useState } from "react";

export default function StarRating({ rating, disabled, onRate }) {
  const [hover, setHover] = useState(0);

  return (
    <div style={{ display: "flex", gap: "5px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            fontSize: "28px",
            cursor: disabled ? "default" : "pointer",
            color: star <= (hover || rating) ? "#f5c518" : "#888",
            transition: "0.2s",
          }}
          onMouseEnter={() => !disabled && setHover(star)}
          onMouseLeave={() => !disabled && setHover(0)}
          onClick={() => !disabled && onRate(star)}
        >
          ✯
        </span>
      ))}
    </div>
  );
}
