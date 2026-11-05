import type { ReactNode } from 'react';

import styles from './Container.module.css';

export type ContainerProps = {
	children: ReactNode;
	as?: 'div' | 'section' | 'header' | 'footer';
	className?: string;
};

/** Content width (77rem) with the fluid page gutter. */
export function Container({ children, as: Tag = 'div', className }: ContainerProps) {
	return (
		<Tag className={className ? `${styles.root} ${className}` : styles.root}>{children}</Tag>
	);
}
