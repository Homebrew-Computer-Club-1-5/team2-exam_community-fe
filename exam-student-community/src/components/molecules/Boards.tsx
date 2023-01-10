import { useState } from "react";
import { Link } from "react-router-dom";
import { Board, BoardPost } from "./small/styled";
import { IconComment, IconRarr } from "../molecules/small/icons";
import { sampleBoards } from "../molecules/small/sampleData";

function Boards() {
  const [boards, setBoards] = useState(sampleBoards);

  return (
    <ul>
      {boards.map((board, index) => {
        return (
          <Board key={index}>
            <Link to={`/${board.index}`}>
              <div className="title_row">
                <span className="title">
                  {board.name} <IconRarr />
                </span>
                <span className="total_num">{board.total_num}개의 이야기</span>
              </div>
              <ul>
                {board.posts.map((post, index) => (
                  <BoardPost key={index}>
                    <span>{post.title}</span>
                    <span>
                      <IconComment /> {post.comment_num}
                    </span>
                  </BoardPost>
                ))}
              </ul>
            </Link>
          </Board>
        );
      })}
    </ul>
  );
}

export default Boards;
