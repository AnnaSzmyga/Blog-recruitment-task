import { useMemo, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { Author, AuthorSelectOption, Post } from "./types";
import { useFetch } from "./hooks/useFetch";
import { useScroll } from "./hooks/useScroll";
import Loading from "./components/Loading/Loading";
import PostsList from "./components/PostsList/PostsList";
import Hero from "./components/Hero/Hero";
import { findPostAuthor } from "./utils/findPostAuthor";
import "./App.css";
import arrow from "./arrow-up.svg";
import { API_URL } from "./constants";

function App() {
  const {
    data: posts,
    loading: postsLoading,
    error: postsError,
  } = useFetch<Post[]>(`${API_URL}/posts`);
  const {
    data: authors,
    loading: authorsLoading,
    error: authorsError,
  } = useFetch<Author[]>(`${API_URL}/users`);

  const loading = postsLoading || authorsLoading;
  const error = postsError || authorsError;

  const { isScrollTopBtnVisible } = useScroll();

  const [selectedAuthors, setSelectedAuthors] = useState<AuthorSelectOption[]>(
    []
  );

  const postsWithAuthors = posts?.map((post) => ({
    ...post,
    author: findPostAuthor(post, authors || []),
  }));

  const options: AuthorSelectOption[] =
    authors?.map(({ id, name }) => ({
      label: name,
      value: id,
    })) || [];

  const selectedAuthorsPosts = useMemo(() => {
    if (!selectedAuthors || selectedAuthors.length === 0) {
      return postsWithAuthors;
    }
    return postsWithAuthors?.filter((post) =>
      selectedAuthors.some((author) => author.value === post.userId)
    );
  }, [selectedAuthors, postsWithAuthors]);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Hero />
      <main className="container">
        <MultiSelect
          options={options}
          onChange={setSelectedAuthors}
          value={selectedAuthors}
          labelledBy="Select authors"
          hasSelectAll={false}
          overrideStrings={{ selectSomeItems: "Select authors..." }}
          className="select"
          disableSearch
        />
        {loading && <Loading />}
        {error && <p>Error fetching data</p>}
        {selectedAuthorsPosts && <PostsList posts={selectedAuthorsPosts} />}
      </main>
      {isScrollTopBtnVisible && (
        <button className="scroll-top-btn" onClick={handleScrollTop}>
          <img className="logo-img" src={arrow} alt="arrow" />
        </button>
      )}
    </>
  );
}

export default App;
