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
                    <div className="logo" >
                        <img src="/images/logo.jpg" />
                        {/*<h1><a href="index.html"><span>Solar </span>Panel</a></h1>*/}
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
                            <li><Link href="/"><a className={pathname === "/" && "active"}>Home</a></Link></li>
                            <li><Link href="/about"><a className={pathname === "/about" && "active"} >About</a></Link></li>
                            <li><Link href="/services"><a className={pathname === "/services" && "active"}>Services</a></Link></li>
                            <li><Link href="/products"><a className={pathname === "/products" && "active"}> Products</a></Link></li>
                            <li><Link href="/contact"><a className={pathname === "/contact" && "active"}>Contact</a></Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export { Header };