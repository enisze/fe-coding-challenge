import { forecastSchema, locationSchema } from '@/lib/schema'
import { addDays } from 'date-fns'

export const getForecastByDays = async ({
	days,
	locationCode,
}: {
	days: number
	locationCode: string
}) => {
	const locationRes = await fetch(
		`https://api.wttr.io/web-app/v1/locations/${locationCode}`,
		{
			headers: {
				token: process.env.TOKEN!,
				'X-Application-ID': 'com.wetter/web-react/coding-challenge',
			},
		},
	)

	const locationJson = await locationRes.json()

	const { latitude, longitude } = locationSchema.parse(locationJson).coordinates

	const forecastRes = await fetch(
		`https://api.wttr.io/web-app/v1/weather/forecast/${latitude}/${longitude}/`,
		{
			headers: {
				token: process.env.TOKEN!,
				'X-Application-ID': 'com.wetter/web-react/coding-challenge',
			},
		},
	)

	const forecastJson = await forecastRes.json()

	const parsedForecast = forecastSchema.parse(forecastJson)

	return {
		items: parsedForecast.items.filter((i) => {
			return new Date(i.summary.date ?? '') < addDays(new Date(), days)
		}),
	}
}
