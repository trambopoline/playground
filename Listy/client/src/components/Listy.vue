<template>
    <div>
        <ol>
            <li v-for="listItem in listItems" :key="listItem.id">
                <span v-if="listItemBeingEdited && listItem.id === listItemBeingEdited.id">
                    <input type="text" v-model="listItemBeingEdited.content">
                    <button @click="handleDoneButtonClick(listItem)">Done</button>
                </span>
                <span v-else>
                    {{listItem.content}}
                    <button @click="handleEditButtonClick(listItem)">Edit</button>
                    <button @click="deleteListItem(listItem.id)">Delete</button>
                </span>
            </li>
            <li>
                <input type="text" v-model="newListItemText">
                <button @click="createListItem(newListItemText)">Add</button>
            </li>
        </ol>
        <!-- <ul v-if="errors && errors.length">
            <li v-for="(error, index) of errors" :key="`error-${index}`">
                {{error.response.data.error}}
            </li>
        </ul> -->
    </div>
</template>

<script>
import axios from "axios";
import "../../node_modules/bulma/css/bulma.css";

axios.interceptors.response.use(undefined, function(error) {
  console.error(error);
  return Promise.reject(error);
  // if(error.response.status === 401) {
  // //   ipcRenderer.send('response-unauthenticated');
  // }
});

export default {
  name: "listy",
  data() {
    return {
      listItems: [],
      errors: [],
      newListItemText: "",
      editListItemText: "",
      listItemBeingEdited: null
    };
  },
  methods: {
    handleEditButtonClick(listItem) {
      // If there is nothing already being edited, just start editing
      if (this.listItemBeingEdited === null) {
        this.listItemBeingEdited = listItem;
        return;
      }

      // Otherwise, save the list item being edited and switch
      this.updateListItem(this.listItemBeingEdited, () => {
        this.listItemBeingEdited = listItem;
        console.log("switched to editing " + listItem.content);
      });
    },
    handleDoneButtonClick(listItem) {
      this.updateListItem(this.listItemBeingEdited, () => {
        // reset the input
        console.log("Unsetting list item currently being edited");
        this.listItemBeingEdited = null;
      });
    },
    createListItem(text) {
      // Send a POST request
      axios
        .post("http://localhost:3000/api/list", { content: text })
        .then(response => {
          // If creation is successful, update the list to show it
          this.readList();
          // And clear the input box
          this.newListItemText = "";
        });
    },
    readList(callback) {
      axios.get(`http://localhost:3000/api/list`).then(response => {
        this.listItems = response.data;
        if (typeof callback == "function") {
          callback();
        }
      });
    },
    updateListItem(listItem, callback) {
      axios
        .put(`http://localhost:3000/api/list/${listItem.id}`, {
          content: listItem.content
        })
        .then(response => {
          console.log("Database update successful");

          // If creation is successful, update the list to show it
          this.readList(callback);
        });
    },
    deleteListItem(id, event) {
      //   console.log("Deleting list item with ID " + id);
      axios.delete(`http://localhost:3000/api/list/${id}`).then(response => {
        // If deletion is successful, update the list to show it
        this.readList();
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
