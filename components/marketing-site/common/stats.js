import React from "react";

const Stats = () => {
  return (
    <div className="stats">
      <div className="container">
        <div className="stats-info">
          <div className="col-md-3 col-sm-12 stats-grid slideanim">
            <div className='numscroller numscroller-big-bottom'>24/7
            </div>
            <h4 className="stats-info"> Monitoring </h4>
          </div>
          <div className="col-md-3 col-sm-12 stats-grid slideanim">
            <div className='numscroller numscroller-big-bottom'>Satisfaction
            </div>
            <h4 className="stats-info">Guarantee</h4>
          </div>
          <div className="col-md-3 col-sm-12 stats-grid slideanim">
            <div className='numscroller numscroller-big-bottom'>100%
            </div>
            <h4 className="stats-info">Satisfaction</h4>
          </div>

          <div className="col-md-3 col-sm-12 stats-grid slideanim">
            <div className='numscroller numscroller-big-bottom' >Finance
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