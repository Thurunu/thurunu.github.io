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
            'experience': '💼',
            'contact': '📧'
        };

        // File names mapping
        const fileNames = {
            'about': 'about.js',
            'skills': 'skills.json',
            'projects': 'projects.html',
            'experience': 'experience.md',
            'contact': 'contact.css'
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
        });