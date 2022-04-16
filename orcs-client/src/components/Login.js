import { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from '../api/axios';
import histroy from '../history';

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			name: '',
			password: '',
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit(evt) {
		evt.preventDefault();
		const payload = {
			email: this.state.email,
			password: this.state.password,
			name: this.state.name,
		};

		try {
			const { data } = await axios.post('/login', payload);
			if (data.success == true) {
				window.localStorage.setItem('jwt', JSON.stringify(data.token));
				history.go('/');
			}
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	}

	render() {
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
												Login
											</p>

											<form
												onSubmit={this.handleSubmit}
												className="mx-1 mx-md-4"
											>
												<div className="d-flex flex-row align-items-center mb-4">
													<i className="fas fa-user fa-lg me-3 fa-fw"></i>
													<div className="form-outline flex-fill mb-0">
														<input
															type="text"
															id="name"
															className="form-control"
															value={this.state.name}
															onChange={(e) =>
																this.setState({ name: e.target.value })
															}
														/>
														<label className="form-label" htmlFor="name">
															Name
														</label>
													</div>
												</div>

												<div className="d-flex flex-row align-items-center mb-4">
													<i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
													<div className="form-outline flex-fill mb-0">
														<input
															type="text"
															id="email"
															className="form-control"
															value={this.state.email}
															onChange={(e) =>
																this.setState({ email: e.target.value })
															}
														/>
														<label className="form-label" htmlFor="email">
															Email
														</label>
													</div>
												</div>

												<div className="d-flex flex-row align-items-center mb-4">
													<i className="fas fa-lock fa-lg me-3 fa-fw"></i>
													<div className="form-outline flex-fill mb-0">
														<input
															type="text"
															id="password"
															className="form-control"
															value={this.state.password}
															onChange={(e) =>
																this.setState({ password: e.target.value })
															}
														/>
														<label className="form-label" htmlFor="password">
															Password
														</label>
													</div>
												</div>

												<div className="dropdown">
													<a
														className="dropdown-toggle"
														role="button"
														id="dropdownMenuButton"
														data-mdb-toggle="dropdown"
														aria-expanded="false"
													>
														ROLE
													</a>
													<ul
														className="dropdown-menu"
														aria-labelledby="dropdownMenuButton"
													>
														<li>
															<a className="dropdown-item">Student</a>
														</li>
														<li>
															<a className="dropdown-item">Faculty</a>
														</li>
														<li>
															<a className="dropdown-item">Guest</a>
														</li>
													</ul>
												</div>

												<div>
													<div className="form-check d-flex justify-content-center mb-5">
														Not a member? &nbsp;
														<Link to="/register">Register here!</Link>
													</div>

													<div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
														<button
															type="submit"
															className="btn btn-primary btn-lg"
														>
															Login
														</button>
													</div>
												</div>
											</form>
										</div>
										<div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
											<img
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
}
