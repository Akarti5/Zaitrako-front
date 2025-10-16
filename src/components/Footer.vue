<template>
  
    <!-- Footer -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-grid">
          <div class="footer-column">
            <div class="logo-container">
              <div class="logo-icon">
                <span class="logo-text">Z</span>
              </div>
              <span class="logo-name">Zaitrako<span class="logo-extension">.mg</span></span>
            </div>
            <p class="footer-description">
              Zaitrako.mg, votre générateur de patron de couture automatique en quelques clics.
            </p>
          </div>
          <div class="footer-column">
            <h4 class="footer-heading">ENTREPRISE</h4>
            <ul class="footer-links">
              <li><a href="#" class="footer-link">À Propos</a></li>
              <li><a href="#" class="footer-link">Contact</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4 class="footer-heading">RESSOURCES</h4>
            <ul class="footer-links">
              <li><a href="#" class="footer-link">Tutoriel</a></li>
            </ul>
          </div>
          <div class="footer-column footer-column-last">
            <div class="mvola-badge">
              <img 
  src="https://www.madagascar-internet.mg/wp-content/uploads/2022/03/MVOLA-300x140.png" 
  alt="Mvola mobile money" 
  style="width: 33%; height: auto;"
>

            </div>
          </div>
        </div>
        <div class="footer-bottom">
          Zaitrako.mg © 2022-2024, All Rights Reserve
        </div>
      </div>
    </footer>
</template>

<style scoped>
/* Newsletter Section */
.newsletter-section {
  background: linear-gradient(to right, #1e40af, #2563eb);
  padding: 64px 0;
}

.newsletter-container {
  max-width: 896px;
  margin: 0 auto;
  padding: 0 16px;
  text-align: center;
}

.newsletter-title {
  font-size: 30px;
  font-weight: bold;
  color: white;
  margin-bottom: 32px;
  line-height: 1.3;
}

.newsletter-form {
  max-width: 448px;
  margin: 0 auto;
}

.newsletter-input {
  width: 100%;
  padding: 16px 24px;
  border-radius: 9999px;
  color: #1f2937;
  border: none;
  outline: none;
  font-size: 16px;
  box-sizing: border-box;
  margin-bottom: 16px;
}

.newsletter-input:focus {
  outline: 2px solid white;
  outline-offset: 2px;
}

.newsletter-button {
  width: 100%;
  background-color: white;
  color: #1e40af;
  padding: 16px 24px;
  border-radius: 9999px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.newsletter-button:hover {
  background-color: #f3f4f6;
}

/* Footer */
.footer {
  background-color: #f3f4f6;
  padding: 48px 0;
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}

.footer-column {
  display: flex;
  flex-direction: column;
}

.footer-column-last {
  justify-content: flex-start;
  align-items: flex-end;
}

@media (max-width: 768px) {
  .footer-column-last {
    align-items: flex-start;
  }
}

/* Logo */
.logo-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background-color: #2563eb;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.logo-name {
  font-size: 20px;
  font-weight: bold;
  color: #000;
}

.logo-extension {
  color: #f97316;
}

.footer-description {
  color: #4b5563;
  font-size: 14px;
  line-height: 1.5;
}

/* Footer Links */
.footer-heading {
  font-weight: 600;
  margin-bottom: 16px;
  color: #1f2937;
  font-size: 14px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-link {
  font-size: 14px;
  color: #4b5563;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-link:hover {
  color: #2563eb;
}

/* Mvola Badge */
.mvola-badge {
  /* background-color: #facc15; */
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  display: inline-block;
}

/* Footer Bottom */
.footer-bottom {
  border-top: 1px solid #e5e7eb;
  margin-top: 32px;
  padding-top: 32px;
  text-align: center;
  font-size: 14px;
  color: #4b5563;
}
</style>