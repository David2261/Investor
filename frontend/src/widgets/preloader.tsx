import { useEffect } from "react";
import "@/styles/widgets/Preloader.css";


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
					e.classList.add('loaded');
				});

				Array.from(document.getElementsByTagName('body')).forEach(e => {
					e.classList.remove('no-scroll-y');
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
				<div id="ctn-preloader" className="ctn-preloader">
					<div className="animation-preloader">
						<div className="spinner"></div>
						<div className="txt-loading">
							{['L', 'O', 'A', 'D', 'I', 'N', 'G'].map((letter) => (
								<span key={letter} data-text-preloader={letter} className="letters-loading">
									{letter}
								</span>
							))}
						</div>
					</div>	
					<div className="loader-section section-left"></div>
					<div className="loader-section section-right"></div>
				</div>
			</div>
		</section>
	);
};

export default Preloader;
