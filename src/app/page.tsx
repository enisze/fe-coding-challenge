import { SomeImage } from '@/components/someImage'
import NextLink from 'next/link'
import type React from 'react'

const HomePage: React.FC = () => {
	return (
		<main>
			<h1>wetter.com coding challenge</h1>
			<NextLink href="/forecast">go to Forecast Page</NextLink>
			<SomeImage />
		</main>
	)
}

export default HomePage
