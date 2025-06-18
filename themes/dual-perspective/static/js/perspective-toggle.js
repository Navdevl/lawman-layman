/**
 * Theme and Perspective Management
 * Handles dark/light mode and perspective switching
 */

class ThemeManager {
    constructor() {
        this.currentTheme = this.loadTheme();
        this.currentPerspective = this.loadPerspective();
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.setupPerspectiveToggle();
        this.updateThemeUI();
        this.updatePerspectiveUI();
        this.handleInitialRoute();
    }

    // Theme Management
    loadTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        
        // Detect system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    saveTheme(theme) {
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.saveTheme(newTheme);
        this.updateThemeUI();
    }

    setupThemeToggle() {
        const themeCheckbox = document.getElementById('theme-checkbox');
        if (themeCheckbox) {
            themeCheckbox.addEventListener('change', () => {
                this.toggleTheme();
            });
        }
    }

    updateThemeUI() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        const themeCheckbox = document.getElementById('theme-checkbox');
        if (themeCheckbox) {
            themeCheckbox.checked = this.currentTheme === 'dark';
        }
    }

    // Perspective Management
    loadPerspective() {
        return localStorage.getItem('perspective') || 'layman';
    }

    savePerspective(perspective) {
        localStorage.setItem('perspective', perspective);
        this.currentPerspective = perspective;
    }

    switchPerspective() {
        const newPerspective = this.currentPerspective === 'lawman' ? 'layman' : 'lawman';
        this.savePerspective(newPerspective);
        this.updatePerspectiveUI();
        this.handleRouteChange();
    }

    setupPerspectiveToggle() {
        const perspectiveCheckbox = document.getElementById('perspective-checkbox');
        if (perspectiveCheckbox) {
            perspectiveCheckbox.addEventListener('change', () => {
                this.switchPerspective();
            });
        }
    }

    updatePerspectiveUI() {
        // Update HTML data attribute
        document.documentElement.setAttribute('data-perspective', this.currentPerspective);
        
        // Update body class for consistency
        document.body.className = document.body.className.replace(/perspective-\w+/g, '');
        document.body.classList.add(`perspective-${this.currentPerspective}`);
        
        // Update perspective toggle checkbox
        const perspectiveCheckbox = document.getElementById('perspective-checkbox');
        if (perspectiveCheckbox) {
            perspectiveCheckbox.checked = this.currentPerspective === 'lawman';
        }
    }

    handleInitialRoute() {
        // Check if we're on a perspective-specific page and need to redirect
        const currentPath = window.location.pathname;
        const isOnLawmanPage = currentPath.startsWith('/lawman');
        const isOnLaymanPage = currentPath.startsWith('/layman');

        if (isOnLawmanPage && this.currentPerspective === 'layman') {
            // User is on lawman page but preference is layman
            const newPath = currentPath.replace('/lawman', '/layman');
            this.redirectIfExists(newPath);
        } else if (isOnLaymanPage && this.currentPerspective === 'lawman') {
            // User is on layman page but preference is lawman
            const newPath = currentPath.replace('/layman', '/lawman');
            this.redirectIfExists(newPath);
        }
    }

    handleRouteChange() {
        const currentPath = window.location.pathname;
        
        // If we're on the homepage, redirect to the appropriate perspective
        if (currentPath === '/') {
            window.location.href = `/${this.currentPerspective}/`;
            return;
        }

        // If we're on a perspective-specific page, try to switch to the other perspective
        if (currentPath.startsWith('/lawman') && this.currentPerspective === 'layman') {
            const newPath = currentPath.replace('/lawman', '/layman');
            this.redirectIfExists(newPath);
        } else if (currentPath.startsWith('/layman') && this.currentPerspective === 'lawman') {
            const newPath = currentPath.replace('/layman', '/lawman');
            this.redirectIfExists(newPath);
        }
    }

    redirectIfExists(path) {
        // Try to check if the path exists (this is a simple approach)
        // In a real implementation, you might want to check against a sitemap or use a more sophisticated method
        fetch(path, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    window.location.href = path;
                }
            })
            .catch(() => {
                // If fetch fails, just redirect anyway - Hugo will handle 404s
                window.location.href = path;
            });
    }

    // Method to manually set perspective (for use in templates)
    setPerspective(perspective) {
        if (perspective === 'lawman' || perspective === 'layman') {
            this.savePerspective(perspective);
            this.updateUI();
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});

// Handle browser back/forward navigation
window.addEventListener('popstate', () => {
    if (window.themeManager) {
        window.themeManager.handleInitialRoute();
    }
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (window.themeManager && !localStorage.getItem('theme')) {
        window.themeManager.currentTheme = e.matches ? 'dark' : 'light';
        window.themeManager.updateThemeUI();
    }
});