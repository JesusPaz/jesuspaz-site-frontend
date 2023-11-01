import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
                    />
                    <script src="https://unpkg.com/react/umd/react.production.min.js"></script>
                    <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
                    <script src="https://unpkg.com/prop-types/prop-types.min.js"></script>
                    <script src="https://unpkg.com/recharts/umd/Recharts.js"></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;