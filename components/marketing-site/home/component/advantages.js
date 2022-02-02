import React from 'react';

const Advantage = () => {
  return (
    <div className="what-w3ls">
      <div className="container">
        <h3 className="w3ls_head">Benefits of Solar<br/>
          <span> With H&S Electric Company</span> </h3>
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
                <h4>Environmentally Friendly</h4>
                <p>Clean energy to save hundreds of tons of CO2</p>
              </div>
              <div className="clearfix"></div>
            </div>
            <div className="what-top1">
              <div className="what-left">
                <i className="glyphicon glyphicon-flash" aria-hidden="true"></i>
              </div>
              <div className="what-right">
                <h4>Energy Savings</h4>
                <p>Save money on electricity and get rid of your power bill</p>
              </div>
              <div className="clearfix"></div>
            </div>
            <div className="what-top1">
              <div className="what-left">
                <i className="glyphicon glyphicon-fire" aria-hidden="true"></i>
              </div>
              <div className="what-right">
                <h4>Tax Credits</h4>
                <p>Take advantage of state and federal incentives</p>
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