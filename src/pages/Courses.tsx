import React from "react"
import { Button, IconButton, InputBase, Paper, Typography } from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search';
import { motion } from "framer-motion"

import styles from "../styles/Courses.module.css"

const Searchbar: React.FC = () => {
	return (
		<Paper component="form" className={styles.searchbar}>
			<InputBase placeholder="Corsi o appunti" />
			<IconButton aria-label="search">
				<SearchIcon />
			</IconButton>
		</Paper>
	)
}

const container = {
	hidden: { opacity: 1, scale: 0 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.1,
			staggerChildren: 0.15
		}
	}
}

const item = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1
	}
}

const Courses: React.FC = () => {
	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<Typography variant="h5" className={styles.label}>Corsi</Typography>
				<Searchbar />
				<Button className={styles.filterButton}>Filtra</Button>
			</header>
			<motion.main
				variants={container}
				initial="hidden"
				animate="visible"
				className={styles.cardsContainer}
			>
				{[1,2,3,4,5,6].map((index) => {
					return(
						<motion.div
							variants={item}
							className={styles.cards}
							key={index}
							whileHover={{
								scale: 1.05,
								transition: { duration: .1 },
							  }}
						>
							<Paper>
								<Typography>Hello there</Typography>
							</Paper>
						</motion.div>
					)
				})}
			</motion.main>
		</div>
	)
}

export default Courses