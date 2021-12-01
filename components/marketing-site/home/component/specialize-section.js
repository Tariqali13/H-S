import React from 'react';

const SpecializeSection = () => {
  return (
    <section className="w3-about text-center">
      <div className="container">
        <h2 className="w3ls_head">Wel<span>come</span></h2>
        <p className="para">Lorem Ipsum is simply dummy text <span> type setting industry</span> esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat.</p>
        <div className="col-md-4 w3l-abt-grid">
          <div className="hi-icon-wrap hi-icon-effect-7 hi-icon-effect-7b">
            <a href="#" className="hi-icon icon1"><i className="fa fa-cog" aria-hidden="true"></i></a>
          </div>
          <h4>Information Center</h4>
          <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        </div>
        <div className="col-md-4 w3l-abt-grid">
          <div className="hi-icon-wrap hi-icon-effect-7 hi-icon-effect-7b">
            <a href="#" className="hi-icon icon2"><i className="fa fa-sun-o" aria-hidden="true"></i></a>
          </div>
          <h4>Commercial Solar</h4>
          <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered in some, by injected humour.</p>
        </div>
        <div className="col-md-4 w3l-abt-grid">
          <div className="hi-icon-wrap hi-icon-effect-7 hi-icon-effect-7b">
            <a href="#" className="hi-icon icon3"><i className="fa fa-gift" aria-hidden="true"></i>
            </a>
          </div>
          <h4>Special Offers</h4>
          <p>Contrary to popular belief, Lorem Ipsum is not simply random text.
                    It has roots in a piece of Latin literature from 45 BC, making.</p>
        </div>
        <div className="clearfix"></div>
      </div>
    </section>
  );
};

export { SpecializeSection };