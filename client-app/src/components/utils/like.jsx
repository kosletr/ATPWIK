import React from "react";

function Like(props) {
  const { _id, onLike, liked } = props;
  return (
    <i
      id={_id}
      onClick={onLike}
      className={liked ? "like fa fa-heart" : "like fa fa-heart-o"}
      style={{ cursor: "pointer", color: "red" }}
      aria-hidden="true"
    />
  );
}

export default Like;
