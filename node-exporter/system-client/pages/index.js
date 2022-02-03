import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
	return (
		<Layout>
			<main>
				<section className="vh-100" style={{ backgroundColor: '#eee' }}>
					<div className="container h-100">
						<div className="row justify-content-center align-items-center h-100">
							<div className="col-lg-12 col-xl-11">
								<div
									className="card text-black"
									style={{ borderRadius: '25px' }}
								>
									<div className="card-body p-md-5">
										<div className="row justify-content-center">
											<div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
												<p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
													ORCS
												</p>

												<a
													role="button"
													className="card text-white bg-secondary p-md-3"
													style={{ alignItems: 'center' }}
												>
													<Link passHref href="/register">
														<h1>Register</h1>
													</Link>
												</a>

												<br />

												<a
													role="button"
													className="card text-white bg-dark p-md-3"
													style={{ alignItems: 'center' }}
												>
													<Link passHref href="/signin">
														<h1>Login</h1>
													</Link>
												</a>
											</div>
											<div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
												<Image
													width="800"
													height="500"
													src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
													className="img-fluid"
													alt="Sample image"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</Layout>
	);
}
