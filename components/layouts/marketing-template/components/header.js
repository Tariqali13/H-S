import React from 'react';
import Link from 'next/link';
import {useRouter} from "next/router";

const Header = () => {
    const router = useRouter();
    const {pathname} = router;
    return (
        <header>
            <div className="w3layouts-top-strip">
                <div className="container">
                    <div className="logo">
                        <h1><a href="index.html"><span>Solar </span>Panel</a></h1>
                    </div>
                    <div className="w3ls-social-icons">
                        <a className="facebook" href="#"><i className="fa fa-facebook"></i></a>
                        <a className="twitter" href="#"><i className="fa fa-twitter"></i></a>
                        <a className="pinterest" href="#"><i className="fa fa-pinterest-p"></i></a>
                        <a className="linkedin" href="#"><i className="fa fa-linkedin"></i></a>
                    </div>
                    <div className="agileits-contact-info text-right">
                        <ul>
                            <li><span className="glyphicon glyphicon-envelope" aria-hidden="true"></span><a
                                href="mailto:info@example.com">mail@example.com</a></li>
                            <li><span className="glyphicon glyphicon-earphone" aria-hidden="true"></span>+080 264 995
                            </li>
                        </ul>
                    </div>

                    <div className="clearfix"></div>
                </div>
            </div>
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><a className="active" href="index.html">Home</a></li>
                            <li><a href="about.html">About</a></li>
                            <li><a href="services.html">Services</a></li>
                            <li><a href="products.html">Products</a></li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                                   aria-haspopup="true" aria-expanded="false">Short Codes <span
                                    className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="icons.html">Icons Page</a></li>
                                    <li><a href="typo.html">Typography</a></li>

                                </ul>
                            </li>
                            <li><a href="contact.html">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export { Header };