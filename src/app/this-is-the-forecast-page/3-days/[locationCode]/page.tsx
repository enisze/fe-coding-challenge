import { z } from 'zod'

const paramsSchema = z.object({
	locationCode: z.string(),
})

const locationSchema = z.object({
	coordinates: z.object({
		latitude: z.number(),
		longitude: z.number(),
	}),
})

const forecastSchema = z.object({
	items: z.array(
		z.object({
			summary: z.object({
				date: z.string(),
				temperature: z.object({
					min: z.number(),
					max: z.number(),
				}),
			}),
		}),
	),
})

const Page = async ({
	params,
}: {
	params: Promise<unknown>
}) => {
	const resolvedParams = await params

	const { locationCode } = paramsSchema.parse(resolvedParams)

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

	console.log(parsedForecast)

	return <div>{}</div>
}

export default Page
