const PATHS = {
	search: 'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM15.5 15.5 20 20',
	menu: 'M4 7h16M4 12h16M4 17h16',
	close: 'M6 6l12 12M18 6 6 18',
	'chevron-down': 'M6 9l6 6 6-6',
	'arrow-right': 'M5 12h14M13 6l6 6-6 6',
	external: 'M14 5h5v5M19 5l-8 8M18 14v5H5V6h5',
	link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
	check: 'M5 12.5l4.5 4.5L19 7',
	play: 'M8 5.5v13l10.5-6.5L8 5.5Z',
	chat: 'M4 5h16v11h-9l-5 4v-4H4V5Z',
	verified:
		'M12 3l7.5 3v5.5c0 4.4-3.1 8-7.5 9.5-4.4-1.5-7.5-5.1-7.5-9.5V6L12 3ZM8.5 12l2.5 2.5 4.5-5',
	mail: 'M3.5 6h17v12h-17V6Zm0 0 8.5 7 8.5-7',
	lock: 'M6 11h12v9H6v-9Zm2.5 0V8a3.5 3.5 0 0 1 7 0v3',
	user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20a7.5 7.5 0 0 1 15 0',
	pin: 'M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
	send: 'M4 12 20 4l-4 16-4.5-6.5L4 12Zm7.5 1.5L20 4',
	calculator: 'M6 3h12v18H6V3Zm2.5 3h7v3h-7V6Zm0 6.5h1m2.5 0h1m2.5 0h1m-7 3.5h1m2.5 0h1m2.5 0h1',
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
