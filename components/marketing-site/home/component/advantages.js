import React from 'react';

const Advantage = () => {
  return (
    <div className="what-w3ls">
      <div className="container">
        <h3 className="w3ls_head">Rainwater Harvesting<br/>
          <span> with Residential Solar</span> </h3>
        <p className="para custom-para">Equip your home with state of the art solar and save money.</p>
        <div className="what-grids">
          <div className="col-md-6 what-grid">
            <div className="list-img">
              <img src="images/5.jpg" className="img-responsive" alt=""/>
              <div className="textbox"></div>
            </div>
          </div>
          <div className="col-md-6 what-grid1">
            <div className="what-top">
              <div className="what-left">
                <i className="glyphicon glyphicon-tree-deciduous" aria-hidden="true"></i>
              </div>
              <div className="what-right">
                <h4>Rainwater Harvesting</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aut dignissimos ea est,
                                    impedit incidunt, laboriosam </p>
              </div>
              <div className="clearfix"></div>
            </div>
            <div className="what-top1">
              <div className="what-left">
                <i className="glyphicon glyphicon-flash" aria-hidden="true"></i>
              </div>
              <div className="what-right">
                <h4>Home Energy Saving</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aut dignissimos ea est,
                                    impedit incidunt, laboriosam </p>
              </div>
              <div className="clearfix"></div>
            </div>
            <div className="what-top1">
              <div className="what-left">
                <i className="glyphicon glyphicon-fire" aria-hidden="true"></i>
              </div>
              <div className="what-right">
                <h4>Wind Power</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aut dignissimos ea est,
                                    impedit incidunt, laboriosam </p>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
          <div className="clearfix"></div>
        </div>

      </div>
    </div>
  );
};

export { Advantage };