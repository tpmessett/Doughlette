<template>
  <img class="logo-image" :class="{ rotate: rotating === true }" alt="Crosstown logo" src="./assets/logo.png">
  <h1>Ready to play Doughlette?</h1>
  <p>With risk comes reward... Click below to spin the doughnut of fortune for a mystery doughnut at a discounted price... You'll get at least 50% off, but you don't get to choose your flavour... Cinamon, Chocolate, Jam, Lime, even Matcha, it could be anything.</p>
  <p>Of course, if the risk of a rogue flavour is too much for your taste buds you can always <a href="https://crosstown.slerp.com">wuss out</a> and order on our website</p>
  <div class="button-container">
    <div @click='rotates' class='button'>PLAY DOUGHLETTE</div>
  </div>
  <div class="button-container">
    <a class='button-reverse' href="https://crosstown.slerp.com">Nope, let me choose!</a>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  setup(){
    const rotating = ref(false)
    const rotates = () => {
      rotating.value = true

    }
    return {
      rotating,
      rotates
    }
  }
}
</script>

<style>

.rotate {
  animation: rotation 8s linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  height: 100vh;
  background-color: black;
  margin: 0;
}

#app {
  height: 100vh;
  padding-left: 16px;
  padding-right: 16px;
}

.logo-image {
  width: 200px;
  margin: 48px;
}

h1 {
  font-size: 20px;
  font-weight: 900;
}

.button {
  color: black;
  background-color: white;
  padding: 12px;
  width: 50%;
  margin-top: 40px;
  border: 2px solid white;
}

.button:hover {
  color: white;
  background-color: black;

}

.button-reverse {
  color: white;
  background-color: black;
  padding: 12px;
  width: 50%;
  margin-top: 40px;
  border: 2px solid white;
  text-decoration: none;
}


.button-reverse:hover {
  color: black;
  background-color: white;

}
.button-container {
  display: flex;
  justify-content: center;
}
</style>
