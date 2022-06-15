import { React } from "subapp-react";
import commentsData from "../data/commentsData";
import fetchFakeData from "../data/utils";


const resource = fetchFakeData(commentsData, 2500);

export default function Comments() {
  const comments = resource.read();
  return (
    <ol id="comment-box">
      {comments.map((comment, i) => (
        <li className="comment" key={i}>
          {comment}
        </li>
      ))}
    </ol>
  );
}
