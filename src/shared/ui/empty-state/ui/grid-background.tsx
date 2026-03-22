const GRID_SIZE = 60
const COLS = 10
const ROWS = 8
const WIDTH = COLS * GRID_SIZE
const HEIGHT = ROWS * GRID_SIZE

const SQUARES: [number, number, number][] = [
	[0, 2, 0.08],
	[0, 5, 0.05],
	[0, 8, 0.04],
	[1, 1, 0.05],
	[1, 3, 0.06],
	[1, 6, 0.07],
	[1, 8, 0.04],
	[2, 0, 0.03],
	[2, 2, 0.07],
	[2, 4, 0.04],
	[2, 7, 0.06],
	[3, 1, 0.04],
	[3, 3, 0.06],
	[3, 6, 0.05],
	[3, 8, 0.06],
	[4, 2, 0.04],
	[4, 5, 0.06],
	[4, 7, 0.05],
	[5, 0, 0.04],
	[5, 3, 0.05],
	[5, 6, 0.03],
	[5, 8, 0.04],
	[6, 1, 0.03],
	[6, 4, 0.05],
	[6, 7, 0.04],
	[7, 2, 0.04],
	[7, 5, 0.06],
	[7, 9, 0.03]
]

export function GridBackground() {
	return (
		<svg className="absolute inset-0 size-full" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} xmlns="http://www.w3.org/2000/svg">
			<defs>
				<radialGradient id="grid-fade" cx="50%" cy="50%" r="50%">
					<stop offset="0%" stopColor="white" stopOpacity={0} />
					<stop offset="55%" stopColor="white" stopOpacity={0.4} />
					<stop offset="100%" stopColor="white" stopOpacity={1} />
				</radialGradient>
			</defs>

			<g stroke="currentColor" strokeWidth={0.5} fill="none" className="text-border">
				{Array.from({ length: COLS + 1 }, (_, i) => (
					<line key={`v-${i}`} x1={i * GRID_SIZE} y1={0} x2={i * GRID_SIZE} y2={HEIGHT} />
				))}
				{Array.from({ length: ROWS + 1 }, (_, i) => (
					<line key={`h-${i}`} x1={0} y1={i * GRID_SIZE} x2={WIDTH} y2={i * GRID_SIZE} />
				))}
			</g>

			{SQUARES.map(([row, col, opacity]) => (
				<rect
					key={`${row}-${col}`}
					x={col * GRID_SIZE}
					y={row * GRID_SIZE}
					width={GRID_SIZE}
					height={GRID_SIZE}
					fill="currentColor"
					className="text-muted-foreground"
					opacity={opacity}
				/>
			))}

			<rect width={WIDTH} height={HEIGHT} fill="url(#grid-fade)" />
		</svg>
	)
}
