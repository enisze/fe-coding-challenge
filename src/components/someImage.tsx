import Image from 'next/image'
import type React from 'react'

//Improve using avif or webp -> Quicker decoding than jpg
//Compress (e.g. via squoosh)
export const SomeImage: React.FC = () => {
	return (
		<div>
			<Image
				src="https://cs3.wettercomassets.com/images/interview/hafen.jpg"
				alt="hafen"
				style={{ width: '500px' }}
				width={500}
				height={300}
				loading="eager"
				priority
			/>
			<div>
				Description:
				<p>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
					nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
					sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
					rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
					ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
					sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
					dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
					et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
					takimata sanctus est Lorem ipsum dolor sit amet.
				</p>
			</div>
		</div>
	)
}
