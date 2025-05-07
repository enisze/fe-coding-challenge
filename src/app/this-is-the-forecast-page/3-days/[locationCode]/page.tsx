import { WeatherForecast } from '@/components/WeatherForecast'
import { paramsSchema } from '@/lib/schema'
import { getForecastByDays } from '@/server/api'

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
		</div>
	)
}

export default Page
