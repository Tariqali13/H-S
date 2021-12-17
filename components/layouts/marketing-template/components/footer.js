import  React  from 'react';
import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer-top">
      <div className="container">
        <div className="col-md-5 w3ls-footer-top">
          <h3>QUICK <span>LINKS</span></h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/consultation">Consultation</Link></li>
          </ul>
        </div>
        <div className="col-md-6 wthree-footer-top">
          <h3>ADD<span>RESS</span></h3>
          <ul>
            <li><span className="glyphicon glyphicon-envelope" aria-hidden="true"></span><a
              href="mailto:office@handselectriccompany.com">office@handselectriccompany.com</a></li>
            <li><span className="glyphicon glyphicon-earphone" aria-hidden="true"></span>435-258-7330
            </li>
          </ul>
        </div>

        {/*<div className="col-md-5 w3l-footer-top">*/}
        {/*    <h3>NEWS<span>LETTER</span></h3>*/}
        {/*    <p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit reprehenderit qui in ea.</p>*/}

        {/*    <form action="#" method="post" className="newsletter">*/}
        {/*        <input className="email" type="email" placeholder="Your email..." required=""/>*/}
        {/*            <input type="submit" className="submit" value=""/>*/}
        {/*    </form>*/}
        {/*</div>*/}
        <div className="clearfix"></div>
        <div className="footer-w3layouts">
          <div className="agile-copy">
            <p>© 2021 Solar Panel. All rights reserved | Design by <a
              href="#">Aries Developers</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Footer };