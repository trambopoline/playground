<template>
	<section class="hero">
		<div class="hero-body">
			<div class="container">
				<b-table :data="listItems">
					<template slot-scope="props">
						<b-table-column field="content" numeric> {{ props.row.content }}
						</b-table-column>
						<b-table-column custom-key="actions">
							<button class="button" @click="handleEditButtonClick(props.row)">
								<b-icon icon="pencil" />
							</button>
							<button class="button" @click="deleteListItem(props.row)">
								<b-icon icon="delete"></b-icon>
							</button>
							<button class="button" @click="edit(props.row)">
								<b-icon icon="edit"></b-icon>
							</button>
						</b-table-column>
					</template>
					<template slot="footer">
						<td>
							<input class="input" type="text" v-model="newListItemText">
						</td>
						<td>
							<button class="button" @click="createListItem(newListItemText)">Add</button>
						</td>
					</template>
				</b-table>
				<!-- <table class="table">
					<thead></thead>
					<tbody>
						<tr v-for="listItem in listItems" :key="listItem.id">
							<span v-if="listItemBeingEdited && listItem.id === listItemBeingEdited.id">
								<td>
									<input class="input" type="text" v-model="listItemBeingEdited.content">
								</td>
								<td>
									<button class="button" @click="handleDoneButtonClick(listItem)">Done</button>
								</td>
								<td></td>
							</span>
							<span v-else>
								<td>{{listItem.content}}</td>
								<td>
									<button class="button" @click="handleEditButtonClick(listItem)">Edit</button>
								</td>
								<td>
									<button class="button" @click="deleteListItem(listItem.id)">Delete</button>
								</td>
							</span>
						</tr>
							<tr>
								<td>
									<input class="input" type="text" v-model="newListItemText">
								</td>
								<td>
									<button class="button" @click="createListItem(newListItemText)">Add</button>
								</td>
							</tr>
					</tbody>
				</table> -->
			</div>
		</div>
		<!-- <ul v-if="errors && errors.length">
            <li v-for="(error, index) of errors" :key="`error-${index}`">
                {{error.response.data.error}}
            </li>
        </ul> -->
	</section>
</template>

<script>
import axios from "axios";

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
			listItemBeingEdited: null,
			columns: [
				{
					field: "content"
					// label: 'ID',
					// width: '40',
					// numeric: true
				}
			],
			columnsTemplate: [
				{ title: "", field: "content", visible: true },
				{ title: "First Name", field: "first_name", visible: true },
				{ title: "Last Name", field: "last_name", visible: true },
				{ title: "Date", field: "date", visible: true },
				{ title: "Gender", field: "gender", visible: true }
			]
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
		deleteListItem(listItem) {
			const listItemId = listItem.id;
			//   console.log("Deleting list item with ID " + id);
			axios
				.delete(`http://localhost:3000/api/list/${listItemId}`)
				.then(response => {
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
