<template>
  <div>
      <ol>
    <li v-for="listItem in listItems" :key="listItem.id" >
      {{listItem.content}}
      <button v-on:click="updateListItem(listItem.id)">Edit</button>
      <button v-on:click="deleteListItem(listItem.id)">Delete</button>
    </li>
    <li>
        <input type="text" v-model="newListItemText">
      <button v-on:click="createListItem(newListItemText)"  >Add</button>
    </li>
    </ol>
    <ul v-if="errors && errors.length">
    <li v-for="(error, index) of errors" :key="`error-${index}`">
      {{error.response.data.error}}
    </li>
  </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "listy",
  data() {
    return {
      listItems: [],
      errors: [],
      newListItemText: ""
    };
  },
  methods: {
    createListItem: function(text) {
      // Send a POST request
      console.log(text);
      axios
        .post("http://localhost:3000/api/list", { content: text })
        .then(response => {
          // If creation is successful, update the list to show it
          this.readList();
          // And clear the input box
          this.newListItemText = "";
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    readList: function() {
      axios
        .get(`http://localhost:3000/api/list`)
        .then(response => {
          this.listItems = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    updateListItem: function(id, event) {
      console.log("Updating list item with ID " + id);
    },
    deleteListItem: function(id, event) {
      console.log("Deleting list item with ID " + id);
      axios
        .delete("http://localhost:3000/api/list/" + id)
        .then(response => {
          // If deletion is successful, update the list to show it
          this.readList();
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  created() {
    this.readList();
  }
};
</script>

<style>

</style>
