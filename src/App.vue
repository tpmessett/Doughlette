<template>
    <img class="logo-image" alt="logo" src="./assets/logo.png">
  <div v-if="result && urlFound == true" id="content">
    <h1 v-if="result.store_variants.length != 0">{{result.store_variants[0].product_variant.name}}</h1>
    <h3 v-if="result.store_variants != 0">Date: {{result.store_variants[0].product_variant.product.category.special_availabilities[0].start_date}}</h3>
    <p v-if="result.store_variants != 0">{{result.store_variants[0].product_variant.product.description}}</p>
    <div v-if="result.store_variants != 0">
      <div class="tickets">
        <div class="align-items">
          Number of Tickets:
        </div>
        <div class="number-of">
          <div @click="numberMinus()" class="align-items"><i class="pi pi-minus-circle"></i></div>
          <div class="number-of align-items">{{number}}</div>
          <div @click="maxGuests()" class="align-items"><i class="pi pi-plus-circle"></i></div>
        </div>
      </div>
      <div class="max-guests" v-if="maxReached"> No more than {{number}} guests </div>
      <div class="input-div">
        <div class="w50 align-center">
          <label for="fname">First name:</label>
        </div>
        <div class="w50">
          <input v-model="firstName" type="text" id="fname" name="fname" placeholder="John">
          <div v-if="firstNameEmpty" class="small" style="color:red">Please enter a First Name</div>
        </div>
      </div>
      <div class="input-div">
        <div class="w50 align-center">
          <label for="lname">Last name:</label>
        </div>
        <div class="w50">
          <input v-model="lastName" type="text" id="lname" name="lname" placeholder="Smith">
          <div v-if="lastNameEmpty" class="small" style="color:red">Please enter a Last Name</div>
        </div>
      </div>
      <div class="input-div">
        <div class="w50 align-center">
          <label for="email">Email:</label>
        </div>
        <div class="w50">
          <input v-model="email" type="text" id="email" name="email" placeholder="hello@test.com">
          <div v-if="invalidEmail" class="small" style="color:red">Please enter a valid email</div>
        </div>
      </div>
      <div class="input-div">
        <div class="w50 align-center">
          <label for="phone">Phone Number:</label>
        </div>
        <div class="w50">
          <input v-model="phone" type="number" id="phone" name="phone" placeholder="0123456789">
          <div v-if="invalidPhone" class="small" style="color:red">Please enter a phone number</div>
        </div>
      </div>
      <div v-if="number > 1" class="input-div">
        <div class="w50 align-center">
          <label for="phone">Guest Names:</label>
        </div>
        <div class="w50">
          <input v-model="guests" type="textarea" id="guests" name="guests" placeholder="John Doe, Jane Doe">
          <div v-if="invalidGuests" class="small" style="color:red">Please enter guest names</div>
        </div>
      </div>
    </div>
    <div v-if="result && result.store_variants.length > 0" class="button-container">
      <div @click="validate()" class='button'>BOOK NOW</div>
    </div>
  </div>
  <div v-if="products && urlFound == false">
    <h1>UPCOMING EVENTS</h1>
    <div v-for="(product, index) in products.result.value.products" :key="index" style="padding: 8px 16px; margin-bottom: 8px">
      <h3>{{product.name}}</h3>
      <h5>{{product.category.special_availabilities[0].start_date}}</h5>
      <p class="desc">{{product.description}}</p>
      <a :href="product.sku" class='button'>BOOK NOW</a>
    </div>
  </div>
  <br>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useQuery } from "@vue/apollo-composable";
//import { useMutation } from '@vue/apollo-composable';
import { gql } from "@apollo/client/core"

export default {
  setup(){
    const urlFound = ref(false)
    const getSku = () => {
      const url = window.location.pathname
      if (url.length > 1) {
        urlFound.value = true
      } else {
        urlFound.value = false
      }
      return url.slice(1)
    }
    const number = ref(1)
    const firstName = ref("")
    const maxReached = ref(false)
    const numberMinus = () => {
      if (number.value > 1) {
        number.value--
        maxReached.value = false
      }
    }
    const firstNameEmpty = ref(false)
    const lastName = ref("")
    const lastNameEmpty = ref(false)
    const email = ref("")
    const invalidEmail = ref(false)
    const phone = ref("")
    const invalidPhone = ref(false)
    const guests = ref("")
    const invalidGuests = ref(false)
    const validate = () => {
      if (!firstName.value) {
        firstNameEmpty.value = true
      } else {
        firstNameEmpty.value = false
      }
      if (!lastName.value) {
        lastNameEmpty.value = true
      } else {
        lastNameEmpty.value = false
      }
      if (!emailTest(email.value)){
        invalidEmail.value = true
      } else {
        invalidEmail.value = false
      }
      if (!phone.value) {
        invalidPhone.value = true
      } else {
        invalidPhone.value = false
      }
      if (!guestscheck()){
        invalidGuests.value = true
      } else {
        invalidGuests.value = false
      }
      if (firstName.value && lastName.value && emailTest(email.value) && phone.value && guestscheck()) {
        //createCheckout()
        console.log('done')
      }
    }
    const guestscheck = () => {
      if (number.value > 1 && !guests.value) {
        return false
      }  else {
        return true
      }
    }

    const maxGuests = () => {
      if(number.value < result.value.store_variants[0].product_variant.product.default_limit) {
        number.value++
        maxReached.value = false
      } else {
        maxReached.value = true
      }
    }

    const emailTest = (e: any) => {
     if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e))
      {
        return true
      }
      else {
        return false
      }
    }
    const sku = getSku()
    //const store = process.env.VUE_APP_STORE
    const PRODUCT_QUERY = gql`
      query getBySku {
        store_variants(where: {product_variant: {sku: {_eq: "${sku}"}}}) {
          variant_id
          in_stock
          stock_count
          stock_sold
          product_variant {
            limit
            image
            name
            price
            product {
              description
              default_limit
              category {
                special_availabilities
              }
            }
          }
        }
      }
    `
    const { result, error } = useQuery(PRODUCT_QUERY)

    const ALL_PRODUCTS = gql`
      query MyQuery {
        products(where: {merchant: {slug: {_eq: "maisonestelle"}}}) {
          name
          description
          category {
            special_availabilities
          }
          sku
        }
      }
    `
    const products = useQuery(ALL_PRODUCTS)
    console.log(products)
    // const GET_VALID_STORE = gql`
    //   query getValidStore ($date: String!)
    //          {
    //           getValidStore(
    //               storeId: "40694597-494c-4209-ac53-2b87c9a90c81",
    //               fulfillmentType: "pickup",
    //               fulfillmentDate: $date,
    //               address: ""
    //             )
    //             {
    //               name
    //               id
    //               fulfillmentTimeslots(fulfillmentDate: $date) {
    //                 endTime
    //                 startTime
    //                 value
    //             }
    //           }
    //         }
    // `

    // const { mutate: createCart } = useMutation(gql `
    //   mutation CreateSlerpCart($orderItems: [OrderItemParams], $date: String!) {
    //     createSlerpCart(
    //       storeId: "40694597-494c-4209-ac53-2b87c9a90c81",
    //       merchantId: "${process.env.VUE_APP_MERCHANT_ID}",
    //       fulfillmentType: "pickup",
    //       address: "",
    //       fulfillmentDate: $date,
    //       fulfillmentTime: "asap",
    //       orderItems: $orderItems,
    //     ) {
    //       id
    //     }
    //   }
    // `)

    // const { mutate: createPayment } = useMutation(gql `
    //   mutation WebCartPayment($cartId:ID!, $cancelUrl:String!, $successUrl:String!) {
    //     payViaWeb(cartId:$cartId, cancelUrl:$cancelUrl, mode: "stripe", successUrl:$successUrl) {
    //       sessionData
    //     }
    //   }
    // `)

    // const createCheckout = () => {
    //   const date = result.value.store_variants[0].product_variant.product.category.special_availabilities[0].start_date
    //   const gvs = useQuery(GET_VALID_STORE, () => ({
    //   date: date,
    // }))
    //   console.log(gvs)
    //   const items = [{
    //     productVariantId: result.value.store_variants[0].variant_id,
    //     quantity: number.value,
    //     appliedModifiers: []
    //   }]
    //   const dates = result.value.store_variants[0].product_variant.product.category.special_availabilities[0].start_date
    //   //const cart = createCart({orderItems: items, date: dates})
    //   return cart
    // }
    return {
      sku,
      result,
      products,
      error,
      number,
      numberMinus,
      validate,
      firstName,
      lastName,
      phone,
      email,
      firstNameEmpty,
      lastNameEmpty,
      invalidEmail,
      invalidPhone,
      guests,
      invalidGuests,
      maxGuests,
      maxReached,
      urlFound
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

.input-div {
  width: 100%;
 /* text-align: left;*/
  padding-top:  16px;
  display:  flex;
  justify-content:  space-around;
}

a {
  text-decoration: none;
}

.small {
  margin:  2px;
  padding:  0;
  letter-spacing: 1px;
  font-size: 10px;
}

input {
  max-width: 100%;
  padding: 8px;
  margin-top: 4px;
  border:  none;
}

.tickets {
  display:  flex;
  justify-content:  space-around;
}

.w50 {
  width: 50%;
}

h3 {
  font-size: 16px
}

.desc {
  padding-bottom: 18px;
  font-size: 14px;
}
.align-center {
  display:  flex;
  align-items: center;
  justify-content: center;
}

.number-of {
  display:  flex;
  justify-content:  space-between;
  font-size: 20px;
  padding: 0px 8px;
}

.align-items {
  display:  flex;
  align-items: center;
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

.max-guests {
  color:red;
  text-align: right;
  font-size: 12px;
}

.button {
  color: #D09D70;
  background-color: #e6e6e6;
  padding: 12px;
  width: 50%;
  margin-top: 40px;
  margin-bottom: 40px;
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
