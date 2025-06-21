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
            const calendarGrid = document.querySelector('.calendar-grid');
            if (!calendarGrid) return;
            
            // Generate contribution data (you can replace this with real GitHub API data)
            const contributionData = generateContributionData();
            
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