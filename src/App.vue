<template>
    <img class="logo-image" alt="logo" src="./assets/logo.png">
  <div id="content">
    <h1 v-if="result">{{result.store_variants[0].product_variant.name}}</h1>
    <h3 v-if="result">Date: {{result.store_variants[0].product_variant.product.category.special_availabilities[0].start_date}}</h3>
    <p v-if="result">{{result.store_variants[0].product_variant.product.description}}</p>
    <div>
      <div class="tickets">
        <div>
          Number of Tickets:
        </div>
        <div>
          <div></div>
          <div>{{number}}</div>
          <div></div>
        </div>
      </div>
    </div>
    <div class="button-container">
      <div class='button'>BOOK NOW</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useQuery } from "@vue/apollo-composable";
import { gql } from "@apollo/client/core"

export default {
  setup(){
    const getSku = () => {
      const url = window.location.pathname
      return url.slice(1)
    }
    const sku = getSku()
    const store = process.env.VUE_APP_STORE
    const PRODUCT_QUERY = gql`
      query getBySku {
        store_variants(where: {product_variant: {sku: {_eq: "${sku}"}}, store: {slug: {_eq: "${store}"}}}) {
          variant_id
          in_stock
          stock_count
          stock_sold
          product_variant {
            image
            name
            price
            product {
              description
              category {
                special_availabilities
              }
            }
          }
        }
      }
    `
    const { result, error } = useQuery(PRODUCT_QUERY)
    const number = ref(1)
    return {
      sku,
      result,
      error,
      number
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Gelasio&display=swap');

body {
  font-family: Gelasio, Helvetica, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #424325;
  height: 100vh;
  background-color: #e6e6e6;
  margin: 0;
  letter-spacing: 2px;
}

.tickets {
  display:  flex;
  justify-content:  space-around;
}

#app {
  height: 100vh;
}

#content {
  padding-left: 16px;
  padding-right: 16px;
}

.logo-image {
  width: 200px;
  margin: 48px 48px 16px 48px;
}

h1 {
  font-size: 20px;
  font-weight: 900;
}

.button {
  color: #D09D70;
  background-color: #e6e6e6;
  padding: 12px;
  width: 50%;
  margin-top: 40px;
  border: 2px solid #D09D70;
}

.button:hover {
  color: #e6e6e6;
  background-color: #D09D70;

}

.button-reverse {
  color: #e6e6e6;
  background-color: #D09D70;
  padding: 12px;
  width: 50%;
  margin-top: 40px;
  border: 2px solid #e6e6e6;
  text-decoration: none;
}


.button-reverse:hover {
  color: #D09D70;
  background-color: #e6e6e6;

}
.button-container {
  display: flex;
  justify-content: center;
}
</style>
