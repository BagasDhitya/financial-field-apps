const PATHS = {
	search: 'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM15.5 15.5 20 20',
	menu: 'M4 7h16M4 12h16M4 17h16',
	close: 'M6 6l12 12M18 6 6 18',
	'chevron-down': 'M6 9l6 6 6-6',
	'arrow-right': 'M5 12h14M13 6l6 6-6 6',
	external: 'M14 5h5v5M19 5l-8 8M18 14v5H5V6h5',
	link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
	check: 'M5 12.5l4.5 4.5L19 7',
} as const;

export type IconName = keyof typeof PATHS;

export type IconProps = {
	name: IconName;
	size?: 16 | 20 | 24;
	/** Accessible name. Omit for decorative icons next to visible text. */
	title?: string;
};

/** Inline SVG set: 1.5px stroke, square caps and joins (I1). */
export function Icon({ name, size = 20, title }: IconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.5}
			strokeLinecap="square"
			strokeLinejoin="miter"
			role={title ? 'img' : undefined}
			aria-hidden={title ? undefined : true}
			aria-label={title}
			focusable="false"
		>
			<path d={PATHS[name]} />
		</svg>
	);
}
