<template>
  <!-- <amplify-authenticator> -->
    <div id="app">
      <md-toolbar class="md-accent" md-elevation="1">
        <h3 class="md-title" style="flex: 1">SBM App</h3>
        <!-- <md-button v-on:click="clearAll">Clear All</md-button> -->
      </md-toolbar>
      <!-- <amplify-sign-out></amplify-sign-out> -->
      <div style="margin: 20px">
        <input type="text" v-model="payload" placeholder="Payload">
        <button v-on:click="createRecord">Create Record</button>
      </div>

      <!-- TABLE -->
      <md-table md-card>
        <md-table-toolbar>
          <h1 class="md-title">Payloads</h1>
        </md-table-toolbar>

        <md-table-row>
          <md-table-head>CreatedAt</md-table-head>
          <md-table-head>Payload</md-table-head>
        </md-table-row>

        <md-table-row v-for="item in records" :key="item.id">
            <md-table-cell >{{ item.createdAt }} </md-table-cell>
            <md-table-cell >{{ item.payload }} </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  <!-- </amplify-authenticator> -->
</template>

<script>
import { API } from 'aws-amplify';
import { createRecord } from './graphql/mutations';
import { listRecords } from './graphql/queries';
// other imports
import { onCreateRecord } from './graphql/subscriptions';

export default {
  name: 'App',
  data() {
    return {
      payload: '',
      records: []
    }
  },
  created(){
    this.getRecords();
    this.subscribe();
  },
  methods: {
    async createRecord() {
      const { payload } = this;
      if (!payload ) return;
      const rec = { payload };
      await API.graphql({
        query: createRecord,
        variables: {input: rec},
      });
      this.payload = '';
    },
    async getRecords() {
      const records = await API.graphql({
        query: listRecords
      });
      this.records = records.data.listRecords.items;
    },
    subscribe() {
      API.graphql({query: onCreateRecord})
        .subscribe({
            next: (eventData) => {
              let r = eventData.value.data.onCreateRecord;
              //if (this.records.some(item => item.datetime === r.datetime)) return; // remove duplications
              this.records = [...this.records, r];
            }
          });
      this.payload = '';
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
