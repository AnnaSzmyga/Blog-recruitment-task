import { PostProps } from "./types";
import "./post.css";

const PostsList = ({ post }: PostProps) => {
  const { id, title, body, author } = post;
  return (
    <li className="post">
      <div className="post-img-wrapper">
        <img
          className="post-img"
          src={`https://picsum.photos/id/${id + 10}/300`}
          alt={`post-img-${id}`}
        />
      </div>
      <div className="post-content">
        <h3 className="post-heading">{title}</h3>
        <p>{body}</p>
        {author && <p className="post-author">{author.name}</p>}
      </div>
    </li>
  );
};

export default PostsList;
