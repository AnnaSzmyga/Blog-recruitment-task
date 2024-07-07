import { useEffect, useMemo, useState } from "react";
import Post from "../Post/Post";
import { PostsListProps } from "./types";
import "./postList.css";
import { POSTS_INITIAL_NUMBER } from "../../constants";

const PostsList = ({ posts }: PostsListProps) => {
  const [postsNumber, setPostsNumber] = useState(POSTS_INITIAL_NUMBER);

  const handleClick = () => {
    setPostsNumber((prevState) => prevState + POSTS_INITIAL_NUMBER);
  };

  const displayedPosts = useMemo(() => {
    return posts.slice(0, postsNumber);
  }, [postsNumber, posts]);

  const isButtonVisible = postsNumber < posts.length;

  useEffect(() => {
    setPostsNumber(POSTS_INITIAL_NUMBER);
  }, [posts]);

  return (
    <>
      <ul className="posts-list">
        {displayedPosts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </ul>
      {isButtonVisible && (
        <div className="button-wrapper">
          <button className="button" onClick={handleClick}>
            See more
          </button>
        </div>
      )}
    </>
  );
};

export default PostsList;
