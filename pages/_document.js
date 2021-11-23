import Document, {Html, Head, Main, NextScript} from 'next/document';
import React from "react";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return {...initialProps};
    }

    render() {
        return (
            <Html>
                <Head />
                <body>
                <Main/>
                <NextScript/>
                </body>
                {/*<script type="text/javascript" src="js/jquery-2.1.4.min.js" />*/}
            </Html>
        );
    }
}

export default MyDocument;