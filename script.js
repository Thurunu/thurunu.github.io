// GitHub Data Configuration - Update these values with your actual GitHub data
const githubData = {
    username: 'thurunu',
    avatarUrl: 'https://avatars.githubusercontent.com/u/86581450?s=400&u=2c487a254057d2f951f2a937e8fbef17154bac35&v=4',
    accessToken: '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',
    stats: {
        repositories: 15,
        followers: 25
    },
    repositories: [
        {
            name: 'portfolio-vscode',
            description: 'A developer portfolio with a VSCode-inspired theme, built using HTML, CSS, and JavaScript.',
            language: 'HTML',
            languageColor: '#563d7c',
            stars: 12,
            forks: 5,
            watchers: 12,
            githubUrl: 'https://github.com/Thurunu/thurunu.github.io.git',
            liveUrl: 'https://thurunu.github.io/'
        },
        {
            name: 'skin-detection-api',
            description: 'An AI-powered API for detecting skin oiliness using computer vision and machine learning.',
            language: 'Python',
            languageColor: '#3572A5',
            stars: 8,
            forks: 3,
            watchers: 8,
            githubUrl: 'https://github.com/Thurunu/Skin-Oiliness-Detection-API.git',
            liveUrl: null
        },
        {
            name: 'spring-boot-microservices',
            description: 'A microservices architecture implementation using Spring Boot and Docker.',
            language: 'Java',
            languageColor: '#b07219',
            stars: 6,
            forks: 2,
            watchers: 6,
            githubUrl: 'https://github.com/Thurunu/Spring-Authentication-API.git',
            liveUrl: null
        },
        {
            name: 'portable backup for linux',
            description: 'A portable backup solution for plug-and-play devices on Linux systems.',
            language: 'Python',
            languageColor: '#89e051',
            stars: 4,
            forks: 1,
            watchers: 4,
            githubUrl: 'https://github.com/Thurunu/Poratble-Backup.git',
            liveUrl: null
        },
        {
            name: 'cpu utilization monitor',
            description: 'A lightweight CPU utilization monitoring tool for resource-constrained Linux systems.',
            language: 'Python',
            languageColor: '#89e051',
            stars: 4,
            forks: 1,
            watchers: 4,
            githubUrl: 'https://github.com/Thurunu/CPU-LOAD-ALERT.gitt',
            liveUrl: null
        },
    ],
    contributions: {
        total: 100,
        year: 2024
    }
};

// Tab switching functionality
        const fileItems = document.querySelectorAll('.file-item');
        const tabs = document.querySelectorAll('.tab');
        const contentSections = document.querySelectorAll('.content-section');
        const tabBar = document.querySelector('.tab-bar');

        let openTabs = ['welcome'];

        // File icons mapping
        const fileIcons = {
            'about': '👨‍💻',
            'skills': '⚙️',
            'projects': '📁',
            'hireme': '📄',
            'contact': '📧',
            'github': '<i class="fa-brands fa-github"></i>'
        };

        // File names mapping
        const fileNames = {
            'about': 'about.js',
            'skills': 'skills.json',
            'projects': 'projects.html',
            'hireme': 'hireme.md',
            'contact': 'contact.css',
            'github': 'github.json'
        };

        function switchTab(tabName) {
            // Remove active class from all content sections
            contentSections.forEach(section => {
                section.classList.remove('active');
            });

            // Show selected content section
            const targetSection = document.getElementById(tabName);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            // Update active states
            fileItems.forEach(item => {
                item.classList.remove('active');
                if (item.dataset.tab === tabName) {
                    item.classList.add('active');
                }
            });

            tabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.dataset.tab === tabName) {
                    tab.classList.add('active');
                }
            });
        }

        function createTab(tabName) {
            if (!openTabs.includes(tabName)) {
                openTabs.push(tabName);
                
                const newTab = document.createElement('div');
                newTab.className = 'tab';
                newTab.dataset.tab = tabName;
                newTab.innerHTML = `
                    <span class="tab-icon">${fileIcons[tabName] || '📄'}</span>
                    <span>${fileNames[tabName]}</span>
                    <div class="tab-close">×</div>
                `;
                
                tabBar.appendChild(newTab);

                // Add click event to new tab
                newTab.addEventListener('click', (e) => {
                    if (e.target.classList.contains('tab-close')) {
                        closeTab(tabName);
                    } else {
                        switchTab(tabName);
                    }
                });
            }
        }

        // Helper function to open tab (used by welcome page buttons)
        function openTab(tabName) {
            createTab(tabName);
            switchTab(tabName);
        }

        function closeTab(tabName) {
            if (openTabs.length > 1) {
                const tabIndex = openTabs.indexOf(tabName);
                openTabs.splice(tabIndex, 1);
                
                // Remove tab from DOM
                const tabToRemove = document.querySelector(`[data-tab="${tabName}"].tab`);
                if (tabToRemove) {
                    tabToRemove.remove();
                }

                // Switch to previous tab if closing active tab
                const activeTab = document.querySelector('.tab.active');
                if (!activeTab || activeTab.dataset.tab === tabName) {
                    switchTab(openTabs[openTabs.length - 1]);
                }
            }
        }

        // Add event listeners to file items
        fileItems.forEach(item => {
            item.addEventListener('click', () => {
                const tabName = item.dataset.tab;
                createTab(tabName);
                switchTab(tabName);
            });
        });

        // Add event listeners to existing tabs
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                if (e.target.classList.contains('tab-close')) {
                    closeTab(tab.dataset.tab);
                } else {
                    switchTab(tab.dataset.tab);
                }
            });
        });

        // Initialize with welcome tab
        document.addEventListener('DOMContentLoaded', () => {
            switchTab('welcome');
            
            // Contact form handling
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', handleContactForm);
            }
            
            // Initialize GitHub contribution calendar
            initializeGitHubCalendar();
        });

        // Contact form submission handler
        function handleContactForm(e) {
            e.preventDefault();
            
            const form = e.target;
            const submitBtn = form.querySelector('.submit-btn');
            const submitIcon = submitBtn.querySelector('.submit-icon');
            
            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Validate form
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            submitBtn.classList.add('loading');
            submitIcon.textContent = '⏳';
            
            // Simulate form submission (replace with actual email service)
            setTimeout(() => {
                // Create mailto link
                const mailtoLink = `mailto:mthurunu@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                
                // Open default email client
                window.open(mailtoLink);
                
                // Reset form
                form.reset();
                
                // Remove loading state
                submitBtn.classList.remove('loading');
                submitIcon.textContent = '📤';
                
                // Show success message
                showNotification('Message sent successfully! Check your email client.', 'success');
            }, 1500);
        }

        // Notification system
        function showNotification(message, type = 'info') {
            // Remove existing notifications
            const existingNotifications = document.querySelectorAll('.notification');
            existingNotifications.forEach(notification => notification.remove());
            
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
                    <span class="notification-message">${message}</span>
                </div>
                <button class="notification-close">×</button>
            `;
            
            // Add to page
            document.body.appendChild(notification);
            
            // Show notification
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
            
            // Auto hide after 5 seconds
            setTimeout(() => {
                hideNotification(notification);
            }, 5000);
            
            // Close button functionality
            const closeBtn = notification.querySelector('.notification-close');
            closeBtn.addEventListener('click', () => {
                hideNotification(notification);
            });
        }

        function hideNotification(notification) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }

        // GitHub Contribution Calendar
        function initializeGitHubCalendar() {
            // Fetch real GitHub data
            fetchGitHubData();
        }

        async function fetchGitHubData() {
            try {
                // Fetch user data
                const userData = await fetchGitHubUser();
                if (userData) {
                    updateGitHubProfile(userData);
                }

                // Fetch repositories
                const reposData = await fetchGitHubRepositories();
                if (reposData) {
                    updateGitHubRepositories(reposData);
                }

                // Fetch contribution data
                const contributionData = await fetchGitHubContributions();
                if (contributionData) {
                    updateContributionCalendar(contributionData);
                    // Update contribution total if available
                    updateContributionTotal(contributionData);
                } else {
                    // Fallback to generated data
                    const calendarGrid = document.querySelector('.calendar-grid');
                    if (calendarGrid) {
                        const generatedData = generateContributionData();
                        updateContributionCalendar(generatedData);
                    }
                }
            } catch (error) {
                console.error('Error fetching GitHub data:', error);
                // Fallback to static data
                updateGitHubProfile();
                updateGitHubRepositories();
                const calendarGrid = document.querySelector('.calendar-grid');
                if (calendarGrid) {
                    const generatedData = generateContributionData();
                    updateContributionCalendar(generatedData);
                }
            }
        }

        async function fetchGitHubUser() {
            try {
                const response = await fetch(`https://api.github.com/users/${githubData.username}`, {
                    headers: {
                        'Authorization': `token ${githubData.accessToken}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                });
                
                if (response.ok) {
                    const userData = await response.json();
                    return userData;
                } else {
                    console.error('Failed to fetch user data:', response.status);
                    return null;
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                return null;
            }
        }

        async function fetchGitHubRepositories() {
            try {
                const response = await fetch(`https://api.github.com/users/${githubData.username}/repos?sort=updated&per_page=10`, {
                    headers: {
                        'Authorization': `token ${githubData.accessToken}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                });
                
                if (response.ok) {
                    const reposData = await response.json();
                    return reposData;
                } else {
                    console.error('Failed to fetch repositories:', response.status);
                    return null;
                }
            } catch (error) {
                console.error('Error fetching repositories:', error);
                return null;
            }
        }

        function updateGitHubProfile(userData = null) {
            // Update avatar
            const avatar = document.querySelector('.github-avatar');
            if (avatar) {
                avatar.src = userData ? userData.avatar_url : githubData.avatarUrl;
                avatar.alt = `${githubData.username} GitHub Avatar`;
            }
            
            // Update username
            const username = document.querySelector('.github-username');
            if (username) {
                username.textContent = userData ? userData.login : githubData.username;
            }
            
            // Update stats
            const repoStat = document.querySelector('.stat-item:first-child span');
            if (repoStat) {
                const repoCount = userData ? userData.public_repos : githubData.stats.repositories;
                repoStat.textContent = `${repoCount} repositories`;
            }
            
            const followerStat = document.querySelector('.stat-item:last-child span');
            if (followerStat) {
                const followerCount = userData ? userData.followers : githubData.stats.followers;
                followerStat.textContent = `${followerCount} followers`;
            }
        }

        function updateGitHubRepositories(reposData = null) {
            const reposContainer = document.querySelector('.repos-container');
            if (!reposContainer) return;
            
            // Clear existing repos
            reposContainer.innerHTML = '';
            
            if (reposData && reposData.length > 0) {
                // Use real repository data
                reposData.forEach(repo => {
                    const repoCard = createRepoCardFromAPI(repo);
                    reposContainer.appendChild(repoCard);
                });
            } else {
                // Fallback to static data
                githubData.repositories.forEach(repo => {
                    const repoCard = createRepoCard(repo);
                    reposContainer.appendChild(repoCard);
                });
            }
        }

        function createRepoCardFromAPI(repo) {
            const card = document.createElement('div');
            card.className = 'repo-card';
            
            // Get language color
            const languageColors = {
                'JavaScript': '#f1e05a',
                'Python': '#3572A5',
                'Java': '#b07219',
                'HTML': '#e34c26',
                'CSS': '#563d7c',
                'TypeScript': '#2b7489',
                'PHP': '#4F5D95',
                'C++': '#f34b7d',
                'C#': '#178600',
                'Go': '#00ADD8',
                'Rust': '#dea584',
                'Ruby': '#701516',
                'Swift': '#ffac45',
                'Kotlin': '#F18E33',
                'Scala': '#c22d40',
                'R': '#198ce7',
                'MATLAB': '#e16737',
                'Shell': '#89e051',
                'PowerShell': '#012456',
                'Dockerfile': '#384d54'
            };
            
            const languageColor = languageColors[repo.language] || '#586069';
            
            card.innerHTML = `
                <div class="repo-header">
                    <h3 class="repo-title">${repo.name}</h3>
                    <div class="repo-language">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="language-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5 12h-1.793L10 10.293V6.5L9.5 6H8V4h.5l.5-.5v-2L8.5 1h-2l-.5.5v2l.5.5H7v2H5.5l-.5.5v3.793L3.293 12H1.5l-.5.5v2l.5.5h2l.5-.5v-1.793L5.707 11h3.586L11 12.707V14.5l.5.5h2l.5-.5v-2l-.5-.5zM7 2h1v1H7V2zM6 7h3v3H6V7zm-3 7H2v-1h1v1zm10 0h-1v-1h1v1z"></path>
                        </svg>
                        <span>${repo.language || 'Unknown'}</span>
                    </div>
                </div>
                <p>${repo.description || 'No description available'}</p>
                <div class="repo-stats">
                    <div class="stats-group">
                        <div class="stat">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="stat-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.595 6.252L8 1 6.405 6.252H1l4.373 3.4L3.75 15 8 11.695 12.25 15l-1.623-5.348L15 6.252H9.595zm-7.247.47H6.72L8 2.507 6.72 6.722H2.348zm3.537 2.75l-1.307 4.305 1.307-4.305zm7.767-2.75H9.28h4.372zm-8.75.9h2.366L8 5.214l.732 2.41h2.367l-1.915 1.49.731 2.409L8 10.032l-1.915 1.49.731-2.41-1.915-1.49z"></path>
                            </svg>
                            ${repo.stargazers_count}
                        </div>
                        <div class="stat">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="stat-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 4a2 2 0 1 0-2.47 1.94V7a.48.48 0 0 1-.27.44L8.49 8.88l-2.76-1.4A.49.49 0 0 1 5.46 7V5.94a2 2 0 1 0-1 0V7a1.51 1.51 0 0 0 .82 1.34L8 9.74v1.32a2 2 0 1 0 1 0V9.74l2.7-1.36A1.49 1.49 0 0 0 12.52 7V5.92A2 2 0 0 0 14 4zM4 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm5.47 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM12 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
                            </svg>
                            ${repo.forks_count}
                        </div>
                        <div class="stat">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="stat-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.99993 6.00316C9.47266 6.00316 10.6666 7.19708 10.6666 8.66981C10.6666 10.1426 9.47266 11.3365 7.99993 11.3365C6.52715 11.3365 5.33324 10.1426 5.33324 8.66981C5.33324 7.19708 6.52715 6.00316 7.99993 6.00316ZM7.99993 7.00315C7.07946 7.00315 6.33324 7.74935 6.33324 8.66981C6.33324 9.59028 7.07946 10.3365 7.99993 10.3365C8.9204 10.3365 9.6666 9.59028 9.6666 8.66981C9.6666 7.74935 8.9204 7.00315 7.99993 7.00315ZM7.99993 3.66675C11.0756 3.66675 13.7307 5.76675 14.4673 8.70968C14.5344 8.97755 14.3716 9.24908 14.1037 9.31615C13.8358 9.38315 13.5643 9.22041 13.4973 8.95248C12.8713 6.45205 10.6141 4.66675 7.99993 4.66675C5.38454 4.66675 3.12664 6.45359 2.50182 8.95555C2.43491 9.22341 2.16348 9.38635 1.89557 9.31948C1.62766 9.25255 1.46471 8.98115 1.53162 8.71321C2.26701 5.76856 4.9229 3.66675 7.99993 3.66675Z"></path>
                            </svg>
                            ${repo.watchers_count}
                        </div>
                    </div>
                    <div class="repo-links">
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" title="View Repository">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="link-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.035 5.257c.91 1.092 1.364 2.366 1.364 3.822 0 5.277-3.002 6.824-5.823 7.279.364.637.455 1.365.455 2.093v3.73c0 .455-.273.728-.637.728a.718.718 0 0 1-.728-.728v-3.73a2.497 2.497 0 0 0-.728-2.093l.455-1.183c2.821-.364 5.733-1.274 5.733-6.187 0-1.183-.455-2.275-1.274-3.185l-.182-.727a4.04 4.04 0 0 0 .09-2.73c-.454.09-1.364.273-2.91 1.365l-.547.09a13.307 13.307 0 0 0-6.55 0l-.547-.09C7.57 2.71 6.66 2.437 6.204 2.437c-.273.91-.273 1.91.09 2.73l-.181.727c-.91.91-1.365 2.093-1.365 3.185 0 4.822 2.73 5.823 5.732 6.187l.364 1.183c-.546.546-.819 1.274-.728 2.002v3.821a.718.718 0 0 1-.728.728.718.718 0 0 1-.728-.728V20.18c-3.002.637-4.185-.91-5.095-2.092-.455-.546-.819-1.001-1.274-1.092-.09-.091-.364-.455-.273-.819.091-.364.455-.637.82-.455.91.182 1.455.91 2 1.547.82 1.092 1.639 2.092 4.095 1.547v-.364c-.09-.728.091-1.456.455-2.093-2.73-.546-5.914-2.093-5.914-7.279 0-1.456.455-2.73 1.365-3.822-.273-1.273-.182-2.638.273-3.73l.455-.364C5.749 1.073 7.023.8 9.66 2.437a13.673 13.673 0 0 1 6.642 0C18.851.708 20.216.98 20.398 1.072l.455.364c.455 1.274.546 2.548.182 3.821z"></path>
                            </svg>
                        </a>
                        ${repo.homepage ? `
                        <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" title="Visit Live Site">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="link-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 1H6v1H2v12h12v-4h1v4.5l-.5.5h-13l-.5-.5v-13l.5-.5z"></path>
                                <path d="M15 1.5V8h-1V2.707L7.243 9.465l-.707-.708L13.293 2H8V1h6.5l.5.5z"></path>
                            </svg>
                        </a>
                        ` : ''}
                    </div>
                </div>
            `;
            
            return card;
        }

        function createRepoCard(repo) {
            const card = document.createElement('div');
            card.className = 'repo-card';
            
            card.innerHTML = `
                <div class="repo-header">
                    <h3 class="repo-title">${repo.name}</h3>
                    <div class="repo-language">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="language-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5 12h-1.793L10 10.293V6.5L9.5 6H8V4h.5l.5-.5v-2L8.5 1h-2l-.5.5v2l.5.5H7v2H5.5l-.5.5v3.793L3.293 12H1.5l-.5.5v2l.5.5h2l.5-.5v-1.793L5.707 11h3.586L11 12.707V14.5l.5.5h2l.5-.5v-2l-.5-.5zM7 2h1v1H7V2zM6 7h3v3H6V7zm-3 7H2v-1h1v1zm10 0h-1v-1h1v1z"></path>
                        </svg>
                        <span>${repo.language}</span>
                    </div>
                </div>
                <p>${repo.description}</p>
                <div class="repo-stats">
                    <div class="stats-group">
                        <div class="stat">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="stat-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.595 6.252L8 1 6.405 6.252H1l4.373 3.4L3.75 15 8 11.695 12.25 15l-1.623-5.348L15 6.252H9.595zm-7.247.47H6.72L8 2.507 6.72 6.722H2.348zm3.537 2.75l-1.307 4.305 1.307-4.305zm7.767-2.75H9.28h4.372zm-8.75.9h2.366L8 5.214l.732 2.41h2.367l-1.915 1.49.731 2.409L8 10.032l-1.915 1.49.731-2.41-1.915-1.49z"></path>
                            </svg>
                            ${repo.stars}
                        </div>
                        <div class="stat">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="stat-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 4a2 2 0 1 0-2.47 1.94V7a.48.48 0 0 1-.27.44L8.49 8.88l-2.76-1.4A.49.49 0 0 1 5.46 7V5.94a2 2 0 1 0-1 0V7a1.51 1.51 0 0 0 .82 1.34L8 9.74v1.32a2 2 0 1 0 1 0V9.74l2.7-1.36A1.49 1.49 0 0 0 12.52 7V5.92A2 2 0 0 0 14 4zM4 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm5.47 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM12 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
                            </svg>
                            ${repo.forks}
                        </div>
                        <div class="stat">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="stat-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.99993 6.00316C9.47266 6.00316 10.6666 7.19708 10.6666 8.66981C10.6666 10.1426 9.47266 11.3365 7.99993 11.3365C6.52715 11.3365 5.33324 10.1426 5.33324 8.66981C5.33324 7.19708 6.52715 6.00316 7.99993 6.00316ZM7.99993 7.00315C7.07946 7.00315 6.33324 7.74935 6.33324 8.66981C6.33324 9.59028 7.07946 10.3365 7.99993 10.3365C8.9204 10.3365 9.6666 9.59028 9.6666 8.66981C9.6666 7.74935 8.9204 7.00315 7.99993 7.00315ZM7.99993 3.66675C11.0756 3.66675 13.7307 5.76675 14.4673 8.70968C14.5344 8.97755 14.3716 9.24908 14.1037 9.31615C13.8358 9.38315 13.5643 9.22041 13.4973 8.95248C12.8713 6.45205 10.6141 4.66675 7.99993 4.66675C5.38454 4.66675 3.12664 6.45359 2.50182 8.95555C2.43491 9.22341 2.16348 9.38635 1.89557 9.31948C1.62766 9.25255 1.46471 8.98115 1.53162 8.71321C2.26701 5.76856 4.9229 3.66675 7.99993 3.66675Z"></path>
                            </svg>
                            ${repo.watchers}
                        </div>
                    </div>
                    <div class="repo-links">
                        <a href="${repo.githubUrl}" target="_blank" rel="noopener noreferrer" title="View Repository">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="link-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.035 5.257c.91 1.092 1.364 2.366 1.364 3.822 0 5.277-3.002 6.824-5.823 7.279.364.637.455 1.365.455 2.093v3.73c0 .455-.273.728-.637.728a.718.718 0 0 1-.728-.728v-3.73a2.497 2.497 0 0 0-.728-2.093l.455-1.183c2.821-.364 5.733-1.274 5.733-6.187 0-1.183-.455-2.275-1.274-3.185l-.182-.727a4.04 4.04 0 0 0 .09-2.73c-.454.09-1.364.273-2.91 1.365l-.547.09a13.307 13.307 0 0 0-6.55 0l-.547-.09C7.57 2.71 6.66 2.437 6.204 2.437c-.273.91-.273 1.91.09 2.73l-.181.727c-.91.91-1.365 2.093-1.365 3.185 0 4.822 2.73 5.823 5.732 6.187l.364 1.183c-.546.546-.819 1.274-.728 2.002v3.821a.718.718 0 0 1-.728.728.718.718 0 0 1-.728-.728V20.18c-3.002.637-4.185-.91-5.095-2.092-.455-.546-.819-1.001-1.274-1.092-.09-.091-.364-.455-.273-.819.091-.364.455-.637.82-.455.91.182 1.455.91 2 1.547.82 1.092 1.639 2.092 4.095 1.547v-.364c-.09-.728.091-1.456.455-2.093-2.73-.546-5.914-2.093-5.914-7.279 0-1.456.455-2.73 1.365-3.822-.273-1.273-.182-2.638.273-3.73l.455-.364C5.749 1.073 7.023.8 9.66 2.437a13.673 13.673 0 0 1 6.642 0C18.851.708 20.216.98 20.398 1.072l.455.364c.455 1.274.546 2.548.182 3.821z"></path>
                            </svg>
                        </a>
                        ${repo.liveUrl ? `
                        <a href="${repo.liveUrl}" target="_blank" rel="noopener noreferrer" title="Visit Live Site">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="link-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 1H6v1H2v12h12v-4h1v4.5l-.5.5h-13l-.5-.5v-13l.5-.5z"></path>
                                <path d="M15 1.5V8h-1V2.707L7.243 9.465l-.707-.708L13.293 2H8V1h6.5l.5.5z"></path>
                            </svg>
                        </a>
                        ` : ''}
                    </div>
                </div>
            `;
            
            return card;
        }

        function generateContributionData() {
            const data = [];
            const today = new Date();
            const startDate = new Date(today);
            startDate.setDate(today.getDate() - 365); // Last 365 days
            
            for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
                const date = new Date(d);
                const dateStr = date.toISOString().split('T')[0];
                
                // Generate random contribution levels (replace with real data)
                const contributions = Math.floor(Math.random() * 10);
                let level = 0;
                
                if (contributions > 0) {
                    if (contributions <= 2) level = 1;
                    else if (contributions <= 4) level = 2;
                    else if (contributions <= 6) level = 3;
                    else level = 4;
                }
                
                data.push({
                    date: dateStr,
                    contributions: contributions,
                    level: level
                });
            }
            
            return data;
        }

        async function fetchGitHubContributions() {
            try {
                // Use GitHub GraphQL API to fetch contribution data
                const query = `
                    query {
                        user(login: "${githubData.username}") {
                            contributionsCollection {
                                contributionCalendar {
                                    totalContributions
                                    weeks {
                                        contributionDays {
                                            contributionCount
                                            date
                                        }
                                    }
                                }
                            }
                        }
                    }
                `;
                
                const response = await fetch('https://api.github.com/graphql', {
                    method: 'POST',
                    headers: {
                        'Authorization': `bearer ${githubData.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    if (data.data && data.data.user) {
                        return processGraphQLContributionData(data.data.user.contributionsCollection.contributionCalendar);
                    }
                } else {
                    console.error('Failed to fetch contribution data:', response.status);
                }
                return null;
            } catch (error) {
                console.error('Error fetching contribution data:', error);
                return null;
            }
        }

        function processGraphQLContributionData(calendar) {
            const contributions = [];
            const currentYear = new Date().getFullYear();
            
            // Process weeks and days
            calendar.weeks.forEach(week => {
                week.contributionDays.forEach(day => {
                    const date = new Date(day.date);
                    if (date.getFullYear() === currentYear) {
                        contributions.push({
                            date: day.date,
                            contributions: day.contributionCount,
                            level: getContributionLevel(day.contributionCount)
                        });
                    }
                });
            });
            
            return contributions.sort((a, b) => new Date(a.date) - new Date(b.date));
        }

        function getContributionLevel(count) {
            if (count === 0) return 0;
            if (count <= 3) return 1;
            if (count <= 6) return 2;
            if (count <= 9) return 3;
            return 4;
        }

        function updateContributionCalendar(contributionData) {
            const calendarGrid = document.querySelector('.calendar-grid');
            if (!calendarGrid) return;
            
            // Clear existing calendar
            calendarGrid.innerHTML = '';
            
            // Create calendar days
            contributionData.forEach(day => {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.setAttribute('data-level', day.level);
                dayElement.setAttribute('data-date', day.date);
                dayElement.setAttribute('data-contributions', day.contributions);
                dayElement.setAttribute('title', `${day.date}: ${day.contributions} contributions`);
                
                calendarGrid.appendChild(dayElement);
            });
        }

        function updateContributionTotal(contributionData) {
            const totalContributions = contributionData.reduce((total, day) => total + day.contributions, 0);
            const totalElement = document.querySelector('.total-contributions');
            if (totalElement) {
                totalElement.textContent = totalContributions;
            }
        }