import React from 'react';

import './style.scss';

// import propTypes from 'prop-types';

import { Button } from '../components';

const Calculator = () => {
	const numberButtons = [];

	for (let i = 0; i < 10; i += 1) {
		numberButtons.push(<Button id={i} value={i} className={i === 0 ? 'horizontalButton' : 'defaultButton'} />);
		if (i === 3) {
			numberButtons.push(<Button id="subtraction" value="-" className="defaultButton" />);
		} else if (i === 6) {
			numberButtons.push(<Button id="addition" value="+" className="defaultButton" />);
		} else if (i === 9) {
			numberButtons.push(<Button id="equal" value="=" className="verticalButton" />);
		}
	}

	return (
		<div className="calculator">
			<Button id="clear" value="AC" className="horizontalButton" />
			<Button id="divide" value="/" className="defaultButton" />
			<Button id="multiply" value="X" className="defaultButton" />
			{numberButtons}
			<Button id="decimal" value="." className="defaultButton" />
		</div>
	);
};

export default Calculator;
