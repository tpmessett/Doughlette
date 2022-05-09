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
  uri: 'https://partner.api.slerp.com/v1/graphql',
  headers: {
  authorization: 'Bearer ' + process.env.VUE_APP_KEY,

    }
  });

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

createApp(App).mount('#app')
