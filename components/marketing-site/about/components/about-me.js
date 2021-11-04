import React from "react";

const AboutMe = () => {
    return (
        <div className="services-w3ls">
            <div className="container">
                <h2 className="w3ls_head">About <span>Us</span></h2>
                <div className="agile_banner_bottom_grids">
                    <div className="col-md-6 w3layouts_about_grid_left">
                        <h4>About Solar Energy</h4>
                        <p>Cras molestie lacus et libero vehicula semper. Pellentesque ac leo quis enim
                            ultrices mollis. Duis ornare in dolor non ultricies. Integer nec sem diam.
                            In sed urna at mi fringilla malesuada.
                            <i>"Aenean efficitur vitae ligula eget vulputate.
                                Donec id ligula lorem. Nam ipsum odio, rutrum a nisl non, scelerisque iaculis ex.</i>
                            Integer mattis efficitur scelerisque. Phasellus malesuada metus vitae orci condimentum,
                            non blandit lacus consectetur. </p>
                    </div>
                    <div className="col-md-6 w3layouts_about_grid_right">
                        <iframe src="https://player.vimeo.com/video/25401444"></iframe>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        </div>
    )
}
export {AboutMe}