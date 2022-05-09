import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
//import VueApollo from "vue-apollo";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { provideApolloClient } from '@vue/apollo-composable'
import { useQuery } from "@vue/apollo-composable";
import { gql } from "@apollo/client/core"

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: '',
  headers: {
  authorization: 'Bearer ' + process.env.APi_KEY,

    }
  });

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

provideApolloClient(apolloClient)

const store = createStore({
  state () {
    return {
      products: {}
    }
  },
  actions: {
    setOrder (state: any, location: string) {
      const ORDER = gql `
        query {

        }
      `

      const { onResult } = useQuery(ORDER)
      onResult(({ data }) => {
        state.result = data
        console.log(state.products)
    })
   }
  }
 })

createApp(App).provide(DefaultApolloClient, apolloClient).use(store).mount('#app')



