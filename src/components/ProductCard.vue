<template>
  <div class="product-card">
    <div class="product-image">
      <img 
        :src="product.picturepath || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22250%22 height=%22300%22%3E%3Crect width=%22250%22 height=%22300%22 fill=%22%23f0f0f0%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22sans-serif%22 font-size=%2218%22 fill=%22%23999%22%3EImage%3C/text%3E%3C/svg%3E'" 
        :alt="product.name" 
      />
      <span v-if="discount" class="discount-badge">-{{ discount }}%</span>
    </div>
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <div class="rating">
        <div class="stars">
          <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= Math.floor(rating) }">★</span>
        </div>
        <span class="rating-value">{{ rating }}/5</span>
      </div>
      <div class="price-container">
        <span class="current-price">{{ product.price }} Ar</span>
        <span v-if="originalPrice" class="original-price">{{ originalPrice }} Ar</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const rating = computed(() => 4.5)
const discount = computed(() => {
  if (props.product.price < 2000) return 50
  if (props.product.price < 4000) return 25
  return null
})

const originalPrice = computed(() => {
  if (!discount.value) return null
  return Math.round(props.product.price / (1 - discount.value / 100))
})
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.product-image {
  position: relative;
  background-color: #F0DEDE;
  padding: 20px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image img {
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

.product-info {
  padding: 20px;
}

.product-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text-dark);
}

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  color: #ddd;
  font-size: 18px;
}

.star.filled {
  color: var(--accent-orange);
}

.rating-value {
  font-size: 14px;
  color: var(--text-gray);
}

.price-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.current-price {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-dark);
}

.original-price {
  font-size: 18px;
  color: var(--text-gray);
  text-decoration: line-through;
}

@media (max-width: 640px) {
  .product-image {
    height: 250px;
  }

  .product-name {
    font-size: 16px;
  }

  .current-price {
    font-size: 20px;
  }
}
</style>
