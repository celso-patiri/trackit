import styled from 'styled-components';

export default function DayCheckbox({ weekDay, toggle, isChecked, disabled }) {
	return (
		<Checkbox
			onChange={toggle}
			weekday={weekDay}
			checked={isChecked}
			disabled={disabled}
			type="checkbox"
		/>
	);
}

const Checkbox = styled.input`
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

	box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.2);

	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;

	&::after {
		content: '${(props) => props.weekday}';
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
