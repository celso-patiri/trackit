import { createGlobalStyle } from 'styled-components';

const AppTheme = createGlobalStyle`
	:root {
		--blue-light: #52b6ff;
		--blue-dark: #126ba5;
		--gray-light: #dbdbdb;
		--gray-medium: #bababa;
		--gray-dark: #666666;
		--gray-background: #e5e5e5;
		--green-done: #8fc549;
		--text-light: #fff;
		
		--input-border: 2px solid var(--gray-light);
		--input-width: 70%;
		--input-heigth: 7vh;	
		
		--border-radius-1: 5px;
		--font-size-1: 14px;
		--font-size-2: 16px;
		--font-size-3: 18px;
		--font-size-4: 20px;
		--font-size-5: 23px;
	}
`;

export default AppTheme;
