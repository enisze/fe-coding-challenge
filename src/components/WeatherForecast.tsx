'use client'
import Image from 'next/image'

import type { ForecastSpace, ForecastWeatherNearby } from '@/app/types/forecast'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'

type ForecastProps = {
	forecast: ForecastWeatherNearby
}

export const WeatherForecast = ({ forecast }: ForecastProps) => {
	return (
		<Accordion type="single" collapsible className="w-full space-y-4">
			{forecast.items.map((item, index) => (
				<ForecastDay key={index} item={item} />
			))}
		</Accordion>
	)
}

const ForecastDay = ({ item }: { item: ForecastWeatherNearby['items'][0] }) => {
	const date = new Date(item.summary.date ?? '')
	const formattedDate = date.toLocaleDateString('de')

	// Get the first available icon for the day summary
	const dayIconUrl = item.spaces[0]?.weather.iconUrl

	return (
		<AccordionItem value={item.summary.date ?? ''} className="border-none">
			<Card>
				<AccordionTrigger className="px-6 py-4 w-full hover:no-underline">
					<div className="flex items-center justify-between w-full">
						<div className="flex items-center gap-4">
							{dayIconUrl && (
								<div className="w-12 h-12 relative flex-shrink-0">
									<Image
										src={dayIconUrl}
										alt="Weather icon"
										fill
										className="object-contain"
									/>
								</div>
							)}
							<div className="text-left">
								<h3 className="font-medium">{formattedDate}</h3>
								<p className="text-sm text-muted-foreground">
									{item.summary.temperature.min}° -{' '}
									{item.summary.temperature.max}°
								</p>
							</div>
						</div>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					<CardContent className="pb-4 pt-0">
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
							{item.spaces.map((space, spaceIndex) => (
								<DailyForecastDetail key={spaceIndex} space={space} />
							))}
						</div>
					</CardContent>
				</AccordionContent>

				<details open className="sr-only">
					<summary>
						{item.spaces.map((space, spaceIndex) => (
							<DailyForecastDetail key={spaceIndex} space={space} />
						))}
					</summary>
				</details>
			</Card>
		</AccordionItem>
	)
}

const DailyForecastDetail = ({ space }: { space: ForecastSpace }) => {
	return (
		<div className="flex flex-col items-center p-3 rounded-lg bg-muted/90">
			<h4 className="font-medium mb-2">{space.typeLabel}</h4>
			{space.weather.iconUrl && (
				<div className="w-10 h-10 relative mb-2">
					<Image
						src={space.weather.iconUrl || '/placeholder.svg'}
						alt={`${space.typeLabel} weather`}
						width={100}
						height={100}
						className="object-contain w-[100px] h-[20px] "
					/>
				</div>
			)}
			<p className="text-sm">
				{space.temperature.min}° - {space.temperature.max}°
			</p>
		</div>
	)
}
