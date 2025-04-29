import "@/styles/widgets/Preloader.css";


const Preloader = () => {
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
		setTimeout(function() {
			document.querySelectorAll("#ctn-preloader").forEach((e) => {e.classList.add('loaded')});
			Array.from(document.getElementsByTagName('body')).forEach(e => e.classList.remove('no-scroll-y'));
		
			const preloader = document.querySelector('#preloader');
			if (preloader) {
				setTimeout(() => {
				preloader.remove();
				}, 1000);
			}
		}, 3000);
	});

	return (
		<section>
			<div id="preloader">
				<div id="ctn-preloader" className="ctn-preloader">
					<div className="animation-preloader">
						<div className="spinner"></div>
						<div className="txt-loading">
							<span data-text-preloader="L" className="letters-loading">
								L
							</span>
							
							<span data-text-preloader="O" className="letters-loading">
								O
							</span>
							
							<span data-text-preloader="A" className="letters-loading">
								A
							</span>
							
							<span data-text-preloader="D" className="letters-loading">
								D
							</span>
							
							<span data-text-preloader="I" className="letters-loading">
								I
							</span>
							
							<span data-text-preloader="N" className="letters-loading">
								N
							</span>
							
							<span data-text-preloader="G" className="letters-loading">
								G
							</span>
						</div>
					</div>	
					<div className="loader-section section-left"></div>
					<div className="loader-section section-right"></div>
				</div>
			</div>
		</section>
	);
}

export default Preloader;