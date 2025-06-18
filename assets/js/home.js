// Slider
const slider = document.querySelector('.brand-area-brands');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
	isDown = true;
	slider.classList.add('dragging');
	startX = e.pageX - slider.offsetLeft;
	scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
	isDown = false;
	slider.classList.remove('dragging');
});

slider.addEventListener('mouseup', () => {
	isDown = false;
	slider.classList.remove('dragging');
});

slider.addEventListener('mousemove', (e) => {
	if (!isDown) return;
	e.preventDefault();
	const x = e.pageX - slider.offsetLeft;
	const walk = (x - startX) * 1; // scroll speed
	slider.scrollLeft = scrollLeft - walk;
});
// Progress
document.addEventListener('DOMContentLoaded', function () {
	const items = document.querySelectorAll('.home-skills-progress-item');

	function animateCircles() {
		items.forEach(item => {
			const circle = item.querySelector('.progress');
			const percent = parseInt(item.getAttribute('data-percent'), 10);
			const radius = 55;
			const circumference = 2 * Math.PI * radius;
			const offset = circumference - (percent / 100) * circumference;

			// Only animate if not already animated
			if (!item.classList.contains('animated')) {
				circle.style.strokeDashoffset = offset;
				item.classList.add('animated');
			}
		});
	}

	function isInViewport(el) {
		const rect = el.getBoundingClientRect();
		return rect.top < window.innerHeight && rect.bottom > 0;
	}

	function onScroll() {
		const container = document.querySelector('.home-skills');
		if (isInViewport(container)) {
			animateCircles();
			window.removeEventListener('scroll', onScroll); // Animate once
		}
	}

	window.addEventListener('scroll', onScroll);
	onScroll(); // in case it's already in view
});
// Number increment
document.addEventListener("DOMContentLoaded", function () {
	const counters = document.querySelectorAll(".home-growth-program-item-counter");
	let started = false;

	function animateCounter(el, target, suffix = "") {
		const duration = 2000;
		const startTime = performance.now();

		function update(currentTime) {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);
			const value = Math.floor(progress * target);
			el.textContent = value + suffix;
			if (progress < 1) {
				requestAnimationFrame(update);
			}
		}
		requestAnimationFrame(update);
	}

	function checkScroll() {
		const section = document.querySelector(".home-growth-program");
		const rect = section.getBoundingClientRect();
		const inView = rect.top < window.innerHeight && rect.bottom > 0;

		if (inView && !started) {
			started = true;
			counters.forEach(counter => {
				const target = parseInt(counter.getAttribute("data-target"));
				const suffix = counter.getAttribute("data-suffix") || "";
				animateCounter(counter, target, suffix);
			});
		}
	}

	window.addEventListener("scroll", checkScroll);
	checkScroll(); // Run once on load
});