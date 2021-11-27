import React from 'react';
import {Carousel} from "react-bootstrap";

const Testimonials = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Carousel fade indicators={false} arrows={false} className="owl-carousel">
                        <Carousel.Item>
                            <div className="testimonial">
                                <div className="pic">
                                    <img src="images/img-1.jpg" />
                                </div>
                                <div className="testimonial-profile">
                                    <h3 className="title">williamson</h3>
                                    <span className="post">Web Developer</span>
                                </div>
                                <p className="description">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius eros consequat
                                    auctor gravida. Fusce tristique lacus at urna sollicitudin pulvinar. Suspendisse
                                    hendrerit ultrices mauris.
                                </p>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="testimonial">
                                <div className="pic">
                                    <img src="images/img-1.jpg" />
                                </div>
                                <div className="testimonial-profile">
                                    <h3 className="title">williamson</h3>
                                    <span className="post">Web Developer 2</span>
                                </div>
                                <p className="description">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius eros consequat
                                    auctor gravida. Fusce tristique lacus at urna sollicitudin pulvinar. Suspendisse
                                    hendrerit ultrices mauris.
                                </p>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="testimonial">
                                <div className="pic">
                                    <img src="images/img-1.jpg" />
                                </div>
                                <div className="testimonial-profile">
                                    <h3 className="title">williamson</h3>
                                    <span className="post">Web Developer 3</span>
                                </div>
                                <p className="description">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius eros consequat
                                    auctor gravida. Fusce tristique lacus at urna sollicitudin pulvinar. Suspendisse
                                    hendrerit ultrices mauris.
                                </p>
                            </div>
                        </Carousel.Item>
                    </Carousel>
                    {/*<div id="testimonial-slider" className="owl-carousel">*/}
                    {/*    */}
                    {/*    <div className="testimonial">*/}
                    {/*        <div className="pic">*/}
                    {/*            <img src="images/img-2.jpg" />*/}
                    {/*        </div>*/}
                    {/*        <div className="testimonial-profile">*/}
                    {/*            <h3 className="title">Kristina</h3>*/}
                    {/*            <span className="post">Web Designer</span>*/}
                    {/*        </div>*/}
                    {/*        <p className="description">*/}
                    {/*            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius eros consequat*/}
                    {/*            auctor gravida. Fusce tristique lacus at urna sollicitudin pulvinar. Suspendisse*/}
                    {/*            hendrerit ultrices mauris.*/}
                    {/*        </p>*/}
                    {/*    </div>*/}
                    {/*    <div className="testimonial">*/}
                    {/*        <div className="pic">*/}
                    {/*            <img src="images/img-3.jpg" />*/}
                    {/*        </div>*/}
                    {/*        <div className="testimonial-profile">*/}
                    {/*            <h3 className="title">Steve Thomas</h3>*/}
                    {/*            <span className="post">Web Developer</span>*/}
                    {/*        </div>*/}
                    {/*        <p className="description">*/}
                    {/*            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius eros consequat*/}
                    {/*            auctor gravida. Fusce tristique lacus at urna sollicitudin pulvinar. Suspendisse*/}
                    {/*            hendrerit ultrices mauris.*/}
                    {/*        </p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
}
export { Testimonials };