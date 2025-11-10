// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    if (window.AOS) {
        AOS.init({
            duration: 1000,
            once: true,
            mirror: false
        });
    }

    // Download CV / Resume buttons
    const downloadCVButtons = document.querySelectorAll('.secondary-btn, .primary-btn[href="#"]');
    downloadCVButtons.forEach(button => {
        if (button.textContent.includes('Download CV') || button.textContent.includes('Download Resume')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const cvPath = 'files/chinmay_pingle_cv.pdf';

                const tempLink = document.createElement('a');
                tempLink.href = cvPath;
                tempLink.setAttribute('download', 'Chinmay_Pingle_CV.pdf');
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
            });
        }
    });

    // Initialize Particles.js
    if (window.particlesJS && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#2ecc71'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#2ecc71',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }

    // Typing effect
    const typingText = document.getElementById('typing-text');
    const phrases = ['Web Developer', 'UI Designer', 'Freelancer', 'App Developer'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing next phrase
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing effect
    if (typingText) {
        setTimeout(typeEffect, 1000);
    }

    // Sticky Header
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navBar = document.querySelector('.nav-bar');

    if (hamburger && navBar) {
        hamburger.addEventListener('click', function() {
            navBar.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu + smooth scroll when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-bar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            if (navBar) navBar.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });

    // Active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (!backToTopBtn) return;
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');

            if (body.classList.contains('dark-mode')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Testimonial Slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    function showTestimonial(index) {
        if (testimonialItems.length === 0) return;

        testimonialItems.forEach(item => item.classList.remove('active'));
        const activeItem = testimonialItems[index];
        if (activeItem) activeItem.classList.add('active');

        if (dots.length > 0) {
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) dots[index].classList.add('active');
        }
        currentIndex = index;
    }

    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
            showTestimonial(currentIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonialItems.length;
            showTestimonial(currentIndex);
        });
    }

    // Auto slide testimonials
    setInterval(() => {
        if (testimonialItems.length > 0) {
            currentIndex = (currentIndex + 1) % testimonialItems.length;
            showTestimonial(currentIndex);
        }
    }, 5000);

    // Certificate Modal Functionality
    const certificateModal = document.getElementById('certificateModal');
    const modalTitle = document.getElementById('modalTitle');
    const certificateImage = document.getElementById('certificateImage');
    const certificatePlaceholder = document.getElementById('certificatePlaceholder');
    const closeModal = document.getElementById('closeModal');
    const downloadCertificate = document.getElementById('downloadCertificate');
    const shareCertificate = document.getElementById('shareCertificate');

    // Certificate data mapping (only Full Stack)
    const certificateData = {
        fullstack: {
            title: 'Full Stack Web Development Certification',
            image: 'images/certificates/Full-stack web development certificate.jpeg',
            downloadUrl: 'files/certificates/Full-stack web development.pdf'
        }
    };

    // Certificate button handlers
    const certificateButtons = document.querySelectorAll('.certificate-btn');
    certificateButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const certificateType = this.getAttribute('data-certificate');
            const certData = certificateData[certificateType];
            
            if (certData && certificateModal) {
                modalTitle.textContent = certData.title;
                
                // Try to load the certificate image
                const img = new Image();
                img.onload = function() {
                    certificateImage.src = certData.image;
                    certificateImage.style.display = 'block';
                    certificatePlaceholder.style.display = 'none';
                };
                img.onerror = function() {
                    certificateImage.style.display = 'none';
                    certificatePlaceholder.style.display = 'flex';
                };
                img.src = certData.image;
                
                // Set download URL
                if (downloadCertificate) {
                    downloadCertificate.onclick = function() {
                        // Try to download the certificate
                        const link = document.createElement('a');
                        link.href = certData.downloadUrl;
                        link.download = `${certificateType}-certificate.pdf`;
                        link.click();
                    };
                }
                
                // Set share functionality
                if (shareCertificate) {
                    shareCertificate.onclick = function() {
                        if (navigator.share) {
                            navigator.share({
                                title: certData.title,
                                text: `Check out my ${certData.title}!`,
                                url: window.location.href
                            });
                        } else {
                            // Fallback: copy to clipboard
                            navigator.clipboard.writeText(window.location.href).then(() => {
                                alert('Certificate link copied to clipboard!');
                            });
                        }
                    };
                }
                
                certificateModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Verify button handlers
    const verifyButtons = document.querySelectorAll('.verify-btn');
    verifyButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const certId = this.getAttribute('data-verify');
            alert(`Certificate verification for ${certId}:\n\nThis certificate is authentic and verified.\n\nIssued by: Authorized Institution\nVerification ID: ${certId}\nStatus: Valid`);
        });
    });

    // Modal close handlers
    if (closeModal && certificateModal) {
        closeModal.addEventListener('click', function() {
            certificateModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    if (certificateModal) {
        certificateModal.addEventListener('click', function(e) {
            if (e.target === certificateModal) {
                certificateModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && certificateModal && certificateModal.classList.contains('active')) {
            certificateModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Contact Form Submission (Web3Forms)
    const contactFormEl = document.querySelector('.contact-form form');
    if (contactFormEl) {
        const successMessage = contactFormEl.querySelector('.success-message');
        const errorMessage = contactFormEl.querySelector('.error-message');

        contactFormEl.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = contactFormEl.querySelector('button[type="submit"]');
            const formData = new FormData(contactFormEl);

            // Read fields safely
            const name = (formData.get('name') || '').toString().trim();
            const email = (formData.get('email') || '').toString().trim();
            const message = (formData.get('message') || '').toString().trim();
            const accessKey = (formData.get('access_key') || '').toString().trim();
            const botcheck = formData.get('botcheck');

            // Client-side validation
            const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '');
            if (!name || !isEmailValid || !message) {
                if (errorMessage) {
                    errorMessage.textContent = 'Please fill in all fields with a valid email.';
                    errorMessage.style.display = 'block';
                }
                if (successMessage) successMessage.style.display = 'none';
                return;
            }
            if (!accessKey || accessKey.includes('YOUR_ACCESS_KEY_HERE')) {
                if (errorMessage) {
                    errorMessage.textContent = 'Web3Forms Access Key is missing. Please set your access key.';
                    errorMessage.style.display = 'block';
                }
                if (successMessage) successMessage.style.display = 'none';
                return;
            }
            if (botcheck) {
                // Honeypot triggered; silently abort
                return;
            }

            // Loading state
            let originalText = 'Send Message';
            if (submitBtn) {
                originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }

            try {
                const actionUrl = (contactFormEl.getAttribute('action') || '').trim();
                if (!actionUrl || !actionUrl.includes('web3forms.com')) {
                    throw new Error('Form action is not set to Web3Forms endpoint.');
                }

                // Add extra metadata for better email content
                formData.append('from_name', name);
                formData.append('from_email', email);

                const resp = await fetch(actionUrl, {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: formData
                });

                const data = await resp.json().catch(() => ({}));
                if (resp.ok) {
                    if (successMessage) {
                        successMessage.textContent = 'Thanks! Your message has been sent successfully.';
                        successMessage.style.display = 'block';
                    }
                    if (errorMessage) errorMessage.style.display = 'none';
                    contactFormEl.reset();
                } else {
                    const errText = data?.message || data?.error || 'Failed to send message via Web3Forms.';
                    throw new Error(errText);
                }
            } catch (err) {
                if (errorMessage) {
                    errorMessage.textContent = `Unable to send message: ${err.message || 'Unknown error'}`;
                    errorMessage.style.display = 'block';
                }
                if (successMessage) successMessage.style.display = 'none';
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
                setTimeout(() => {
                    if (successMessage) successMessage.style.display = 'none';
                    if (errorMessage) errorMessage.style.display = 'none';
                }, 5000);
            }
        });
    }

    // Navigation config (replace with your real URLs)
    const SOCIAL_LINKS = {
        linkedin: 'https://www.linkedin.com/in/chinmay-pingle-5b0330383?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        github: 'https://github.com/Chinmay1145',
        twitter: ' https://x.com/PingleChin19526?t=qp4_rI9aD7Hi_6ThWoTrGA&s=08',
        instagram: 'https://www.instagram.com/chinamay_pingale/'
    };
    const PROJECT_LINKS = {
        'Chroma Commerce Gear Ecommerce Website': {
            live: 'https://luxe-drive-gallery-82-78e1.vercel.app/',    // replace with your demo URL
            code: 'https://github.com/Chinmay1145/chroma-commerce-india-main' // replace with your repo
        },
        'India Smart Shop Ecommerce Website': {
            live: 'https://india-smart-shop-dark-main.vercel.app/',    // replace with your demo URL
            code: 'https://github.com/Chinmay1145/india-smart-shop-dark-main' // replace with your repo
        },
        'Task Manager': {
            live: 'https://task-manager-murex-eight-47.vercel.app/',    // replace with your demo URL
            code: 'https://github.com/Chinmay1145/task-manager' // replace with your repo
        }
    };

    // Social media links: open in new tab, fallback if href="#"
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = anchor.getAttribute('href');
            if (!href || href === '#') {
                e.preventDefault();
                const icon = anchor.querySelector('i');
                let platform = 'github';
                if (icon && icon.classList.contains('fa-linkedin-in')) platform = 'linkedin';
                else if (icon && icon.classList.contains('fa-github')) platform = 'github';
                else if (icon && icon.classList.contains('fa-twitter')) platform = 'twitter';
                else if (icon && icon.classList.contains('fa-instagram')) platform = 'instagram';
                const url = SOCIAL_LINKS[platform];
                window.open(url, '_blank', 'noopener,noreferrer');
            }
            // if href is set and not '#', browser will handle the navigation
        });
    });

    // Project buttons: open live/code; fallback by project title if href="#"
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const titleEl = card.querySelector('.project-info h3');
        const projectTitle = titleEl ? titleEl.textContent.trim() : '';
        const links = card.querySelectorAll('.project-links a');

        links.forEach(a => {
            a.addEventListener('click', function(e) {
                const href = a.getAttribute('href');
                if (href && href !== '#') return; // let browser handle real links

                e.preventDefault();
                const text = a.textContent.trim().toLowerCase();
                let url = '';

                if (PROJECT_LINKS[projectTitle]) {
                    url = text.includes('live')
                        ? PROJECT_LINKS[projectTitle].live
                        : PROJECT_LINKS[projectTitle].code;
                }

                // Safe defaults if mapping missing
                if (!url) {
                    url = text.includes('live') ? 'https://example.com/' : 'https://github.com/';
                }

                window.open(url, '_blank', 'noopener,noreferrer');
            });
        });
    });
});