import React from 'react';
import propTypes from 'prop-types';

const Button = (props) => {
	const {
		id, value, onClick, className,
	} = props;

	return (
		<button type="button" id={id} onClick={onClick} className={className}>{value}</button>
	);
};

Button.propTypes = {
	id: propTypes.string.isRequired,
	value: propTypes.string.isRequired,
	onClick: propTypes.func.isRequired,
	className: propTypes.string.isRequired,
};

export default Button;
