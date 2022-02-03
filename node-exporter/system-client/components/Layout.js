import Head from 'next/head';
import Script from 'next/script';
import Footer from './Footer';

export default function Layout({ children }) {
	return (
		<div>
			<Head>
				<title>ORCS System Client</title>
				<meta name="description" content="ORCS - System Surveillence Tool" />
				<link rel="icon" href="/favicon.ico" />

				<link
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
					rel="stylesheet"
				/>

				<link
					href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					rel="stylesheet"
				/>

				<link
					href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.10.2/mdb.min.css"
					rel="stylesheet"
				/>
			</Head>

			<Script
				type="text/javascript"
				src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.10.2/mdb.min.js"
			></Script>

			<div> {children} </div>

			<Footer />
		</div>
	);
}
