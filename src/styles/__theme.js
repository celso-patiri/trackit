import { createGlobalStyle } from 'styled-components';

const AppTheme = createGlobalStyle`
	:root {
		--blue-light: #52b6ff;
		--blue-dark: #126ba5;
		--gray-lighter: #EBEBEB;
		--gray-light: #b9b9b9;
		--gray-medium: #bababa;
		--gray-dark: #666666;
		--gray-background: #e5e5e5;
		--gray-disabled: #f2f2f2;
		--green-done: #8fc549;
		--red-incomplete: #EA5766;
		--text-light: #fff;
		--text-disabled: #8a8a8a;

		--input-border: 2px solid var(--gray-light);
		--input-width: clamp(100px, 70%, 300px); 
		--input-heigth: 7vh;	
		--habit-box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.25);

		--header-height: 12vh;
		--footer-height: 12vh;

		--border-radius-1: 5px;
		--border-radius-2: 10px;
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
			background: var(--gray-disabled);
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

	@keyframes slidein {
		from {
			transform: translateY(100%);
			opacity: 0;
		}

		to {
			transform: translateY(0);
			opacity: 1;
		}
	}
	
`;

export default AppTheme;
