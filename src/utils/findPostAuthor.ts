import { Author, Post } from "../types";

export const findPostAuthor = (
  post: Post,
  authors: Author[]
): Author | undefined => {
  return authors.find((author) => author.id === post.userId);
};
