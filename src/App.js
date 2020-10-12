import React, { useRef, useEffect } from 'react';
import { motion, animate, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const Grid = styled.main`
	height: 100vh;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(2, 1fr);
	place-items: center;

	@media (max-width: 900px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 600px) {
		gap: 70px;
		grid-template-columns: 1fr;
	}
`;

const Container = styled(motion.div)`
	background: rgba(255, 255, 255, 0.2);
	border-radius: 30px;
	display: flex;
	height: 200px;
	overflow: hidden;
	place-content: center;
	place-items: center;
	width: 200px;
`;

const BasicBox = styled(motion.div)`
	background: white;
	border-radius: 10px;
	height: 80px;
	width: 80px;
`;

const Text = styled.p`
	font-size: 91px;
	color: white;
`;

const Card = styled(motion.div)`
	background: white;
	border-radius: 10px;
	display: flex;
	height: 80px;
	overflow: hidden;
	place-content: center;
	place-items: center;
	width: 200px;
`;

const Counter = ({ from, to }) => {
	const nodeRef = useRef();

	useEffect(() => {
		const node = nodeRef.current;

		const controls = animate(from, to, {
			duration: 5,
			ease: 'easeIn',
			loop: Infinity,
			repeatDelay: 6,
			onUpdate(value) {
				node.textContent = value.toFixed(0);
			},
		});

		return () => controls.stop();
	}, [from, to]);

	return <Text ref={nodeRef} />;
};

const App = () => {
	const constraintsRef = useRef(null);

	return (
		<Grid>
			<BasicBox
				animate={{ scale: 2 }}
				transition={{
					duration: 0.7,
					ease: 'easeInOut',
					loop: Infinity,
					repeatDelay: 1,
				}}
			/>

			<BasicBox
				animate={{
					scale: [1, 2, 2, 1, 1],
					rotate: [0, 0, 270, 270, 0],
					borderRadius: ['20%', '20%', '50%', '50%', '20%'],
				}}
				transition={{
					duration: 1,
					ease: 'easeInOut',
					loop: Infinity,
					repeatDelay: 1,
				}}
			/>

			<BasicBox whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} />

			<Container ref={constraintsRef}>
				<BasicBox drag dragConstraints={constraintsRef} />
			</Container>

			<Counter from={0} to={100} />

			<AnimatePresence initial={true}>
				<Card
					positionTransition
					initial={{ opacity: 0, y: 50, scale: 0.3 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{
						duration: 2,
						ease: 'easeInOut',
						loop: Infinity,
						repeatDelay: 3,
					}}
					exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
				/>
			</AnimatePresence>
		</Grid>
	);
};

export default App;
