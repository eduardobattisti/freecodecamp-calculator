import React, { useEffect, useState } from 'react';
import { evaluate } from 'mathjs';

import './style.scss';

// import propTypes from 'prop-types';

import { Button, CalcScreen } from '../components';

const Calculator = () => {
	const numberButtons = [];

	const [input, setInput] = useState('0');
	const [resolve, setResolve] = useState('');

	const onNumberClick = (event) => {
		const { target } = event;
		const operations = ['-', '+', 'X', '/'];

		if (operations.includes(target.innerText)) {
			setInput(target.innerText);
		} else if (input === '0' && input.length === 1) {
			setInput(target.innerText);
		} else if (!operations.includes(target.innerText)) {
			setInput(input + target.innerText);
		}
	};

	const onClear = () => {
		setInput('0');
		setResolve('');
	};

	const onEval = () => {
		const evaluation = evaluate(resolve.replace('X', '*'));

		setResolve(`${resolve}=${evaluation}`);
		console.log(resolve, input);
		setInput(`${evaluation}`);
		console.log(resolve, input);
	};

	useEffect(() => {
		if (!(input.length === 1 && input === '0')) {
			setResolve(resolve + input[input.length - 1]);
		}
	}, [input]);

	for (let i = 0; i < 10; i += 1) {
		numberButtons.push(<Button key={`button-${i}`} id={`${i}`} value={`${i}`} onClick={onNumberClick} className={i === 0 ? 'horizontalButton' : 'defaultButton'} />);
		if (i === 3) {
			numberButtons.push(<Button key="button-sub" id="subtract" value="-" onClick={onNumberClick} className="defaultButton" />);
		} else if (i === 6) {
			numberButtons.push(<Button key="button-add" id="add" value="+" onClick={onNumberClick} className="defaultButton" />);
		} else if (i === 9) {
			numberButtons.push(<Button key="button-equal" id="equals" value="=" onClick={onEval} className="verticalButton" />);
		}
	}

	return (
		<div className="calculator">
			<CalcScreen value={resolve} className="result" />
			<CalcScreen id="display" value={input} className="formula" />
			<div className="buttons">
				<Button id="clear" value="AC" onClick={onClear} className="horizontalButton" />
				<Button id="divide" value="/" onClick={onNumberClick} className="defaultButton" />
				<Button id="multiply" value="X" onClick={onNumberClick} className="defaultButton" />
				{numberButtons}
				<Button id="decimal" value="." onClick={onNumberClick} className="defaultButton" />
			</div>
		</div>
	);
};

export default Calculator;
