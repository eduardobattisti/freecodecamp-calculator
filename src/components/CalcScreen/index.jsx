import React from 'react';
import propTypes from 'prop-types';

const OutputScreen = (props) => {
	const { id, value, className } = props;

	return (
		<div id={id || 'formula'} className={className}>
			<h3>{value}</h3>
		</div>
	);
};

OutputScreen.propTypes = {
	id: propTypes.string,
	value: propTypes.string,
	className: propTypes.string,
};

OutputScreen.defaultProps = {
	id: 'formula',
	value: '',
	className: '',
};

export default OutputScreen;
