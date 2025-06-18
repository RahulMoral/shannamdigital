// scroll to active sticky menu
window.addEventListener('scroll', function () {
	const mainMenu = document.querySelector('.main-menu');
	if (window.scrollY >= 140) {
		mainMenu.classList.add('sticky-menu');
	} else {
		mainMenu.classList.remove('sticky-menu');
	}
});
document.addEventListener('DOMContentLoaded', () => {
	const mobileMenu = document.querySelector('.mobile-menu');

	// Open mobile menu
	document.querySelectorAll('.main-menu-bar').forEach(bar => {
		bar.addEventListener('click', (e) => {
			mobileMenu.classList.add('mobile-menu-active');
			document.body.classList.add('mobile-menu-open');
			e.stopPropagation(); // Prevent the document click listener from firing immediately
		});
	});

	// Close mobile menu via close button
	document.querySelectorAll('.mobile-menu-close-btn').forEach(btn => {
		btn.addEventListener('click', (e) => {
			const parentMenu = e.currentTarget.closest('.mobile-menu');
			if (parentMenu) parentMenu.classList.remove('mobile-menu-active');
			document.body.classList.remove('mobile-menu-open');
			e.stopPropagation();
		});
	});

	// Close when clicking outside the menu
	document.addEventListener('click', (e) => {
		const isClickInsideMenu = mobileMenu.contains(e.target);
		const isClickOnMenuBar = e.target.closest('.main-menu-bar');
		if (!isClickInsideMenu && !isClickOnMenuBar) {
			mobileMenu.classList.remove('mobile-menu-active');
			document.body.classList.remove('mobile-menu-open');
		}
	});
});
// Scroll top button
const btn = document.getElementById("scrollToTop");
const ring = document.querySelector(".ring-fill");
const radius = 26;
const circumference = 2 * Math.PI * radius;

ring.style.strokeDasharray = circumference;

window.addEventListener("scroll", () => {
	const scrollTop = window.scrollY;
	const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
	const scrollFraction = scrollTop / scrollHeight;

	ring.style.strokeDashoffset = circumference - scrollFraction * circumference;

	btn.classList.toggle("show", scrollTop > 200);
});

btn.addEventListener("click", () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
});

// Parallax script
jarallax(document.querySelectorAll('.jarallax'), {
	speed: 0.4,
});

// WoW js Init
new WOW().init();