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
                <Head>
                    <link
                        href="//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i&subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese"
                        rel="stylesheet"/>
                    <link href="//fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"/>
                    <link href="/css/font-awesome.min.css" rel="stylesheet" type="text/css" media="all"/>
                    <link href="/css/bootstrap.min.css" rel="stylesheet" type="text/css" media="all"/>
                    <link href="/css/style.css" rel="stylesheet" type="text/css" media="all"/>
                    <link href="/css/skdslider.css" rel="stylesheet"/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
                {/*<script type="text/javascript" src="js/jquery-2.1.4.min.js" />*/}
                <script src="/js/skdslider.min.js"/>
            </Html>
        );
    }
}

export default MyDocument;