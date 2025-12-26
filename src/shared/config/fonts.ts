import localFont from 'next/font/local'

export const googleSans = localFont({
	src: [
		{
			path: '../assets/fonts/GoogleSans-Regular.ttf',
			weight: '400',
			style: 'normal'
		},
		{
			path: '../assets/fonts/GoogleSans-Medium.ttf',
			weight: '500',
			style: 'normal'
		},
		{
			path: '../assets/fonts/GoogleSans-Bold.ttf',
			weight: '700',
			style: 'normal'
		}
	],
	variable: '--font-google-sans',
	display: 'swap',
	fallback: ['system-ui', 'arial']
})
