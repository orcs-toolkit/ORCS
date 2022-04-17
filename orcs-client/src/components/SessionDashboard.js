import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import axios from 'axios';

export default function SessionDashboard() {
	const [user, setUser] = useState({});
	const [sessionStarted, setSession] = useState('');
	const history = useHistory();

	useEffect(() => {
		const token = localStorage.getItem('jwt');

		(async () => {
			const { data } = await axios.get(
				'http://localhost:4001/auth/currentuser',
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setUser(data.currentUser);
		})();
	}, []);

	async function handleSession(e) {
		e.preventDefault();

		const payload = {
			name: user.name,
			role: user.role,
		};

		try {
			const { data } = await axios.post('http://localhost:3001/role', payload, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Allow-Origin-With-Credentials': '*',
					'Access-Control-Allow-Origin': '*',
				},
			});
			// console.log(typeof data.success);
			if (!data.success) {
				setSession('Something went wrong, please try again');
			}

			setSession('Session started!');
		} catch (err) {
			console.log('Unable to POST payload', err);
		}
	}

	async function handleLogout(e) {
		e.preventDefault();

		localStorage.removeItem('jwt');
		history.push('/');
	}

	return (
		<section className="vh-100" style={{ backgroundColor: '#eee' }}>
			<div className="container h-100">
				<div className="row justify-content-center align-items-center h-100">
					<div className="col-lg-12 col-xl-11">
						<div className="card text-black" style={{ borderRadius: '25px' }}>
							<div className="card-body p-md-5">
								<div className="row justify-content-center">
									<div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
										<p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
											Welcome,{' '}
											<span className="text-capitalize">{user.name}</span>
										</p>

										<div>
											<h3>Please check your information</h3>
											<p className="fst-normal fs-4">
												Name:{' '}
												<span className="text-capitalize">{user.name}</span>
												<br />
												Email: {user.email}
												<br />
												Role: {user.role}
											</p>
										</div>
										<div style={{ marginTop: '10px' }} className="mb-4">
											Something wrong? &nbsp;
											<Link to="/login">Login again!</Link>
										</div>

										<form onSubmit={handleSession} className="mx-1 mx-md-4">
											<div className="d-flex mb-lg-4">
												<button
													type="submit"
													className="btn btn-primary btn-lg"
												>
													Start your session!
												</button>
											</div>
										</form>
										<form onSubmit={handleLogout} className="mx-1 mx-md-4">
											<div className="d-flex mb-lg-4">
												<button type="submit" className="btn btn-danger btn-lg">
													Logout
												</button>
											</div>
										</form>

										{sessionStarted && (
											<div className="alert alert-success" role="alert">
												{sessionStarted}
											</div>
										)}
									</div>
									<div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
										<input
											type="image"
											img
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
	);
}
