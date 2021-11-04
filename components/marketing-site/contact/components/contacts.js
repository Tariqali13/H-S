import React from 'react';

const Contacts = () => {
    return (
        <div className="contact w3l-2">
            <div className="container">
                <h2 className="w3ls_head">Contact <span>us</span></h2>
                <div className="contact-grids">
                    <div className="col-md-7 contact-grid agileinfo-5">
                        <h4>Your Message</h4>
                        <p>Lorem Ipsum is inting and typesetting in simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the is dummy text ever since the 1500s, when an unknown
                            printer took a galley of type and scrambled it to make a type specimen book.</p>
                        <form action="#" method="post">
                            <label>Name</label>
                            <input type="text" name="Name" placeholder="Your name" required=""/>
                                <label>Email</label>
                                <input type="text" name="Email" placeholder="Email address" required=""/>
                                    <label>Subject</label>
                                    <input type="text" name="Subject" placeholder="Subject" required=""/>
                                        <label>Message</label>
                                        <textarea placeholder="Message" name="Message"></textarea>
                                        <input type="submit" value="Send message"/>
                        </form>
                    </div>
                    <div className="col-md-5 contact-grid agileits-5">
                        <div className="contact-left">
                            <h4> Address</h4>
                            <div className="cont-info">
                                <h5>Address</h5>
                                <p>7th Street, Melbourne City, Australiae</p>
                                <h5>Email</h5>
                                <a href="mailto:example@mail.com"> example@mail.com</a>
                                <h5>Phone</h5>
                                <p> +080 264 995</p>
                            </div>
                        </div>
                        <div className="contact-bottom wthree-5">
                            <h4>Get connected</h4>
                            <p>Lorem Ipsum is inting and typesetting in simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been the is dummy text ever since the 1500s, when
                                an unknown printer took a galley of type and scrambled it to make a type specimen
                                book.</p>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        </div>
    // <div className="agile-info-map">
    //     <iframe
    //         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d805196.5077734194!2d144.49270863101745!3d-37.97015423820711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad646b5d2ba4df7%3A0x4045675218ccd90!2sMelbourne+VIC%2C+Australia!5e0!3m2!1sen!2sin!4v1471402362699"
    //         frameBorder="0" style="border:0" allowFullScreen></iframe>
    // </div>
    );
};

export {Contacts}