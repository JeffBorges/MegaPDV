<template>
  <div class="md-layout">

  </div>
</template>

<script>
export default {
  data: () => ({
    textarea: ""
  }),
  methods: {
    log(s) {
      console.log(s)
      //this.textarea += "\n" + s;
    },
    runGet() {
      let url = "/app/public/test/hello";
      this.log("Chamando GET na URL: " + url);

      this.$http.get(url, { params: { id: 1 } }).then(
        response => {
          this.log(response.body);
        },
        response => {
          this.log(response.body);
        }
      );
    },
    runPost() {
      let url = "/app/public/test/helloPost";
      this.log("Chamando POST na URL: " + url);

      this.$http.post(url, { params: { id: 1 } }).then(
        response => {
          this.log(response.body);
        },
        response => {
          this.log(response.body);
        }
      );
    },
    runEtl() {
      let url = "/app/secure/etl/run";
      this.log("Chamando POST na URL: " + url);

      this.$http.post(url, { params: { id: 1 } }).then(
        response => {
          this.log(response.body);
        },
        response => {
          this.log(response.body);
        }
      );
    },
    runAuthenticatedGet() {
      let url = "/app/prod/getAll";
      this.log("Chamando GET na URL: " + url);

      this.$http.post(url, { params: { id: 1 } }).then(
        response => {
          this.log(response.body);
        },
        response => {
          this.log(response.body);
        }
      );
    },
    runAdminGet() {
      let url =  "/app/secure/admin/getInfo";
      this.log("Chamando GET na URL: " + url);

      this.$http.post(url, { params: { id: 1 } }).then(
        response => {
          this.log(response.body);
        },
        response => {
          this.log(response.body);
        }
      );
    }
  }
};
</script>

<style>
.md-field .md-textarea {
  max-height: none;
}
</style>
