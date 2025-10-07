<template>
  <div class="contact">
    <div class="container">
      <h1 class="page-title">CONTACT</h1>
      
      <div class="contact-content">
        <div class="contact-info">
          <h2>Contactez-nous</h2>
          <p>Vous avez des questions ? N'hésitez pas à nous contacter.</p>
          
          <div class="info-item">
            <h3>Email</h3>
            <p>contact@zaitrako.mg</p>
          </div>
          
          <div class="info-item">
            <h3>Téléphone</h3>
            <p>+261 XX XX XXX XX</p>
          </div>
          
          <div class="info-item">
            <h3>Adresse</h3>
            <p>Antananarivo, Madagascar</p>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="contact-form">
          <div class="form-group">
            <label for="name">Nom complet</label>
            <input type="text" id="name" v-model="form.name" required />
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="form.email" required />
          </div>
          
          <div class="form-group">
            <label for="subject">Sujet</label>
            <input type="text" id="subject" v-model="form.subject" required />
          </div>
          
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" v-model="form.message" rows="6" required></textarea>
          </div>
          
          <button type="submit" class="btn btn-primary">Envoyer</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const handleSubmit = () => {
  alert('Message envoyé avec succès!')
  form.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
}
</script>

<style scoped>
.contact {
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

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  max-width: 1000px;
  margin: 0 auto;
}

.contact-info h2 {
  font-size: 32px;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 16px;
}

.contact-info > p {
  font-size: 18px;
  color: var(--text-gray);
  margin-bottom: 32px;
}

.info-item {
  margin-bottom: 24px;
}

.info-item h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 8px;
}

.info-item p {
  font-size: 16px;
  color: var(--text-gray);
}

.contact-form {
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 8px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--border-gray);
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-blue);
}

.form-group textarea {
  resize: vertical;
}

@media (max-width: 968px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 36px;
  }

  .contact-info h2 {
    font-size: 28px;
  }
}
</style>
