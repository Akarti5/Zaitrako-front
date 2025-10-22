<template>
  <div class="product-detail">
    <div class="container">
      <div v-if="loading" class="loading">Chargement du produit...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else>
        <!-- Centered title section -->
        <div class="title-section">
          <h1 class="title">{{ product.name?.toUpperCase() }}</h1>
          <div class="category-name" v-if="categoryName">{{ categoryName }}</div>
        </div>

        <div class="detail-grid">
          <div class="left-col">
            <div class="image-wrapper">
              <img :src="product.picturepath" :alt="product.name" />
              <span v-if="reductionPercent" class="discount-badge">-{{ reductionPercent }}%</span>
            </div>
            <div class="meta-under-image">
              <div class="under-name">{{ product.name }}</div>
              <div class="rating">
                <div class="stars">
                  <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= Math.floor(rating) }">★</span>
                </div>
                <span class="rating-value">{{ rating }}/5</span>
              </div>
              <div class="price-block">
                <span class="current-price">{{ product.price }} Ar</span>
                <span v-if="originalPrice" class="original-price">{{ originalPrice }} Ar</span>
              </div>
            </div>
          </div>

          <div class="right-col">

            <form class="measure-form" @submit.prevent="handleSubmit">
              <div class="form-field">
                <label>Nom <span class="info" title="Veuillez saisir votre prénom.">ⓘ</span></label>
                <input type="text" v-model="formValues.fullName" placeholder="ex : Annick" required />
              </div>

              <div v-for="(field, idx) in dynamicFields" :key="idx" class="form-field">
                <label>
                  {{ field.label || field.name }}
                  <span v-if="field.tooltips" class="info" :title="field.tooltips">ⓘ</span>
                </label>
                <input 
                  type="number" 
                  step="0.1" 
                  :placeholder="field.placeholder || ''" 
                  v-model.number="formValues.dynamic[idx]" 
                  required
                />
              </div>

              <div class="submit-row">
                <button class="submit-btn" type="submit" :disabled="isSubmitting">
                  {{ isSubmitting ? 'Génération en cours...' : 'Générer le Patron ➔' }}
                </button>
              </div>

              <!-- Added success message and download link -->
              <div v-if="pdfUrl" class="success-message">
                <p><i class="fa-solid fa-check"></i> Patron généré avec succès !</p>
                <a :href="pdfUrl" download class="download-btn"><i class="fa-solid fa-download"></i> Télécharger le PDF</a>
              </div>

              <div v-if="submitError" class="error-message">
                {{ submitError }}
              </div>
            </form>
          </div>
        </div>

        <div class="tutorial-section">
          <h1 class="tutorial-title">TUTORIEL</h1>
          <!-- <div class="download-row" v-if="videoUrl">
            <a :href="videoUrl" download  class="download-link">📥 Télécharger ce fichier Vidéo</a>
          </div> -->
          <div class="video-wrapper" v-if="videoUrl">
            <video controls preload="metadata">
              <source :src="videoUrl" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { productService } from '../services/api'
import axios from 'axios'

const route = useRoute()
const product = ref({})
const loading = ref(true)
const error = ref(null)
const isSubmitting = ref(false)
const pdfUrl = ref(null)
const submitError = ref(null)

const formValues = ref({
  fullName: '',
  dynamic: [],
})

const rating = computed(() => 4.5)

const reductionPercent = computed(() => {
  if (product.value.reduction_average) return product.value.reduction_average
  if (!product.value.price_no_promo || !product.value.price) return null
  const p = product.value.price
  const o = product.value.price_no_promo
  if (o <= p) return null
  return Math.round(100 - (p / o) * 100)
})

const originalPrice = computed(() => {
  if (product.value.price_no_promo) return product.value.price_no_promo
  if (!reductionPercent.value) return null
  return Math.round(product.value.price / (1 - reductionPercent.value / 100))
})

const categoryName = computed(() => product.value.categorie?.name || product.value.category_name || '')

const dynamicFields = computed(() => {
  if (Array.isArray(product.value.fields)) return product.value.fields
  if (Array.isArray(product.value.forms)) return product.value.forms
  return []
})

const videoUrl = computed(() => product.value.urlvideo);

onMounted(async () => {
  try {
    const slug = route.params.slug
    const all = await productService.getAllProducts()
    const found = all.find(p => String(p.slug || p._id || p.id) === String(slug))
    if (!found) {
      throw new Error('Produit introuvable')
    }
    product.value = found
    formValues.value.dynamic = new Array(dynamicFields.value.length).fill('')
  } catch (err) {
    error.value = "Erreur lors du chargement du produit"
    console.error(err)
  } finally {
    loading.value = false
  }
})

const handleSubmit = async () => {
  // Validate form
  const missingDynamic = dynamicFields.value.some((_, idx) => 
    formValues.value.dynamic[idx] === '' || 
    formValues.value.dynamic[idx] === null || 
    Number.isNaN(formValues.value.dynamic[idx])
  )
  
  if (!formValues.value.fullName || missingDynamic) {
    submitError.value = 'Veuillez remplir tous les champs avec des valeurs valides.'
    return
  }

  // Reset states
  isSubmitting.value = true
  submitError.value = null
  pdfUrl.value = null

  try {
    // Build the request payload based on product type
    const productType = product.value.slug || product.value.type
    
    // Map dynamic fields to their proper names
    const measurementData = {
      name: formValues.value.fullName
    }

    // Map the dynamic fields based on the field names
    dynamicFields.value.forEach((field, idx) => {
      const fieldName = field.name || field.label
      measurementData[fieldName] = formValues.value.dynamic[idx]
    })

    console.log('[v0] Submitting pattern generation request:', {
      type: productType,
      value: measurementData
    })

    // Call the backend API
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
    const response = await axios.post(`${API_BASE_URL}/api/catalogue`, {
      type: productType,
      value: measurementData
    })

    console.log('[v0] Pattern generation response:', response.data)

    // Set the PDF URL from the response
    if (response.data.url) {
      pdfUrl.value = `${API_BASE_URL}${response.data.url}`
      console.log('[v0] PDF URL:', pdfUrl.value)
    } else {
      throw new Error('URL du PDF non reçue du serveur')
    }

  } catch (err) {
    console.error('[v0] Error generating pattern:', err)
    submitError.value = err.response?.data?.message || 
                        'Erreur lors de la génération du patron. Veuillez réessayer.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.product-detail {
  padding: 60px 0;
}

.title-section {
  text-align: center;
  margin-bottom: 40px;
}

.detail-grid {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 40px;
  align-items: start;
  margin-top: 20px;
}

.left-col .image-wrapper {
  position: relative;
  background-color: #F0DEDE;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 420px;
  border-radius: 12px;
  padding: 20px;
}

.left-col img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.discount-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: #FF6B6B;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 700;
}

.meta-under-image {
  margin-top: 16px;
}

.under-name {
  font-size: 14px;
  color: var(--text-gray);
  margin-bottom: 8px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.stars { display: flex; gap: 2px; }
.star { color: #ddd; font-size: 16px; }
.star.filled { color: var(--accent-orange); }
.rating-value { font-size: 14px; color: var(--text-gray); }

.price-block { display: flex; align-items: center; gap: 12px; }
.current-price { font-size: 24px; font-weight: 800; color: var(--text-dark); }
.original-price { font-size: 18px; color: var(--text-gray); text-decoration: line-through; }

.title-section .title {
  font-size: 36px;
  font-weight: 900;
  color: navajowhite;
  margin: 0 0 8px 0;
  letter-spacing: 1px;
}

.title-section .category-name {
  color: var(--text-gray);
  margin-bottom: 0;
}

.measure-form {
  background: #fff;
  border: 1px solid #e5e7eb;
  padding: 24px;
  border-radius: 12px;
}

.form-field { margin-bottom: 18px; }
.form-field label { display: block; font-weight: 600; margin-bottom: 8px; }
.form-field .info { margin-left: 6px; color: #1e3a8a; cursor: help; }
.form-field input {
  width: 100%;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px 14px;
  outline: none;
}
.form-field input:focus { border-color: #1e3a8a; box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1); }

.submit-row { text-align: center; margin-top: 24px; }
.submit-btn {
  background: navajowhite;
  color: #fff;
  border: none;
  padding: 14px 28px;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
  transition: transform .2s ease, box-shadow .2s ease;
}
.submit-btn:hover:not(:disabled) { 
  transform: translateY(-2px); 
  box-shadow: 0 8px 20px rgba(245, 158, 11, 0.35); 
}
.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Added styles for success and error messages */
.success-message {
  margin-top: 20px;
  padding: 16px;
  background-color: #d1fae5;
  border: 1px solid #10b981;
  border-radius: 8px;
  text-align: center;
}

.success-message p {
  color: #065f46;
  font-weight: 600;
  margin-bottom: 12px;
}

.download-btn {
  display: inline-block;
  background: #10b981;
  color: white;
  padding: 10px 24px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 700;
  transition: transform .2s ease, box-shadow .2s ease;
}

.download-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.35);
}

.error-message {
  margin-top: 20px;
  padding: 16px;
  background-color: #fee2e2;
  border: 1px solid #ef4444;
  border-radius: 8px;
  color: #991b1b;
  text-align: center;
  font-weight: 600;
}

.tutorial-section { margin-top: 60px; text-align: center; }
.tutorial-title { font-size: 40px; color: black; font-weight: 900; margin-bottom: 16px;  font-family: 'Integral CF', sans-serif;}
.download-row { margin-bottom: 16px; }
.download-link { color: var(--primary-blue); font-weight: 700; text-decoration: underline; }
.video-wrapper { max-width: 800px; margin: 0 auto; }
.video-wrapper video { width: 100%; border-radius: 12px; }

.loading, .error { text-align: center; padding: 60px 20px; font-size: 18px; color: var(--text-gray); }

@media (max-width: 1024px) {
  .detail-grid { grid-template-columns: 1fr; }
}
</style>
