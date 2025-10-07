<template>
  <header>
    <div class="top-banner">
      <div class="container">
        <p>Commencez à découvrir la machine à patron. <a href="/catalogue">Voir le catalogue</a></p>
      </div>
    </div>
    
    <nav class="navbar">
      <div class="container">
        <div class="nav-content">
          <router-link to="/" class="logo">
            <span class="logo-icon">Z</span>
            <span class="logo-text">Zaitrako<span class="logo-suffix">.mg</span></span>
          </router-link>

          <button class="mobile-menu-btn" @click="toggleMobileMenu">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div class="nav-links" :class="{ active: mobileMenuOpen }">
            <div class="dropdown">
              <button class="dropdown-toggle" @click="toggleDropdown">
                Catégories
                <svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
              </button>
              <div class="dropdown-menu" :class="{ show: dropdownOpen }">
                <a href="/catalogue?category=jupe" @click="closeMenus">Jupe</a>
                <a href="/catalogue?category=pantalon" @click="closeMenus">Pantalon</a>
              </div>
            </div>

            <router-link to="/catalogue" @click="closeMenus">Catalogue</router-link>
            <router-link to="/a-propos" @click="closeMenus">À propos</router-link>
            <router-link to="/contact" @click="closeMenus">Contact</router-link>
          </div>

          <div class="nav-actions">
            <div class="search-box">
              <input type="text" placeholder="Rechercher un produit" v-model="searchQuery" />
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="2"/>
                <path d="M14 14L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <button class="user-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/>
                <path d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20" stroke="currentColor" stroke-width="2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const dropdownOpen = ref(false)
const mobileMenuOpen = ref(false)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMenus = () => {
  dropdownOpen.value = false
  mobileMenuOpen.value = false
}
</script>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: white;
}

.top-banner {
  background-color: var(--primary-blue);
  color: white;
  padding: 12px 0;
  text-align: center;
  font-size: 14px;
}

.top-banner a {
  color: white;
  text-decoration: underline;
  font-weight: 600;
}

.navbar {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  gap: 32px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-size: 24px;
  font-weight: 700;
  color: var(--text-dark);
}

.logo-icon {
  background-color: var(--primary-blue);
  color: white;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-weight: 900;
}

.logo-suffix {
  color: var(--accent-orange);
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.mobile-menu-btn span {
  width: 24px;
  height: 3px;
  background-color: var(--text-dark);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
  flex: 1;
  justify-content: center;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-dark);
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: var(--primary-blue);
}

.dropdown {
  position: relative;
}

.dropdown-toggle {
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: var(--text-dark);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 0;
}

.dropdown-toggle:hover {
  color: var(--primary-blue);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 8px 0;
  min-width: 150px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-menu a {
  display: block;
  padding: 12px 20px;
  color: var(--text-dark);
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.dropdown-menu a:hover {
  background-color: #f5f5f5;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box input {
  padding: 10px 40px 10px 16px;
  border: 1px solid var(--border-gray);
  border-radius: 25px;
  font-size: 14px;
  width: 250px;
  transition: all 0.3s ease;
}

.search-box input:focus {
  outline: none;
  border-color: var(--primary-blue);
  width: 300px;
}

.search-box svg {
  position: absolute;
  right: 16px;
  color: var(--text-gray);
}

.user-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: var(--text-dark);
  transition: color 0.3s ease;
}

.user-icon:hover {
  color: var(--primary-blue);
}

@media (max-width: 968px) {
  .mobile-menu-btn {
    display: flex;
  }

  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: all 0.3s ease;
  }

  .nav-links.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .dropdown-menu {
    position: static;
    box-shadow: none;
    padding-left: 20px;
  }

  .search-box input {
    width: 200px;
  }

  .search-box input:focus {
    width: 220px;
  }
}

@media (max-width: 640px) {
  .nav-actions {
    flex-direction: column;
    width: 100%;
  }

  .search-box {
    width: 100%;
  }

  .search-box input {
    width: 100%;
  }

  .search-box input:focus {
    width: 100%;
  }
}
</style>
