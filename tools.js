import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Generate a complete website HTML file
 * @param {Object} args - { projectName, description, templateType }
 */
export async function generateWebsiteHTML(args) {
  try {
    const {
      projectName = "Website",
      description = "A professional website",
      templateType = "scaler",
    } = args;

    let htmlContent = "";

    if (templateType === "scaler" || templateType === "modern") {
      htmlContent = generateScalerTemplate(projectName, description);
    } else {
      htmlContent = generateGenericTemplate(projectName, description);
    }

    const filename = `${projectName.toLowerCase().replace(/\s+/g, "_")}.html`;
    const filepath = path.join(__dirname, filename);

    fs.writeFileSync(filepath, htmlContent, "utf-8");

    return JSON.stringify({
      success: true,
      message: `Website generated successfully!`,
      filename: filename,
      path: filepath,
      filesize: fs.statSync(filepath).size,
      instructions: `Open ${filename} in your browser to view the website`,
    });
  } catch (error) {
    return JSON.stringify({
      success: false,
      error: error.message,
    });
  }
}

/**
 * Analyze Scaler Academy website structure
 */
export async function analyzeScalerWebsite(args) {
  try {
    const analysis = {
      structure: {
        header: {
          navigation: ["Home", "Courses", "Instructors", "Community", "Blog"],
          logo: "Scaler Academy Logo",
          callToAction: "Enroll Now",
        },
        heroSection: {
          headline: "Learn In-Demand Skills",
          subheadline: "Master programming from industry experts",
          backgroundStyle: "Gradient blue to purple",
          callToActionButton: "Start Learning",
        },
        features: [
          "Live classes with instructors",
          "Flexible learning schedule",
          "Industry-relevant curriculum",
          "Community support",
          "Lifetime access",
        ],
        coursesSection: {
          title: "Our Popular Courses",
          layout: "Grid layout with course cards",
          cardsPerRow: 3,
        },
        footer: {
          sections: [
            "About Us",
            "Courses",
            "Resources",
            "Community",
            "Contact",
          ],
          socialLinks: [
            "Twitter",
            "LinkedIn",
            "Facebook",
            "Instagram",
            "YouTube",
          ],
          copyright: "© 2024 Scaler Academy",
        },
      },
      colorScheme: {
        primary: "#6366f1",
        secondary: "#3b82f6",
        accent: "#ec4899",
        background: "#ffffff",
        text: "#1f2937",
      },
      design: [
        "Modern and professional",
        "Clean typography",
        "Responsive design",
        "Smooth animations",
        "User-friendly interface",
      ],
    };

    return JSON.stringify(analysis);
  } catch (error) {
    return JSON.stringify({
      error: error.message,
    });
  }
}

/**
 * Execute system commands
 */
export async function executeCommand(args) {
  try {
    const { command } = args;

    if (!command) {
      return JSON.stringify({
        success: false,
        error: "No command provided",
      });
    }

    const { stdout, stderr } = await execPromise(command);

    return JSON.stringify({
      success: true,
      command: command,
      stdout: stdout,
      stderr: stderr || "",
    });
  } catch (error) {
    return JSON.stringify({
      success: false,
      error: error.message,
    });
  }
}

/**
 * Generate Scaler-inspired website template
 */
function generateScalerTemplate(projectName, description) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName} - AI Generated Website</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary: #6366f1;
            --secondary: #3b82f6;
            --accent: #ec4899;
            --dark: #1f2937;
            --light: #f9fafb;
            --white: #ffffff;
            --gray: #6b7280;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: var(--dark);
            background-color: var(--white);
        }

        /* HEADER */
        header {
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: var(--white);
            padding: 1.5rem 0;
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 1.8rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
            animation: slideInDown 0.6s ease;
        }

        nav {
            display: flex;
            gap: 2rem;
            list-style: none;
        }

        nav a {
            color: var(--white);
            text-decoration: none;
            font-weight: 500;
            transition: opacity 0.3s ease;
            position: relative;
        }

        nav a:hover {
            opacity: 0.8;
        }

        nav a::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--accent);
            transition: width 0.3s ease;
        }

        nav a:hover::after {
            width: 100%;
        }

        .cta-button {
            background: var(--accent);
            color: var(--white);
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4);
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(236, 72, 153, 0.6);
        }

        /* HERO SECTION */
        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            background-attachment: fixed;
            color: var(--white);
            padding: 8rem 2rem;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -10%;
            width: 500px;
            height: 500px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
        }

        .hero::after {
            content: '';
            position: absolute;
            bottom: -30%;
            left: -5%;
            width: 400px;
            height: 400px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 50%;
            animation: float 8s ease-in-out infinite reverse;
        }

        .hero-content {
            max-width: 900px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
            animation: slideInUp 0.8s ease;
        }

        .hero h1 {
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: 1rem;
            letter-spacing: -1px;
            line-height: 1.2;
        }

        .hero p {
            font-size: 1.3rem;
            margin-bottom: 2rem;
            font-weight: 300;
            opacity: 0.95;
        }

        .hero-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 3rem;
        }

        .btn {
            padding: 1rem 2rem;
            border: none;
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
        }

        .btn-primary {
            background: var(--white);
            color: var(--primary);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .btn-primary:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
        }

        .btn-secondary {
            background: transparent;
            color: var(--white);
            border: 2px solid var(--white);
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-4px);
        }

        /* FEATURES SECTION */
        .features {
            padding: 5rem 2rem;
            background: var(--light);
        }

        .features-container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .section-title {
            font-size: 2.5rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 1rem;
            color: var(--dark);
        }

        .section-subtitle {
            text-align: center;
            color: var(--gray);
            font-size: 1.1rem;
            margin-bottom: 3rem;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
        }

        .feature-card {
            background: var(--white);
            padding: 2rem;
            border-radius: 15px;
            text-align: center;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }

        .feature-icon {
            width: 60px;
            height: 60px;
            margin: 0 auto 1.5rem;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
        }

        .feature-card h3 {
            margin-bottom: 1rem;
            color: var(--dark);
        }

        .feature-card p {
            color: var(--gray);
            font-size: 0.95rem;
        }

        /* COURSES SECTION */
        .courses {
            padding: 5rem 2rem;
            background: var(--white);
        }

        .courses-container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .courses-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .course-card {
            background: var(--light);
            border-radius: 15px;
            overflow: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .course-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }

        .course-image {
            width: 100%;
            height: 200px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
        }

        .course-content {
            padding: 2rem;
        }

        .course-badge {
            display: inline-block;
            background: var(--accent);
            color: var(--white);
            padding: 0.4rem 0.8rem;
            border-radius: 20px;
            font-size: 0.8rem;
            margin-bottom: 1rem;
        }

        .course-card h3 {
            margin-bottom: 0.5rem;
            color: var(--dark);
        }

        .course-rating {
            color: var(--gray);
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }

        .course-price {
            font-size: 1.3rem;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 1rem;
        }

        .course-card .btn {
            width: 100%;
            background: var(--primary);
            color: var(--white);
        }

        /* FOOTER */
        footer {
            background: linear-gradient(135deg, var(--dark), #374151);
            color: var(--white);
            padding: 3rem 2rem 1rem;
        }

        .footer-container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }

        .footer-section h4 {
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
        }

        .footer-section ul {
            list-style: none;
        }

        .footer-section ul li {
            margin-bottom: 0.8rem;
        }

        .footer-section a {
            color: #d1d5db;
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .footer-section a:hover {
            color: var(--white);
        }

        .social-links {
            display: flex;
            gap: 1.5rem;
            margin-top: 1.5rem;
        }

        .social-links a {
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }

        .social-links a:hover {
            background: var(--accent);
            transform: translateY(-3px);
        }

        .footer-bottom {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 2rem;
            text-align: center;
            color: #9ca3af;
        }

        /* ANIMATIONS */
        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(20px);
            }
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2rem;
            }

            .hero p {
                font-size: 1rem;
            }

            nav {
                gap: 1rem;
                font-size: 0.9rem;
            }

            .hero-buttons {
                flex-direction: column;
                align-items: center;
            }

            .btn {
                width: 100%;
                max-width: 300px;
            }

            .footer-content {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <!-- HEADER -->
    <header>
        <div class="header-container">
            <div class="logo">${projectName}</div>
            <nav>
                <a href="#home">Home</a>
                <a href="#courses">Courses</a>
                <a href="#features">Features</a>
                <a href="#contact">Contact</a>
            </nav>
            <button class="cta-button">Enroll Now</button>
        </div>
    </header>

    <!-- HERO SECTION -->
    <section class="hero" id="home">
        <div class="hero-content">
            <h1>Master In-Demand Skills Today</h1>
            <p>${description}</p>
            <div class="hero-buttons">
                <button class="btn btn-primary">Start Free Trial</button>
                <button class="btn btn-secondary">Learn More</button>
            </div>
        </div>
    </section>

    <!-- FEATURES SECTION -->
    <section class="features" id="features">
        <div class="features-container">
            <h2 class="section-title">Why Choose Us?</h2>
            <p class="section-subtitle">Everything you need to succeed in your learning journey</p>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">🎓</div>
                    <h3>Expert Instructors</h3>
                    <p>Learn from industry professionals with years of real-world experience</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">💻</div>
                    <h3>Hands-on Projects</h3>
                    <p>Build real projects and add them to your portfolio immediately</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🌍</div>
                    <h3>Global Community</h3>
                    <p>Connect with thousands of learners from around the world</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📚</div>
                    <h3>Lifetime Access</h3>
                    <p>Access course materials forever, learn at your own pace</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🏆</div>
                    <h3>Certifications</h3>
                    <p>Get recognized certificates upon course completion</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🚀</div>
                    <h3>Job Support</h3>
                    <p>Career guidance and job placement assistance included</p>
                </div>
            </div>
        </div>
    </section>

    <!-- COURSES SECTION -->
    <section class="courses" id="courses">
        <div class="courses-container">
            <h2 class="section-title">Popular Courses</h2>
            <p class="section-subtitle">Choose from our most sought-after courses</p>
            <div class="courses-grid">
                <div class="course-card">
                    <div class="course-image">💡</div>
                    <div class="course-content">
                        <span class="course-badge">Beginner Friendly</span>
                        <h3>Web Development Masterclass</h3>
                        <div class="course-rating">⭐⭐⭐⭐⭐ (4,892 reviews)</div>
                        <div class="course-price">₹2,999</div>
                        <button class="btn">Enroll Now</button>
                    </div>
                </div>
                <div class="course-card">
                    <div class="course-image">🤖</div>
                    <div class="course-content">
                        <span class="course-badge">Intermediate</span>
                        <h3>Machine Learning Fundamentals</h3>
                        <div class="course-rating">⭐⭐⭐⭐⭐ (3,521 reviews)</div>
                        <div class="course-price">₹3,999</div>
                        <button class="btn">Enroll Now</button>
                    </div>
                </div>
                <div class="course-card">
                    <div class="course-image">📱</div>
                    <div class="course-content">
                        <span class="course-badge">Advanced</span>
                        <h3>Full Stack Development Pro</h3>
                        <div class="course-rating">⭐⭐⭐⭐⭐ (5,234 reviews)</div>
                        <div class="course-price">₹4,999</div>
                        <button class="btn">Enroll Now</button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- FOOTER -->
    <footer>
        <div class="footer-container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>${projectName}</h4>
                    <p>Empowering learners worldwide with quality education and industry-relevant skills.</p>
                    <div class="social-links">
                        <a href="#" title="Twitter">𝕏</a>
                        <a href="#" title="LinkedIn">in</a>
                        <a href="#" title="Facebook">f</a>
                        <a href="#" title="Instagram">📷</a>
                        <a href="#" title="YouTube">▶</a>
                    </div>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#courses">Courses</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#blog">Blog</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Courses</h4>
                    <ul>
                        <li><a href="#">Web Development</a></li>
                        <li><a href="#">Mobile Apps</a></li>
                        <li><a href="#">Data Science</a></li>
                        <li><a href="#">Cloud Computing</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Support</h4>
                    <ul>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 ${projectName}. All rights reserved. | Built with AI Agent</p>
            </div>
        </div>
    </footer>

    <script>
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Enroll button functionality
        document.querySelectorAll('.cta-button, .btn').forEach(button => {
            button.addEventListener('click', function() {
                const courseTitle = this.closest('.course-card')?.querySelector('h3')?.textContent || 'our course';
                showNotification(\`Thank you for your interest in \${courseTitle}! 🎉\`);
            });
        });

        // Notification system
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.textContent = message;
            notification.style.cssText = \`
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
                color: white;
                padding: 1rem 2rem;
                border-radius: 50px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
                animation: slideInRight 0.3s ease;
                z-index: 10000;
                font-weight: 600;
            \`;
            document.body.appendChild(notification);
            setTimeout(() => {
                notification.style.animation = 'slideInRight 0.3s ease reverse';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }

        // Add animation stylesheet
        const style = document.createElement('style');
        style.textContent = \`
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        \`;
        document.head.appendChild(style);

        // Intersection Observer for fade-in effect
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });

        document.querySelectorAll('.feature-card, .course-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        console.log('✨ Website loaded successfully!');
    </script>
</body>
</html>`;
}

/**
 * Generate generic website template
 */
function generateGenericTemplate(projectName, description) {
  return generateScalerTemplate(projectName, description);
}
