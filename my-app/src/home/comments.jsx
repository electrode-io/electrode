import React from "react";

import { useData } from "./data";

export default function Comments() {
  const comments = useData();
  return (
    <>
      {comments.map((comment, i) => (
        <p className="comment" key={i}>
          {comment}
        </p>
      ))}
    </>
  );
}
