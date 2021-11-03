import  React  from 'react'

const Footer = () => {
    return (
        <div className="footer-top">
            <div className="container">
                <div className="col-md-3 w3ls-footer-top">
                    <h3>QUICK <span>LINKS</span></h3>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="products.html">Products</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>
                <div className="col-md-4 wthree-footer-top">
                    <h3>ADD<span>RESS</span></h3>
                    <ul>
                        <li><span className="glyphicon glyphicon-home" aria-hidden="true"></span> 7th Street, Melbourne
                            City, Australia.
                        </li>
                        <li><span className="glyphicon glyphicon-envelope" aria-hidden="true"></span><a
                            href="mailto:info@example.com">info@example.com</a></li>
                        <li><span className="glyphicon glyphicon-earphone" aria-hidden="true"></span> +080 264 995
                        </li>
                    </ul>
                </div>

                <div className="col-md-5 w3l-footer-top">
                    <h3>NEWS<span>LETTER</span></h3>
                    <p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit reprehenderit qui in ea.</p>

                    <form action="#" method="post" className="newsletter">
                        <input className="email" type="email" placeholder="Your email..." required=""/>
                            <input type="submit" className="submit" value=""/>
                    </form>
                </div>
                <div className="clearfix"></div>
                <div className="footer-w3layouts">
                    <div className="agile-copy">
                        <p>© 2017 Solar Panel. All rights reserved | Design by <a
                            href="http://w3layouts.com/">W3layouts</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Footer };