import { z } from 'zod'

export const paramsSchema = z.object({
	locationCode: z.string(),
})

export const locationSchema = z.object({
	name: z.string().nullable(),
	code: z.string().nullable(),
	slug: z.string().nullable(),
	timezone: z.string().nullable(),
	coordinates: z.object({
		latitude: z.number(),
		longitude: z.number(),
	}),
})

const tempSchema = z.object({
	min: z.number().nullable(),
	max: z.number().nullable(),
	avg: z.number().nullable().optional(),
})

const weatherSchema = z.object({
	icon: z.string().nullable(),
	text: z.string().nullable(),
	iconUrl: z.string(),
})

export const forecastSchema = z.object({
	items: z.array(
		z.object({
			summary: z.object({
				date: z.string().nullable(),
				temperature: tempSchema,
				weather: z.object({
					state: z.number().nullable(),
					icon: z.string().nullable(),
					text: z.string().nullable(),
					iconUrl: z.string(),
				}),
			}),
			spaces: z.array(
				z.object({
					type: z.enum(['morning', 'night', 'afternoon', 'evening']),
					typeLabel: z.string(),
					from: z.string().nullable(),
					to: z.string().nullable(),
					weather: weatherSchema,
					temperature: tempSchema,
				}),
			),
		}),
	),
})
