import { Transition } from 'react-transition-group';

const duration = 300;

const defaultStyle = {
	transition: `${duration}ms ease-in-out`,
	flex: 0,
	minWidth: 0,
	overflow: 'hidden',
	opacity: 0,
};

const transitionStyles = margin => ({
	entering: { flex: 1, opacity: 1, margin },
	entered: { flex: 1, opacity: 1, margin },
	exiting: { flex: 0, opacity: 0, margin: 0 },
	exited: { flex: 0, opacity: 0, margin: 0 },
});

const CollapseWidth = ({
	in: inProp,
	children,
	height = '100%',
	maxHeight = 'initial',
	backgroundColor = '#fff',
	margin,
	...rest
}) => (
	<Transition in={inProp} timeout={duration}>
		{state => (
			<div
				style={{
					...defaultStyle,
					...transitionStyles(margin)[state],
					height,
					maxHeight,
					backgroundColor,
					...rest,
				}}
			>
				{children}
			</div>
		)}
	</Transition>
);

export { CollapseWidth };
