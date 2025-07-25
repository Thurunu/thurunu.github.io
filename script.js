// GitHub Data Configuration - Update these values with your actual GitHub data
const githubData = {
    username: 'thurunu',
    avatarUrl: 'https://avatars.githubusercontent.com/u/86581450?s=400&u=2c487a254057d2f951f2a937e8fbef17154bac35&v=4',
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
            'github': '<i class="fa-brands fa-github"></i>',
            'research': '🔬'
        };

        // File names mapping
        const fileNames = {
            'about': 'about.js',
            'skills': 'skills.json',
            'projects': 'projects.html',
            'hireme': 'hireme.md',
            'contact': 'contact.css',
            'github': 'github.json',
            'research': 'research.md'
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
                
                // Load GitHub data when GitHub tab is opened
                if (tabName === 'github') {
                    console.log('GitHub tab opened, loading data...');
                    fetchGitHubData();
                }
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
            
            // Initialize debugging animation
            initializeDebugAnimation();
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
            // Check if GitHub section exists before fetching data
            const githubSection = document.getElementById('github');
            if (githubSection) {
                console.log('GitHub section found, initializing data...');
                // Fetch real GitHub data
                fetchGitHubData();
            } else {
                console.log('GitHub section not found');
            }
        }

        async function fetchGitHubData() {
            try {
                console.log('Fetching GitHub data...');
                
                // Fetch user data
                const userData = await fetchGitHubUser();
                if (userData) {
                    console.log('User data fetched successfully:', userData);
                    updateGitHubProfile(userData);
                } else {
                    console.log('Using fallback user data');
                    updateGitHubProfile();
                }

                // Fetch repositories
                const reposData = await fetchGitHubRepositories();
                if (reposData && reposData.length > 0) {
                    console.log('Repositories fetched successfully:', reposData.length, 'repos');
                    updateGitHubRepositories(reposData);
                } else {
                    console.log('Using fallback repository data');
                    updateGitHubRepositories();
                }

                // Fetch contribution data
                const contributionData = await fetchGitHubContributions();
                if (contributionData && contributionData.length > 0) {
                    console.log('Contribution data fetched successfully:', contributionData.length, 'days');
                    updateContributionCalendar(contributionData);
                    updateContributionTotal(contributionData);
                } else {
                    console.log('Using fallback contribution data');
                    const calendarGrid = document.querySelector('.calendar-grid');
                    if (calendarGrid) {
                        const generatedData = generateContributionData();
                        updateContributionCalendar(generatedData);
                        updateContributionTotal(generatedData);
                    }
                }
            } catch (error) {
                console.error('Error fetching GitHub data:', error);
                // Fallback to static data
                console.log('Using fallback data due to error');
                updateGitHubProfile();
                updateGitHubRepositories();
                const calendarGrid = document.querySelector('.calendar-grid');
                if (calendarGrid) {
                    const generatedData = generateContributionData();
                    updateContributionCalendar(generatedData);
                    updateContributionTotal(generatedData);
                }
            }
        }

        async function fetchGitHubUser() {
            try {
                const response = await fetch(`https://api.github.com/users/${githubData.username}`, {
                    headers: {
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
            
            // Create more realistic contribution patterns
            const baseContributionRate = 0.3; // 30% chance of having contributions on any given day
            const weekendFactor = 0.7; // 70% of weekday contribution rate on weekends
            const projectSprintFactor = 1.5; // 50% more contributions during "project sprints"
            
            for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
                const date = new Date(d);
                const dateStr = date.toISOString().split('T')[0];
                const dayOfWeek = date.getDay();
                const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                
                // Determine if this is a "project sprint" period (every 2-3 months)
                const daysSinceStart = Math.floor((date - startDate) / (1000 * 60 * 60 * 24));
                const sprintCycle = Math.floor(daysSinceStart / 60); // 60-day cycles
                const isInSprint = (daysSinceStart % 60) < 14; // 14-day sprints
                
                // Calculate contribution probability
                let contributionProb = baseContributionRate;
                if (isWeekend) contributionProb *= weekendFactor;
                if (isInSprint) contributionProb *= projectSprintFactor;
                
                // Generate contributions based on probability
                let contributions = 0;
                if (Math.random() < contributionProb) {
                    // Generate realistic contribution counts
                    if (Math.random() < 0.6) {
                        contributions = Math.floor(Math.random() * 3) + 1; // 1-3 contributions (60% of active days)
                    } else if (Math.random() < 0.8) {
                        contributions = Math.floor(Math.random() * 3) + 4; // 4-6 contributions (20% of active days)
                    } else {
                        contributions = Math.floor(Math.random() * 4) + 7; // 7-10 contributions (20% of active days)
                    }
                }
                
                const level = getContributionLevel(contributions);
                
                data.push({
                    date: dateStr,
                    contributions: contributions,
                    level: level
                });
            }
            
            return data;
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
            const totalElement = document.querySelector('.contribution-number');
            if (totalElement) {
                totalElement.textContent = totalContributions;
            }
        }

        function getContributionLevel(count) {
            if (count === 0) return 0;
            if (count <= 3) return 1;
            if (count <= 6) return 2;
            if (count <= 9) return 3;
            return 4;
        }

        async function fetchGitHubContributions() {
            try {
                const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${githubData.username}`);
                
                if (response.ok) {
                    const data = await response.json();
                    // The API returns an object with a `contributions` array
                    // We need to filter for the last year of contributions
                    const today = new Date();
                    const oneYearAgo = new Date(today);
                    oneYearAgo.setFullYear(today.getFullYear() - 1);

                    const lastYearContributions = data.contributions.filter(c => {
                        const contributionDate = new Date(c.date);
                        return contributionDate >= oneYearAgo && contributionDate <= today;
                    });
                    
                    // The API provides 'count' and 'level', our code uses 'contributions' and 'level'
                    const formattedContributions = lastYearContributions.map(c => ({
                        date: c.date,
                        contributions: c.count,
                        level: c.level
                    }));

                    console.log('GitHub contributions fetched from external API:', formattedContributions.length, 'days');
                    return formattedContributions;
                } else {
                    console.error('Failed to fetch GitHub contributions from external API:', response.status);
                    return null;
                }
            } catch (error) {
                console.error('Error fetching GitHub contributions:', error);
                return null;
            }
        }

        // Debug Animation
        function initializeDebugAnimation() {
            const codeLines = document.querySelectorAll('.code-line');
            const debugCursor = document.querySelector('.debug-cursor');
            const breakpoints = document.querySelectorAll('.breakpoint');
            
            if (!codeLines.length || !debugCursor) return;
            
            let currentLine = 0;
            let isDebugging = false;
            
            // Debug control buttons
            const debugBtns = document.querySelectorAll('.debug-btn');
            debugBtns.forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    if (index === 0) { // Play
                        startDebugging();
                    } else if (index === 1) { // Pause
                        pauseDebugging();
                    } else if (index === 2) { // Stop
                        stopDebugging();
                    }
                });
            });
            
            // Breakpoint click handlers
            breakpoints.forEach((bp, index) => {
                bp.addEventListener('click', () => {
                    bp.classList.toggle('active');
                });
            });
            
            function startDebugging() {
                if (isDebugging) return;
                isDebugging = true;
                debugBtns[0].classList.add('active');
                debugBtns[1].classList.remove('active');
                debugBtns[2].classList.remove('active');
                
                // Reset cursor position
                currentLine = 0;
                moveCursorToLine(0);
                
                // Start step-by-step execution
                executeDebugStep();
            }
            
            function pauseDebugging() {
                isDebugging = false;
                debugBtns[0].classList.remove('active');
                debugBtns[1].classList.add('active');
            }
            
            function stopDebugging() {
                isDebugging = false;
                debugBtns[0].classList.remove('active');
                debugBtns[1].classList.remove('active');
                debugBtns[2].classList.add('active');
                
                // Reset all lines
                codeLines.forEach(line => {
                    line.classList.remove('debugging', 'debug-step');
                });
                
                // Hide cursor
                debugCursor.style.display = 'none';
                
                // Reset after a delay
                setTimeout(() => {
                    debugBtns[2].classList.remove('active');
                    debugCursor.style.display = 'block';
                    moveCursorToLine(0);
                }, 1000);
            }
            
            function executeDebugStep() {
                if (!isDebugging) return;
                
                // Clear previous debugging state
                codeLines.forEach(line => {
                    line.classList.remove('debugging', 'debug-step');
                });
                
                if (currentLine < codeLines.length) {
                    const line = codeLines[currentLine];
                    
                    // Highlight current line
                    line.classList.add('debugging');
                    
                    // Move cursor to current line
                    moveCursorToLine(currentLine);
                    
                    // Add step animation
                    setTimeout(() => {
                        line.classList.add('debug-step');
                    }, 100);
                    
                    // Highlight variables on specific lines
                    if (currentLine === 3 || currentLine === 4 || currentLine === 5) {
                        highlightVariables(line);
                    }
                    
                    currentLine++;
                    
                    // Continue to next line after delay
                    setTimeout(() => {
                        if (isDebugging) {
                            executeDebugStep();
                        }
                    }, 1500);
                } else {
                    // Debugging complete
                    setTimeout(() => {
                        stopDebugging();
                        // Restart after a delay
                        setTimeout(() => {
                            if (!isDebugging) {
                                startDebugging();
                            }
                        }, 2000);
                    }, 1000);
                }
            }
            
            function moveCursorToLine(lineIndex) {
                const line = codeLines[lineIndex];
                if (!line) return;
                
                const lineRect = line.getBoundingClientRect();
                const codeContent = line.parentElement;
                const containerRect = codeContent.getBoundingClientRect();
                
                // Calculate position relative to the code content container
                const top = lineRect.top - containerRect.top + 4;
                const left = 60; // Fixed left position for cursor
                
                // Ensure cursor stays within bounds
                if (top >= 0 && top <= containerRect.height) {
                    debugCursor.style.top = `${top}px`;
                    debugCursor.style.left = `${left}px`;
                    debugCursor.style.display = 'block';
                } else {
                    debugCursor.style.display = 'none';
                }
            }
            
            function highlightVariables(line) {
                const variables = line.querySelectorAll('.property');
                variables.forEach((variable, index) => {
                    setTimeout(() => {
                        variable.classList.add('variable-highlight');
                        setTimeout(() => {
                            variable.classList.remove('variable-highlight');
                        }, 1000);
                    }, index * 200);
                });
            }
            
            // Start debugging animation after a delay
            setTimeout(() => {
                startDebugging();
            }, 2000);
        }

        document.addEventListener('DOMContentLoaded', function () {
            const hamburgerMenu = document.querySelector('.hamburger-menu');
            const menuItems = document.querySelector('.menu-items');
            const sidebarToggle = document.querySelector('.sidebar-toggle');
            const sidebar = document.querySelector('.sidebar');

            if (hamburgerMenu && menuItems) {
                hamburgerMenu.addEventListener('click', () => {
                    menuItems.classList.toggle('active');
                });
            }

            if (sidebarToggle && sidebar) {
                sidebarToggle.addEventListener('click', () => {
                    sidebar.classList.toggle('active');
                });
            }
        });


// ===== TYPING ANIMATION FUNCTIONALITY =====
class TypeWriter {
    constructor(txtElement, words, wait = 2000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.isDeleting = false;
        this.type();
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove character
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add character
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = this.txt;

        // Initial Type Speed
        let typeSpeed = 120;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize the typewriter when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const txtElement = document.getElementById('typewriter-text');
    const words = ['DevOps Engineer', 'Full-Stack Developer'];
    const wait = 2000; // Time in ms to wait after complete word
    
    if (txtElement) {
        new TypeWriter(txtElement, words, wait);
    }
    
    // Initialize visitor counter
    initializeVisitorCounter();
    
    // Initialize visitors section state
    initializeVisitorsSection();
});

// Toggle visitors section in sidebar
function toggleVisitors() {
    const visitorsSection = document.querySelector('.visitors-section');
    if (visitorsSection) {
        visitorsSection.classList.toggle('collapsed');
        
        // Save collapsed state
        const isCollapsed = visitorsSection.classList.contains('collapsed');
        localStorage.setItem('visitorsCollapsed', isCollapsed);
    }
}

// Initialize visitors section state
function initializeVisitorsSection() {
    const visitorsSection = document.querySelector('.visitors-section');
    if (visitorsSection) {
        // Restore collapsed state
        const isCollapsed = localStorage.getItem('visitorsCollapsed') === 'true';
        if (isCollapsed) {
            visitorsSection.classList.add('collapsed');
        }
    }
}

// ===== VISITOR COUNTER FUNCTIONALITY =====
async function initializeVisitorCounter() {
    const VISITOR_KEY = 'thurunu_portfolio_visitor';
    const API_URL = 'https://api.countapi.xyz';
    
    try {
        // Check if user has already visited (using localStorage and sessionStorage)
        const hasVisited = localStorage.getItem(VISITOR_KEY) || sessionStorage.getItem(VISITOR_KEY);
        
        let visitorCount;
        
        if (!hasVisited) {
            // New visitor - increment count
            const response = await fetch(`${API_URL}/hit/thurunu-portfolio/visits`);
            const data = await response.json();
            visitorCount = data.value;
            
            // Mark user as visited (localStorage persists, sessionStorage is for current session)
            localStorage.setItem(VISITOR_KEY, 'true');
            sessionStorage.setItem(VISITOR_KEY, 'true');
            
            console.log('New visitor counted:', visitorCount);
        } else {
            // Returning visitor - just get current count
            const response = await fetch(`${API_URL}/get/thurunu-portfolio/visits`);
            const data = await response.json();
            visitorCount = data.value;
            
            console.log('Returning visitor, current count:', visitorCount);
        }
        
        // Update the display
        updateVisitorDisplay(visitorCount);
        updateSessionType();
        
    } catch (error) {
        console.error('Error fetching visitor count:', error);
        // Fallback to local counting if API fails
        handleVisitorCountFallback();
    }
}

function updateVisitorDisplay(count) {
    const visitorElement = document.getElementById('visitor-count');
    if (visitorElement) {
        // Add animation when updating
        visitorElement.style.opacity = '0';
        setTimeout(() => {
            visitorElement.textContent = formatNumber(count);
            visitorElement.style.opacity = '1';
        }, 200);
    }
}

function updateSessionType() {
    const sessionElement = document.getElementById('session-type');
    if (sessionElement) {
        const isReturningVisitor = localStorage.getItem('hasVisited') === 'true';
        const sessionType = isReturningVisitor ? 'Returning' : 'New';
        
        sessionElement.style.opacity = '0';
        setTimeout(() => {
            sessionElement.textContent = sessionType;
            sessionElement.style.opacity = '1';
        }, 200);
    }
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function handleVisitorCountFallback() {
    const FALLBACK_KEY = 'portfolio_visitor_count';
    const VISITOR_KEY = 'thurunu_portfolio_visitor';
    
    // Check if user has visited before
    const hasVisited = localStorage.getItem(VISITOR_KEY);
    let currentCount = parseInt(localStorage.getItem(FALLBACK_KEY) || '0');
    
    if (!hasVisited) {
        // New visitor
        currentCount += 1;
        localStorage.setItem(FALLBACK_KEY, currentCount.toString());
        localStorage.setItem(VISITOR_KEY, 'true');
    }
    
    updateVisitorDisplay(currentCount);
}
