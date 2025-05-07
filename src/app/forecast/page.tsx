import NextLink from 'next/link'
import type React from 'react'

const ForecastPage: React.FC = () => {
	return (
		<div>
			<main>
				<h1>Forecast Page</h1>
				<NextLink href="/">go to Home Page</NextLink>
			</main>
		</div>
	)
}

export default ForecastPage
