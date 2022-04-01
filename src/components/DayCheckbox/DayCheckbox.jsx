import styled from 'styled-components';

export default function DayCheckbox({ weekDay, toggle, disabled }) {
	return (
		<CheckboxInput onChange={toggle} weekday={weekDay} type="checkbox" disabled={disabled} />
	);
}

const CheckboxInput = styled.input`
	width: 30px;
	height: 30px;
	font-size: var(--font-size-3);
	border-radius: var(--border-radius-1);
	border: var(--input-border);
	color: var(--gray-light);
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0;
	background-color: ${({ disabled }) => (disabled ? 'var(--gray-disabled)' : '#fff')};

	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;

	&::after {
		content: '${(props) => props.day}';
	}

	&:checked {
		background-color: var(--gray-light);
		color: #fff;
	}

	&:focus {
		outline: none;
		border: var(--input-border);
	}
`;
