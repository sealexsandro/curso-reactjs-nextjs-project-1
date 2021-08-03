import { Component } from "react";

import "./styles.css";

import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/load-posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 4,
    searchValue: "",
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postAndPhotos = await loadPosts();

    this.setState({
      posts: postAndPhotos.slice(page, postsPerPage),
      allPosts: postAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    // console.log(page, postsPerPage,nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  };

  handleChange = (e) => {
    const { value } = e.target;
    console.log(value);
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;

    return (
      <section className="container">
        {!!searchValue && (
          <>
            <h1>Search value: {searchValue}</h1>
            <br />
            <br />
            <br />
          </>
        )}

        <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        <br />
        <br />
        <br />
        {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

        {filteredPosts.length === 0 && <p>Não Existem Posts Com Este Título</p>}
        <div className="button-container">
          {!searchValue && (
            <Button
              text="Load More Posts"
              atrClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
        {/* <div className="posts-card">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              body={post.body}
              id={post.id}
              cover={post.cover}
            />
          ))}
        </div> */}
      </section>
    );
  }
}

export default Home;
