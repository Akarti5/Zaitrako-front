<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1>GENERER VOTRE PATRON DE COUTURE SUR MESURE</h1>
            <p>Zaitrako.mg est un générateur de patron automatique et sur mesure, en quelques clics. Essayez-le et commencez à optimiser votre style de couture dès maintenant !</p>
            <button class="btn btn-primary">Essayez-le</button>
            
            <div class="stats">
              <div class="stat-item">
                <h3>{{ animatedStats.models }}+</h3>
                <p>Modèles de patron</p>
              </div>
              <div class="stat-item">
                <h3>{{ animatedStats.users }}+</h3>
                <p>Utilisateurs</p>
              </div>
              <div class="stat-item">
                <h3>{{ animatedStats.patterns.toLocaleString() }}+</h3>
                <p>Patron générés</p>
              </div>
            </div>
          </div>
          
          <div class="hero-image">
            <img src="../assets/main.jpg" alt="Sewing patterns and fabrics" />
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section class="products-section">
      <div class="container">
        <h2 class="section-title">NOUVEAUTÉS</h2>
        
        <div v-if="loading" class="loading">Chargement des produits...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else class="products-grid">
          <ProductCard 
            v-for="product in displayedProducts" 
            :key="product._id" 
            :product="product" 
          />
        </div>
        
        <div class="view-more">
          <router-link to="/catalogue" class="view-more-link">Voir catalogue</router-link>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories-section">
      <div class="container">
        <h2 class="section-title">CATEGORIES</h2>
        
        <div class="categories-grid">
          <a href="/catalogue?category=jupe" class="category-card">
            <div class="category-image">
              <img src="https://medias.zaitrako.mg/category/jupe.png" alt="Jupe" />
            </div>
            <h3>Jupe</h3>
          </a>
          
          <a href="/catalogue?category=pantalon" class="category-card">
            <div class="category-image">
              <img src="https://medias.zaitrako.mg/category/pantalon.png" alt="Pantalon" />
            </div>
            <h3>Pantalon</h3>
          </a>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section">
      <div class="container">
        <h2 class="section-title">CE QUE DISENT NOS CLIENTS</h2>

        <div class="testimonials-marquee">
          <div class="marquee-track" :style="{ animationDuration: marqueeDuration }">
            <div 
              v-for="(t, idx) in testimonials" 
              :key="'a'+idx" 
              class="testimonial-card"
            >
              <div class="stars">
                <span v-for="i in 5" :key="i" class="star">★</span>
              </div>
              <h4>{{ t.author }} <span class="verified">✓</span></h4>
              <p>"{{ t.text }}"</p>
            </div>

            <!-- Duplicate for seamless loop -->
            <div 
              v-for="(t, idx) in testimonials" 
              :key="'b'+idx" 
              class="testimonial-card" 
              aria-hidden="true"
            >
              <div class="stars">
                <span v-for="i in 5" :key="i" class="star">★</span>
              </div>
              <h4>{{ t.author }} <span class="verified">✓</span></h4>
              <p>"{{ t.text }}"</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter-section">
      <div class="container">
        <div class="newsletter-content">
          <h2>RESTEZ INFORMÉ</h2>
          <p>Inscrivez-vous à notre newsletter pour recevoir les dernières nouveautés</p>
          <form @submit.prevent="handleNewsletterSubmit" class="newsletter-form">
            <input 
              type="email" 
              v-model="email" 
              placeholder="Entrez votre adresse email" 
              required 
            />
            <button type="submit" class="btn btn-primary">S'inscrire</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { productService } from '../services/api'

const products = ref([])
const loading = ref(true)
const error = ref(null)
const email = ref('')

const displayedProducts = ref([])

// Animated stats
const animatedStats = ref({
  models: 0,
  users: 0,
  patterns: 0
})

const targetStats = {
  models: 10,
  users: 200,
  patterns: 3000
}

// Testimonials data and marquee settings
const testimonials = ref([
  { author: 'Eliah R.', text: "C'est une cinquantaine, j'ai su concevoir ma jupe" },
  { author: 'Holy R.', text: 'Tena tsara ilay hevitra sady tsy mandany fotoana no tsara ny vokatra... Mankasitraka eeee!!!!' },
  { author: 'Marie A.', text: "J'ai gagné 60% de temps de travail avec 5% d'investissement, vous m'avez sauvé la vie" },
  { author: 'Sitraka M.', text: 'Interface simple, résultat parfait. Tena ilaina ho an’ny mpanjaitra.' },
  { author: 'Fanja T.', text: 'Le patron généré tombe juste, du premier coup. Bravo !' },
  { author: 'Arisoa K.', text: 'Gros gain de temps à l’atelier, je recommande sans hésiter.' },
  { author: 'Eddy F.', text: 'Wow tsara be ilay idee , keep it up 🔥🔥🔥.' },
])

// Adjust marquee speed by changing the duration (longer = slower)
const marqueeDuration = computed(() => '35s')

// Animation function
const animateNumber = (start, end, duration, callback) => {
  const startTime = performance.now()
  const animate = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const current = Math.floor(start + (end - start) * progress)
    callback(current)
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  requestAnimationFrame(animate)
}

onMounted(async () => {
  try {
    const data = await productService.getAllProducts()
    products.value = data
    // Display first 8 products
    displayedProducts.value = data.slice(0, 8)
  } catch (err) {
    error.value = 'Erreur lors du chargement des produits'
    console.error(err)
  } finally {
    loading.value = false
  }
  
  // Start number animations after a short delay
  setTimeout(() => {
    animateNumber(0, targetStats.models, 2000, (value) => {
      animatedStats.value.models = value
    })
    animateNumber(0, targetStats.users, 2500, (value) => {
      animatedStats.value.users = value
    })
    animateNumber(0, targetStats.patterns, 3000, (value) => {
      animatedStats.value.patterns = value
    })
  }, 500)
})

const handleNewsletterSubmit = () => {
  alert(`Merci de vous être inscrit avec l'email: ${email.value}`)
  email.value = ''
}
</script>

<style scoped>

.section-title{
   font-family: 'Integral CF', sans-serif;
}
.hero {
  background: linear-gradient(135deg, #f4e4bc 0%, #e6d3a3 100%);
  color: var(--text-dark);
  padding: 80px 0;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-text h1 {
  font-family: 'Integral CF', sans-serif;
  font-size: 56px;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -1px;
}


.hero-text p {
  font-family: 'Satoshi' , sans-serif;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 32px;
  opacity: 0.95;
}

.stats {
  display: flex;
  gap: 48px;
  margin-top: 48px;
}

.stat-item h3 {
  font-family: 'Satoshi';
  font-size: 48px;
  font-weight: 900;
  color: var(--accent-orange);
  margin-bottom: 8px;
}

.stat-item p {
  font-size: 14px;
  opacity: 0.9;
}

.hero-image {
  position: relative;
}

.hero-image img {
  width: 100%;
  height: auto;
  border-radius: 12px;
}

.products-section {
  padding: 80px 0;
}

.products-section 

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
  margin-bottom: 48px;
}

.loading, .error {
  text-align: center;
  padding: 60px 20px;
  font-size: 18px;
  color: var(--text-gray);
}

.view-more {
  text-align: center;
}

.view-more-link {
  background: var(--primary-blue);
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  padding: 10px 18px;
  border-radius: 8px;
  text-decoration: none;
  display: inline-block;
  transition: 0.3s;
}

.view-more-link:hover {
  background: #0a58ca;
  transform: scale(1.05);
}

.categories-section {
  padding: 80px 0;
  background-color: #f8f8f8;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 48px;
  max-width: 900px;
  margin: 0 auto;
}

.category-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.category-image {
  background-color: #F0DEDE;
  padding: 40px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.category-card h3 {
  padding: 24px;
  font-size: 32px;
  font-weight: 700;
  color: var(--text-dark);
  text-align: center;
}

.testimonials-section {
  padding: 80px 0;
}

.testimonials-marquee {
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.marquee-track {
  display: flex;
  gap: 24px;
  width: max-content;
  animation-name: marqueeLeft;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.testimonial-card {
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  min-width: 320px;
}

.testimonial-card .stars {
  display: flex;
  gap: 4px;
  margin-bottom: 16px;
}

.testimonial-card .star {
  color: var(--accent-orange);
  font-size: 20px;
}

.testimonial-card h4 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.verified {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background-color: #4CAF50;
  color: white;
  border-radius: 50%;
  font-size: 12px;
}

.testimonial-card p {
  color: var(--text-gray);
  line-height: 1.6;
  font-style: italic;
}

.newsletter-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #f4e4bc 0%, #e6d3a3 100%);
  color: var(--text-dark);
}

.newsletter-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.newsletter-content h2 {
  font-size: 36px;
  font-weight: 900;
  margin-bottom: 16px;
}

.newsletter-content p {
  font-size: 18px;
  margin-bottom: 32px;
  opacity: 0.95;
}

.newsletter-form {
  display: flex;
  gap: 16px;
  max-width: 500px;
  margin: 0 auto;
}

.newsletter-form input {
  flex: 1;
  padding: 14px 20px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
}

.newsletter-form input:focus {
  outline: none;
}

@media (max-width: 968px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .hero-text h1 {
    font-size: 40px;
  }

  .stats {
    gap: 32px;
  }

  .stat-item h3 {
    font-size: 36px;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 24px;
  }

  .categories-grid {
    gap: 32px;
  }

}

@media (max-width: 640px) {
  .hero {
    padding: 40px 0;
  }

  .hero-text h1 {
    font-size: 32px;
  }

  .hero-text p {
    font-size: 16px;
  }

  .stats {
    flex-direction: column;
    gap: 24px;
  }

  .products-section {
    padding: 40px 0;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .newsletter-form input,
  .newsletter-form button {
    width: 100%;
  }
}

@keyframes marqueeLeft {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
