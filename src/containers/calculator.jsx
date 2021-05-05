import React, { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';

import './style.scss';

// import propTypes from 'prop-types';

import { Button, CalcScreen } from '../components';

const Calculator = () => {
	const numberButtons = [];
	const numbers = {
		0: 'zero',
		1: 'one',
		2: 'two',
		3: 'three',
		4: 'four',
		5: 'five',
		6: 'six',
		7: 'seven',
		8: 'eight',
		9: 'nine',
	};

	const [input, setInput] = useState('0');
	const [resolve, setResolve] = useState('');
	const [isEvaluate, setEvaluate] = useState(false);

	const onNumberClick = (event) => {
		const { target } = event;

		const dotsInput = input.replace(/[^.]/g, '').length;

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
	};

	const onEval = () => {
		const operations = ['X', '/', '+', '-'];

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
		if (isEvaluate) {
			setResolve(`${resolve}=${input}`);
			setEvaluate(false);
			return;
		}

		if (!(input.length === 1 && input === '0')) {
			setResolve(resolve + input[input.length - 1]);
		}
	}, [input]);

	for (let i = 0; i < 10; i += 1) {
		numberButtons.push(<Button key={`button-${i}`} id={`${numbers[i]}`} value={`${i}`} onClick={onNumberClick} className={i === 0 ? 'horizontalButton' : 'defaultButton'} />);
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
