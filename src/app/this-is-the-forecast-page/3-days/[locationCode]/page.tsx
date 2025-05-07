import { WeatherForecast } from '@/components/WeatherForecast'
import { buttonVariants } from '@/components/ui/button'
import { paramsSchema } from '@/lib/schema'
import { getForecastByDays } from '@/server/api'
import Link from 'next/link'

const Page = async ({
	params,
}: {
	params: Promise<unknown>
}) => {
	const resolvedParams = await params

	const { locationCode } = paramsSchema.parse(resolvedParams)

	const forecast = await getForecastByDays({
		days: 3,
		locationCode,
	})

	return (
		<div className="container py-4">
			<div className="text-xl font-bold">Wetterübersicht</div>
			<WeatherForecast forecast={forecast} />

			<Link
				href={`/this-is-the-forecast-page/7-days/${locationCode}`}
				className={buttonVariants({ variant: 'link' })}
			>
				Zur 7 Tage Übersicht
			</Link>

			<Link href={'/'} className={buttonVariants({ variant: 'link' })}>
				Zur HomePage
			</Link>
		</div>
	)
}

export default Page
