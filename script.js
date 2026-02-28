/* 
=====================================================
  INTERACTIVITY & ANIMATIONS
=====================================================
*/

document.addEventListener('DOMContentLoaded', () => {

    /* =================================================
       1. Mobile Menu Toggle
    ================================================= */
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    const navLinksList = document.querySelectorAll('.nav-link');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navbar.classList.remove('active');
            }
        });
    });

    /* =================================================
       2. Sticky Header
    ================================================= */
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* =================================================
       3. Smooth Scrolling
    ================================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if target is just '#'
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Account for fixed header height
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* =================================================
       4. Scroll Animations (Intersection Observer)
    ================================================= */
    const appearOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before the element fully enters viewport
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return; // Do nothing if not intersecting
            } else {
                // Add the 'appear' class to trigger CSS animation
                entry.target.classList.add('appear');
                // Stop observing the element once it has animated
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    // Select all elements with animation classes
    const faders = document.querySelectorAll('.fade-in, .fade-in-up');
    
    // Start observing matching elements
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    /* =================================================
       5. Active Link Highlighting on Scroll
    ================================================= */
    const sections = document.querySelectorAll('.section');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150; // Offset for header
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
