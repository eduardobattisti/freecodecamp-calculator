import React, { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';

import './style.scss';

// import propTypes from 'prop-types';

import { Button, CalcScreen } from '../components';

const Calculator = () => {
	const operations = ['X', '/', '+', '-'];

	const [input, setInput] = useState('0');
	const [resolve, setResolve] = useState('');
	const [isLimit, setLimit] = useState(false);
	const [isEvaluate, setEvaluate] = useState(false);

	const onNumberClick = (event) => {
		const { target } = event;

		const dotsInput = input.replace(/[^.]/g, '').length;
		const lastSign = operations.map((elem) => resolve.lastIndexOf(elem)).sort((a, b) => a - b);

		if (input.length > 17 || input === 'Digit Limit Met') {
			setLimit(true);
			setInput('Digit Limit Met');

			setTimeout(() => {
				setInput(resolve);
			}, 1500);
			return;
		}

		if (
			operations.includes(resolve[resolve.length - 1])
			&& operations.includes(target.innerText)
			&& target.innerText !== '-'
		) {
			const partialResolve = resolve.slice(0, lastSign[lastSign.length - 2]);
			setResolve(partialResolve + target.innerText);
			return;
		}

		if (resolve.indexOf('=') > -1 && (Number.isNaN(Number(target.innerText)) && target.innerText !== '.')) {
			const equalIndex = resolve.indexOf('=') + 1;
			const expressionRest = resolve.length;
			const expressionTotal = resolve.slice(equalIndex, expressionRest);
			setResolve(expressionTotal);
			setInput(target.innerText);
			return;
		}

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
		setLimit(false);
	};

	const onEval = () => {
		if (!resolve) {
			return;
		}

		if (resolve.indexOf('=') > -1) {
			return;
		}

		if (isEvaluate) {
			const equalIndex = resolve.indexOf('=') + 1 + 1;
			const expressionRest = resolve.length;
			const expressionTotal = resolve.slice(equalIndex, expressionRest);
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

		try {
			const evaluation = evaluate(resolve.replace('X', '*'));
			setInput(`${evaluation}`);
			setEvaluate(true);
		} catch (err) {
			setResolve('');
			setInput('0');
		}
	};

	useEffect(() => {
		if (isLimit) {
			return;
		}

		if (isEvaluate) {
			setResolve(`${resolve}=${input}`);
			setEvaluate(false);
			return;
		}

		if (!(input.length === 1 && input === '0')) {
			setResolve(resolve + input[input.length - 1]);
		}
	}, [input]);

	return (
		<div className="calculator">
			<CalcScreen value={resolve} className="result" />
			<CalcScreen id="display" value={input} className="formula" />
			<div className="buttons">
				<Button id="clear" value="AC" onClick={onClear} className="horizontalButton" />
				<Button id="divide" value="/" onClick={onNumberClick} className="defaultButton" />
				<Button id="multiply" value="X" onClick={onNumberClick} className="defaultButton" />
				<Button id="seven" value="7" onClick={onNumberClick} className="defaultButton" />
				<Button id="eight" value="8" onClick={onNumberClick} className="defaultButton" />
				<Button id="nine" value="9" onClick={onNumberClick} className="defaultButton" />
				<Button id="subtract" value="-" onClick={onNumberClick} className="defaultButton" />
				<Button id="six" value="6" onClick={onNumberClick} className="defaultButton" />
				<Button id="five" value="5" onClick={onNumberClick} className="defaultButton" />
				<Button id="four" value="4" onClick={onNumberClick} className="defaultButton" />
				<Button id="add" value="+" onClick={onNumberClick} className="defaultButton" />
				<Button id="one" value="1" onClick={onNumberClick} className="defaultButton" />
				<Button id="two" value="2" onClick={onNumberClick} className="defaultButton" />
				<Button id="three" value="3" onClick={onNumberClick} className="defaultButton" />
				<Button id="zero" value="0" onClick={onNumberClick} className="horizontalButton" />
				<Button id="decimal" value="." onClick={onNumberClick} className="defaultButton" />
				<Button id="equals" value="=" onClick={onEval} className="verticalButton" />
			</div>
		</div>
	);
};

export default Calculator;
