import React, { useState } from "react";

function Rating({ _id, rating, onSaveRating, onRemoveRating }) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div>
      {[1, 2, 3, 4, 5].map((index) => {
        return (
          <RatingStar
            _id={_id}
            key={index}
            index={index}
            rating={rating}
            hoverRating={hoverRating}
            onMouseEnter={(index) => setHoverRating(index)}
            onMouseLeave={() => setHoverRating(0)}
            onSaveRating={onSaveRating}
            onRemoveRating={onRemoveRating}
          />
        );
      })}
    </div>
  );
}

function RatingStar(props) {
  const {
    _id,
    index,
    rating,
    hoverRating,
    onMouseEnter,
    onMouseLeave,
    onSaveRating,
    onRemoveRating,
  } = props;

  const fill = React.useMemo(() => {
    return "fa fa-star" + (
      hoverRating >= index || (!hoverRating && rating >= index)
        ? ""
        : "-o"
    );
  }, [rating, hoverRating, index]);

  return (
    <i
      className={fill}
      aria-hidden="true"
      style={{ cursor: "pointer", color: "#f68b24" }}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => {
        rating === undefined || rating === 0 || rating !== index
          ? onSaveRating(index, _id)
          : onRemoveRating(_id)
      }}
    />
  );
}

export default Rating;
