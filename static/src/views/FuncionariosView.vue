<template>
    <div id='funcionarios'>
        <div class='md-layout'>
            <div class='md-layout-item'>
                <span class="md-display-1">Funcionários</span>
            </div>
            <div class='md-alignment-top-right'>
                <md-button @click='funcionario()'>Novo Funcionário</md-button>
            </div>
        </div>
        <div class='md-layout'>
            <md-table v-model="users" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
                    <md-table-cell md-label="Nome" md-sort-by="name">{{ item.name }}</md-table-cell>
                    <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
                    <md-table-cell md-label="Usuário" md-sort-by="user">{{ item.user }}</md-table-cell>
                    <md-table-cell md-label="Ações">
                        <md-button @click='funcionario()' class="md-icon-button">
                            <md-icon>edit</md-icon>
                        </md-button>
                    </md-table-cell>
                </md-table-row>
            </md-table>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'TableFixed',
    data: () => ({
      users: [
        {
          id: 1,
          name: "Shawna Dubbin",
          email: "sdubbin0@geocities.com",
          user: 'Lorem Ipsum'
        },
        {
          id: 2,
          name: "Odette Demageard",
          email: "odemageard1@spotify.com",
          user: 'Lorem Ipsum'
        },
        {
          id: 3,
          name: "Vera Taleworth",
          email: "vtaleworth2@google.ca",
          user: 'Lorem Ipsum'
        },
        {
          id: 4,
          name: "Lonnie Izkovitz",
          email: "lizkovitz3@youtu.be",
          user: 'Lorem Ipsum'
        },
        {
          id: 5,
          name: "Thatcher Stave",
          email: "tstave4@reference.com",
          user: 'Lorem Ipsum'
        },
        {
          id: 6,
          name: "Karim Chipping",
          email: "kchipping5@scribd.com",
          user: 'Lorem Ipsum'
        },
        {
          id: 7,
          name: "Helge Holyard",
          email: "hholyard6@howstuffworks.com",
          user: 'Lorem Ipsum'
        },
        {
          id: 8,
          name: "Rod Titterton",
          email: "rtitterton7@nydailynews.com",
          user: 'Lorem Ipsum'
        },
        {
          id: 9,
          name: "Gawen Applewhite",
          email: "gapplewhite8@reverbnation.com",
          user: 'Lorem Ipsum'
        },
        {
          id: 10,
          name: "Nero Mulgrew",
          email: "nmulgrew9@plala.or.jp",
          user: 'Lorem Ipsum'
        },
        {
          id: 11,
          name: "Cybill Rimington",
          email: "crimingtona@usnews.com",
          user: 'Lorem Ipsum'
        },
        {
          id: 12,
          name: "Maureene Eggleson",
          email: "megglesonb@elpais.com",
          user: 'Lorem Ipsum'
        },
        {
          id: 13,
          name: "Cortney Caulket",
          email: "ccaulketc@cbsnews.com",
          user: 'Lorem Ipsum'
        },
        {
          id: 14,
          name: "Selig Swynfen",
          email: "sswynfend@cpanel.net",
          user: 'Lorem Ipsum'
        },
        {
          id: 15,
          name: "Ingar Raggles",
          email: "iragglese@cbc.ca",
          user: 'Lorem Ipsum'
        },
        {
          id: 16,
          name: "Karmen Mines",
          email: "kminesf@topsy.com",
          user: 'Lorem Ipsum'
        },
        {
          id: 17,
          name: "Salome Judron",
          email: "sjudrong@jigsy.com",
          user: 'Lorem Ipsum'
        },
        {
          id: 18,
          name: "Clarinda Marieton",
          email: "cmarietonh@theatlantic.com",
          user: 'Lorem Ipsum'
        },
        {
          id: 19,
          name: "Paxon Lotterington",
          email: "plotteringtoni@netvibes.com",
          user: 'Lorem Ipsum'
        },
        {
          id: 20,
          name: "Maura Thoms",
          email: "mthomsj@webeden.co.uk",
          user: 'Lorem Ipsum'
        }
      ]
    }),
    methods: {
        funcionario() {
            this.$router.push({ name: "funcionario" });
        }
    }
  }
</script>

<style lang="css" scoped>
    #funcionarios {
        margin: 0 0 40px;
    }

    .md-display-1 {
        display:block;
        margin-bottom: 20px;
    }

    .md-table {
        width: 100%;
    }
</style>