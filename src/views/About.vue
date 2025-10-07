<template>
  <div class="about">
    <div class="container">
      <h1 class="page-title">À PROPOS</h1>
      
      <div class="about-content">
        <div class="about-section">
          <h2>Notre Mission</h2>
          <p>Zaitrako.mg est un générateur de patron automatique et sur mesure qui révolutionne la façon dont vous créez vos vêtements. En quelques clics, obtenez des patrons de couture parfaitement adaptés à vos mesures.</p>
        </div>

        <div class="about-section">
          <h2>Pourquoi Zaitrako ?</h2>
          <ul>
            <li>Patrons sur mesure en quelques minutes</li>
            <li>Plus de 10 modèles disponibles</li>
            <li>Interface simple et intuitive</li>
            <li>Économisez du temps et de l'argent</li>
            <li>Résultats professionnels garantis</li>
          </ul>
        </div>

        <div class="about-section">
          <h2>Notre Histoire</h2>
          <p>Fondée à Madagascar, Zaitrako.mg est née de la passion pour la couture et la technologie. Nous avons créé cette plateforme pour rendre la création de patrons accessible à tous, des débutants aux professionnels.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  padding: 60px 0;
  min-height: 70vh;
}

.page-title {
  font-size: 48px;
  font-weight: 900;
  text-align: center;
  margin-bottom: 60px;
  text-transform: uppercase;
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
}

.about-section {
  margin-bottom: 48px;
}

.about-section h2 {
  font-size: 32px;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 20px;
}

.about-section p {
  font-size: 18px;
  line-height: 1.8;
  color: var(--text-gray);
  margin-bottom: 16px;
}

.about-section ul {
  list-style: none;
  padding: 0;
}

.about-section li {
  font-size: 18px;
  line-height: 1.8;
  color: var(--text-gray);
  padding-left: 32px;
  position: relative;
  margin-bottom: 12px;
}

.about-section li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--accent-orange);
  font-weight: 700;
  font-size: 20px;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 36px;
  }

  .about-section h2 {
    font-size: 28px;
  }

  .about-section p,
  .about-section li {
    font-size: 16px;
  }
}
</style>
