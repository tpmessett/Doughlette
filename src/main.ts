
import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
//import VueApollo from "vue-apollo";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { provideApolloClient } from '@vue/apollo-composable'
import { useQuery } from "@vue/apollo-composable";
import { gql } from "@apollo/client/core"
import Vue from 'vue'
import 'primeicons/primeicons.css';

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: 'https://graph-qa.api.slerpdemo.com/v1/graphql',
  headers: {
  authorization: 'Bearer ' + process.env.VUE_APP_API_KEY,

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

createApp(App).provide(DefaultApolloClient, apolloClient).mount('#app')



