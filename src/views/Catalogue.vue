<template>
  <div class="catalogue">
    <div class="container">
      <h1 class="page-title">CATALOGUE</h1>
      
      <div class="filters">
        <button 
          @click="setFilter('all')" 
          :class="allButtonClass"
        >
          Tous
        </button>
        <button 
          @click="setFilter('jupe')" 
          :class="jupeButtonClass"
        >
          Jupe
        </button>
        <button 
          @click="setFilter('pantalon')" 
          :class="pantalonButtonClass"
        >
          Pantalon
        </button>
      </div>

      <div v-if="loading" class="loading">Chargement des produits...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else-if="filterCategory === 'pantalon'" class="loading">Les types de pantalons seront disponibles à la prochaine version.</div>
      <div v-else class="products-grid">
        <ProductCard 
          v-for="product in filteredProducts" 
          :key="product._id" 
          :product="product" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { productService } from '../services/api'

const route = useRoute()
const products = ref([])
const loading = ref(true)
const error = ref(null)
const filterCategory = ref('all')

const filteredProducts = computed(() => {
  if (filterCategory.value === 'all' || filterCategory.value === 'jupe') {
    return products.value
  }
  
  return products.value.filter(product => {
    const categoryName = product.categorie?.name?.toLowerCase() || ''
    return categoryName.includes(filterCategory.value.toLowerCase())
  })
})

const allButtonClass = computed(() => ({
  'filter-btn': true,
  'active': filterCategory.value === 'all'
}))

const jupeButtonClass = computed(() => ({
  'filter-btn': true,
  'active': filterCategory.value === 'jupe'
}))

const pantalonButtonClass = computed(() => ({
  'filter-btn': true,
  'active': filterCategory.value === 'pantalon'
}))

const setFilter = (category) => {
  filterCategory.value = category
}

watch(() => route.query.category, (newCategory) => {
  if (newCategory) {
    filterCategory.value = newCategory
  }
}, { immediate: true })

onMounted(async () => {
  try {
    const data = await productService.getAllProducts()
    products.value = data
  } catch (err) {
    error.value = 'Erreur lors du chargement des produits'
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.catalogue {
  padding: 60px 0;
  min-height: 70vh;
}

.page-title {
  font-family: 'Integral CF', sans-serif;
  font-size: 48px;
  font-weight: 900;
  text-align: center;
  margin-bottom: 48px;
  text-transform: uppercase;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 48px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 12px 32px;
  border: 2px solid var(--primary-blue);
  background: white;
  color: var(--primary-blue);
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background-color: var(--primary-blue);
  color: white;
}

.filter-btn.active {
  background-color: var(--primary-blue);
  color: white;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
}

.loading, .error {
  text-align: center;
  padding: 60px 20px;
  font-size: 18px;
  color: var(--text-gray);
}

@media (max-width: 768px) {
  .page-title {
    font-size: 36px;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 24px;
  }
}

@media (max-width: 640px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
