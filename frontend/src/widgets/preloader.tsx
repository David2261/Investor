import { useEffect } from "react";
import styles from "@/styles/widgets/Preloader.module.css";


const Preloader = () => {
	useEffect(() => {
		function domReady(callback: any) {
			if (document.readyState === 'interactive' || document.readyState === 'complete') {
				callback();
			} else {
				document.addEventListener('DOMContentLoaded', callback);
			}
		}

		const domReadyPromise = new Promise((resolve) => {
			domReady(resolve);
		});

		domReadyPromise.then(() => {
			setTimeout(() => {
				document.querySelectorAll("#ctn-preloader").forEach((e) => {
					e.classList.add(styles.loaded);
				});

				Array.from(document.getElementsByTagName('body')).forEach(e => {
					e.classList.remove(styles["no-scroll-y"]);
				});

				const preloader = document.querySelector('#preloader');
				if (preloader) {
					setTimeout(() => {
						preloader.remove();
					}, 1000);
				}
			}, 3000);
		});
	}, []);

	return (
		<section>
			<div id="preloader">
				<div id="ctn-preloader" className={styles["ctn-preloader"]}>
					<div className={styles["animation-preloader"]}>
						<div className={styles.spinner}></div>
						<div className={styles["txt-loading"]}>
							{['L', 'O', 'A', 'D', 'I', 'N', 'G'].map((letter, index) => (
								<span
									key={index}
									data-text-preloader={letter}
									className={styles["letters-loading"]}
								>
									{letter}
								</span>
							))}
						</div>
					</div>
					<div className={`${styles["loader-section"]} ${styles["section-left"]}`}></div>
					<div className={`${styles["loader-section"]} ${styles["section-right"]}`}></div>
				</div>
			</div>
		</section>
	);
};

export default Preloader;
