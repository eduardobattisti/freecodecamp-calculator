import React, { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';

import './style.scss';

// import propTypes from 'prop-types';

import { Button, CalcScreen } from '../components';

const Calculator = () => {
	const numberButtons = [];

	const [input, setInput] = useState('0');
	const [resolve, setResolve] = useState('');
	const [isEvaluate, setEvaluate] = useState(false);

	const onNumberClick = (event) => {
		const { target } = event;

		const dotsInput = input.replace(/[^.]/g, '').length;

<<<<<<< HEAD
		if (resolve.indexOf('=') > -1) {
			return;
		}

=======
>>>>>>> 531da171a33fdacf032af03f96047e03b80faa56
		if (input === '0' && input.length === 1) {
			setInput(target.innerText);
			return;
		}

		if (dotsInput === 1 && target.innerText === '.') {
			return;
		}

		if (!Number.isNaN(Number(input))) {
			setInput(input + target.innerText);
		} else {
			setInput(target.innerText);
		}
	};

	const onClear = () => {
		setInput('0');
		setResolve('');
	};

	const onEval = () => {
		const operations = ['X', '/', '+', '-'];

		if (!resolve) {
			return;
		}

<<<<<<< HEAD
		if (resolve.indexOf('=') > -1) {
			return;
		}

		if (isEvaluate) {
			const equalIndex = resolve.indexOf('=') + 1 + 1;
			const expressionRest = resolve.length;
			const expressionTotal = resolve.slice(equalIndex, expressionRest);
=======
		if (isEvaluate) {
			const equalIndex = resolve.indexOf('=') + 1;
			const expressionRest = resolve.length;
			const expressionTotal = resolve.slice(equalIndex, expressionRest);
			console.log(expressionTotal);
>>>>>>> 531da171a33fdacf032af03f96047e03b80faa56
			setResolve(expressionTotal);
			setInput('');
			return;
		}

		if (operations.includes(resolve[resolve.length - 1])) {
			const resolveEnd = resolve.slice(0, resolve.length - 1);
			setInput(resolveEnd);
			setEvaluate(true);
			return;
		}

		const evaluation = evaluate(resolve.replace('X', '*'));

		setInput(`${evaluation}`);
		setEvaluate(true);
<<<<<<< HEAD
=======
		console.log(isEvaluate);
>>>>>>> 531da171a33fdacf032af03f96047e03b80faa56
	};

	useEffect(() => {
		if (isEvaluate) {
			setResolve(`${resolve}=${input}`);
<<<<<<< HEAD
			setEvaluate(false);
=======
>>>>>>> 531da171a33fdacf032af03f96047e03b80faa56
			return;
		}

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
