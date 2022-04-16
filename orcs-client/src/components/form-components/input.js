const Input = (props) => {
	return (
		<div className="d-flex flex-row align-items-center mb-4">
			<i className={props.icon}></i>
			<div className="form-outline flex-fill mb-0">
				<input
					type={props.type}
					id={props.name}
					className="form-control"
					value={props.value}
					onChange={props.handleChange}
				/>
				<label className="form-label" htmlFor={props.name}>
					{props.placeholder}
				</label>
			</div>
		</div>
	);
};

export default Input;
