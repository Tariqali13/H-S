import React from "react";

const Stats = () => {
  return (
    <div className="stats">
      <div className="container">
        <div className="stats-info">
          <div className="col-md-3 col-sm-3 stats-grid slideanim">
            <div className='numscroller numscroller-big-bottom' data-slno='1' data-min='0' data-max='1200'
              data-delay='.5' data-increment="1">1200
            </div>
            <h4 className="stats-info">Followers</h4>
          </div>
          <div className="col-md-3 col-sm-3 stats-grid slideanim">
            <div className='numscroller numscroller-big-bottom' data-slno='1' data-min='0' data-max='3000'
              data-delay='.5' data-increment="1">3000
            </div>
            <h4 className="stats-info">Support</h4>
          </div>
          <div className="col-md-3 col-sm-3 stats-grid slideanim">
            <div className='numscroller numscroller-big-bottom' data-slno='1' data-min='0' data-max='9000'
              data-delay='.5' data-increment="10">9000
            </div>
            <h4 className="stats-info">Clients</h4>
          </div>
          <div className="col-md-3 col-sm-3 stats-grid slideanim">
            <div className='numscroller numscroller-big-bottom' data-slno='1' data-min='0' data-max='169'
              data-delay='.5' data-increment="1">169
            </div>
            <h4 className="stats-info">Awards</h4>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    </div>
  );
};

export {Stats};