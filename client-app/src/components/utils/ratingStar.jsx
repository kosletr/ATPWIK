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
  } = props;

  const fill = React.useMemo(() => {
    if (hoverRating >= index) {
      return "fa fa-star";
    } else if (!hoverRating && rating >= index) {
      return "fa fa-star";
    }
    return "fa fa-star-o";
  }, [rating, hoverRating, index]);

  return (
    <i
      className={fill}
      aria-hidden="true"
      style={{ cursor: "pointer", color: "#f68b24" }}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => {
        onSaveRating(index, _id);
      }}
    />
  );
}

export default RatingStar;
