import React from 'react';

function Home() {
  return (
    <section className="content-section" id="home">
      <div className="content-image image-right"><img src="./img/Rectangle 1.png" alt="" /></div>
      <div className="content-image image-center"><img src="./img/Rectangle 2.png" alt="" /></div>

      <h3 className="content-header subheader">Creative work, creative mind</h3>
      <h1 className="content-header main-title">We Are Digital Creative Agency</h1>
      <p className="content-header description">Lorem ipsum dolor sit amet...</p>

      <button className="cta-button">
        <span className="button-text">Get in Touch</span>
      </button>
    </section>
  );
}

export default Home;
