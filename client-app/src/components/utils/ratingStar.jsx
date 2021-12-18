import React from "react";

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

export default RatingStar;
