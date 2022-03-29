import { createGlobalStyle, css } from 'styled-components';

const theme = css`
	:root {
		--blue-dark: #126ba5;
		--blue-light: #52b6ff;
		--dark-gray: #666666;
		--medium-gray: #bababa;
		--light-gray: #e7e7e7;
		--done-green: #8fc549;
		--background-gray: #e5e5e5;

		--border-radius-1: 5px;

		--font-size-1: 14px;
		--font-size-2: 16px;
		--font-size-3: 18px;
		--font-size-4: 20px;
		--font-size-5: 23px;
	}
`;

const Colors = createGlobalStyle(theme);
