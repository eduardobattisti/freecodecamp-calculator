import React from 'react';
import propTypes from 'prop-types';

const OutputScreen = (props) => {
	const { value, className } = props;

	return (
		<div className={className}>
			<h3>{value}</h3>
		</div>
	);
};

OutputScreen.propTypes = {
	value: propTypes.string,
	className: propTypes.string,
};

OutputScreen.defaultProps = {
	value: '',
	className: '',
};

export default OutputScreen;
