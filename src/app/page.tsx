import { SomeImage } from '@/components/someImage'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { default as NextLink } from 'next/link'
import type React from 'react'
import styles from './page.module.css'

const HomePage: React.FC = () => {
	return (
		<div className={styles.page}>
			<main>
				<h1>wetter.com coding challenge</h1>
				<NextLink href="/forecast">go to Forecast Page</NextLink>

				<SomeImage />

				<NextLink
					href={'/this-is-the-forecast-page/7-days/DE0001020'}
					className={cn(buttonVariants({ variant: 'secondary' }), 'my-2')}
				>
					Zur 7 Tage Übersicht für Berlin
				</NextLink>
			</main>
		</div>
	)
}

export default HomePage
