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
import { cn } from '@/lib/utils'

type ForecastProps = {
	forecast: ForecastWeatherNearby
}

export const WeatherForecast = ({ forecast }: ForecastProps) => {
	const today = forecast.items[0]
	const nextDays = forecast.items.slice(1)

	return (
		<div className="space-y-6">
			{today && (
				<div>
					<h2 className="text-xl font-semibold mb-4">Heute</h2>
					<Accordion type="single" collapsible className="w-full">
						<ForecastDay item={today} isToday />
					</Accordion>
				</div>
			)}

			{nextDays.length > 0 && (
				<div>
					<h2 className="text-xl font-semibold mb-4">
						Nächsten {nextDays.length} Tage
					</h2>
					<Accordion type="single" collapsible className="w-full space-y-4">
						{nextDays.map((item, index) => (
							<ForecastDay key={index} item={item} />
						))}
					</Accordion>
				</div>
			)}
		</div>
	)
}

const ForecastDay = ({
	item,
	isToday = false,
}: { item: ForecastWeatherNearby['items'][0]; isToday?: boolean }) => {
	const date = new Date(item.summary.date ?? '')
	const formattedDate = isToday ? 'Heute' : date.toLocaleDateString('de')

	const dayIconUrl = item.summary.weather.iconUrl

	return (
		<AccordionItem
			value={item.summary.date ?? ''}
			className={cn('border-none', isToday && 'bg-blue-50/50')}
		>
			<Card>
				<AccordionTrigger className="px-6 py-4 w-full hover:no-underline">
					<div className="flex items-center justify-between w-full">
						<div className="flex items-center gap-4">
							{dayIconUrl && (
								<div className="w-12 h-12 relative flex-shrink-0">
									<Image
										src={dayIconUrl}
										alt="Wetter icon"
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
						alt={`${space.typeLabel} Wetter`}
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
