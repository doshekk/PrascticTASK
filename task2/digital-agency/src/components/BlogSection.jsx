import React from "react";

const BlogSection = () => {
  return (
    <section className="blog">
      <header className="blog-header">
        <h2>Blog</h2>
      </header>

      <h1 className="blog-title">Read Our News</h1>

      <div className="blog-cards">
        <article className="blog-card">
          <div className="card-image"><img src="./img/Rectangle 6 (1).png" alt="" /></div>
          <div className="card-info">
            <span className="card-date">09 April, 2022</span>
            <span className="card-author">by Admin</span>
            <p className="card-description">Lorem ipsum dolor sit amet, consecte adipiscing elit ut aliquam</p>
            <a href="#" className="card-read-more">Read More</a>
          </div>
        </article>
        <article className="blog-card">
          <div className="card-image"><img src="./img/Rectangle 7 (1).png" alt="" /></div>
          <div className="card-info">
            <span className="card-date">09 April, 2022</span>
            <span className="card-author">by Admin</span>
            <p className="card-description">Lorem ipsum dolor sit amet, consecte adipiscing elit ut aliquam</p>
            <a href="#" className="card-read-more">Read More</a>
          </div>
        </article>
        <article className="blog-card">
          <div className="card-image"><img src="./img/Rectangle 8 (1).png" alt="" /></div>
          <div className="card-info">
            <span className="card-date">09 April, 2022</span>
            <span className="card-author">by Admin</span>
            <p className="card-description">Lorem ipsum dolor sit amet, consecte adipiscing elit ut aliquam</p>
            <a href="#" className="card-read-more">Read More</a>
          </div>
        </article>
      </div>
    </section>
  );
};

export default BlogSection;
