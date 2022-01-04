import React, { useState } from "react";

function Rating({ _id, rating, hoverEnabled = true, onSaveRating, onRemoveRating }) {
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
            hoverEnabled={hoverEnabled}
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
    hoverEnabled,
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

  return hoverEnabled ?
    (
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
    ) : (
      <i
        className={fill}
        aria-hidden="true"
        style={{ color: "#f68b24" }}
      />
    )
}

export default Rating;
