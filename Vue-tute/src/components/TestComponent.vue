<template>
    <div id="test-component">
        <ol>
            <li :key="name" v-for="name in names" :class="{ isRicky: name === 'Ricky' }">
              <test-component-name>{{name}}</test-component-name>
            </li>
        </ol>
        <form @submit.prevent="addName">
            <input type="text" id="add-name-input" v-model="newName">
            <button type="button" @click="addName">Add Name</button>
        </form>
        <button :disabled="isTestButtonDisabled" @click="toggleTestButton" v-text="testButtonText" />
    </div>
</template>

<script>
import TestComponentName from "./TestComponentName";

export default {
  name: "test-component",
  data() {
    return {
      newName: "",
      names: ["Ricky", "Sticky", "Micky", "Stan"],
      isTestButtonDisabled: false,
      testButtonText:"Click Me!"
    };
  },
  components:{
    TestComponentName
  },
  methods: {
    addName() {
      if (this.newName === "") return;
      this.names.push(this.newName);
      this.newName = "";
    },

    toggleTestButton(){
       this.isTestButtonDisabled = !this.isTestButtonDisabled;
       this.testButtonText = "Processing...";
       setTimeout(() => {
       this.isTestButtonDisabled = !this.isTestButtonDisabled;
       this.testButtonText = "Click Me!";
       }, 5000);
    }
  }
};
</script>


<style lang="scss" scoped>

.isRicky{
  color: green;
}
</style>