import React from 'react';

const OverView = () => {
    return (
        <div className="overview w3-2">
            <div className="container">
                <h3 className="w3ls_head">Services <span>Overview</span></h3>
                <div className="overview-grids">
                    <div className="col-md-4 list-grid">
                        <div className="list-img">
                            <img src="images/g4.jpg" className="img-responsive" alt=" "/>
                                <div className="textbox">
                                </div>
                        </div>
                        <h4>Doloremque</h4>
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                            laudantium, totam rem aperiam, eaque ipsa quae </p>
                    </div>
                    <div className="col-md-4 list-grid">
                        <div className="list-img">
                            <img src="images/g7.jpg" className="img-responsive" alt=" "/>
                                <div className="textbox">
                                </div>
                        </div>
                        <h4>Exercitationem</h4>
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                            laudantium, totam rem aperiam, eaque ipsa quae </p>
                    </div>
                    <div className="col-md-4 list-grid">
                        <div className="list-img">
                            <img src="images/g9.jpg" className="img-responsive" alt=" "/>
                                <div className="textbox">
                                </div>
                        </div>
                        <h4>Voluptatibus</h4>
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                            laudantium, totam rem aperiam, eaque ipsa quae </p>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        </div>
    )
}
export {OverView};