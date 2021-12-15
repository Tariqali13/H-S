import React from "react";

const Stats = () => {
  return (
    <div className="stats">
      <div className="container">
        <div className="stats-info">
          <div className="col-md-3 col-sm-3 stats-grid slideanim">
            <div className='numscroller numscroller-big-bottom' data-slno='1' data-min='0' data-max='1200'
              data-delay='.5' data-increment="1">24/7
            </div>
            <h4 className="stats-info"> Monitoring </h4>
          </div>
          <div className="col-md-3 col-sm-3 stats-grid slideanim">
            <div className='numscroller numscroller-big-bottom' data-slno='1' data-min='0' data-max='3000'
              data-delay='.5' data-increment="1">100%
            </div>
            <h4 className="stats-info">Satisfaction</h4>
          </div>
          <div className="col-md-3 col-sm-3 stats-grid slideanim">
            <div className='numscroller numscroller-big-bottom' data-slno='1' data-min='0' data-max='9000'
              data-delay='.5' data-increment="10">Satisfaction
            </div>
            <h4 className="stats-info">Guarantee</h4>
          </div>
          <div className="col-md-3 col-sm-3 stats-grid slideanim">
            <div className='numscroller numscroller-big-bottom' data-slno='1' data-min='0' data-max='1200'
              data-delay='.5' data-increment="1">Finance
            </div>
            <h4 className="stats-info">Options Available</h4>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    </div>
  );
};

export {Stats};