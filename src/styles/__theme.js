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
		--text-disabled: #AFAFAF;


		--input-border: 2px solid var(--gray-light);
		--input-width: 70%;
		--input-heigth: 7vh;	
		
		--header-height: 12vh;
		--footer-height: 12vh;

		--border-radius-1: 5px;
		--font-size-1: 14px;
		--font-size-2: 16px;
		--font-size-3: 18px;
		--font-size-4: 20px;
		--font-size-5: 23px;
		--font-size-6: 39px;
	}

	*,
	*::after,
	*::before {
		box-sizing: border-box;
	}

	html {
		font-family: 'Lexend Deca', sans-serif;
	}

	header {
		font-family: 'Playball', cursive;
	}

	main{
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: var(--gray-background);
		min-height:calc(100vh - var(--header-height) - var(--footer-height));
		height: calc(100% - var(--header-height) - var(--footer-height));
		margin-top: var(--header-height);
		margin-bottom: var(--footer-height);
		padding: 21px;
	}

	input{
		&:disabled {
			background: var(--gray-light);
			color: var(--text-disabled)
		}

		&::placeholder {
			color: var(--gray-light);
		}

		&:focus {
			outline: 2px solid var(--blue-light);
			border:	2px solid rgba(0,0,0,0);
		}
	}
	
`;

export default AppTheme;
