import React from 'react';

import './style.scss';

// import propTypes from 'prop-types';

import { Button } from '../components';

const Calculator = () => {
	const numberButtons = [];

	for (let i = 0; i < 10; i += 1) {
		numberButtons.push(<Button id={i} value={i} className={i === 0 ? 'zeroButton' : 'defaultButton'} />);
	}

	return (
		<div className="calculator">
			{numberButtons}
			<Button id="decimal" value="." className="defaultButton" />
		</div>
	);
};

export default Calculator;
