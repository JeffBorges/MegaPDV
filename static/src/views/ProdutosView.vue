<template>
    <div id='produtos'>
        <div class='md-layout'>
            <div class='md-layout-item'>
                <span class="md-display-1">Produtos</span>
            </div>
            <div class='md-alignment-top-right'>
                <md-button @click='produto()'>Novo Produto</md-button>
            </div>
        </div>
        <div class='md-layout'>
            <div class='md-layout md-alignment-center-center md-gutter'>
            <md-card md-with-hover>
                <md-card-header>
                    <div class="md-title">Produto exemplo</div>
                    <div class="md-subhead">It also have a ripple</div>
                </md-card-header>
                <md-card-content>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
                </md-card-content>
                <md-card-actions>
                    <md-button @click='produto()'>Editar</md-button>
                </md-card-actions>
            </md-card>
            </div>

            <div class='md-layout md-alignment-center-center md-gutter'>
            <md-card md-with-hover>
                <md-card-header>
                    <div class="md-title">Produto exemplo</div>
                    <div class="md-subhead">It also have a ripple</div>
                </md-card-header>
                <md-card-content>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
                </md-card-content>
                <md-card-actions>
                    <md-button @click='produto()'>Editar</md-button>
                </md-card-actions>
            </md-card>
            </div>

            <div class='md-layout md-alignment-center-center md-gutter'>
            <md-card md-with-hover>
                <md-card-header>
                    <div class="md-title">Produto exemplo</div>
                    <div class="md-subhead">It also have a ripple</div>
                </md-card-header>
                <md-card-content>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
                </md-card-content>
                <md-card-actions>
                    <md-button @click='produto()'>Editar</md-button>
                </md-card-actions>
            </md-card>
            </div>

            <div class='md-layout md-alignment-center-center md-gutter'>
            <md-card md-with-hover>
                <md-card-header>
                    <div class="md-title">Produto exemplo</div>
                    <div class="md-subhead">It also have a ripple</div>
                </md-card-header>
                <md-card-content>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
                </md-card-content>
                <md-card-actions>
                    <md-button @click='produto()'>Editar</md-button>
                </md-card-actions>
            </md-card>
            </div>

            <div class='md-layout md-alignment-center-center md-gutter'>
            <md-card md-with-hover>
                <md-card-header>
                    <div class="md-title">Produto exemplo</div>
                    <div class="md-subhead">It also have a ripple</div>
                </md-card-header>
                <md-card-content>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
                </md-card-content>
                <md-card-actions>
                    <md-button @click='produto()'>Editar</md-button>
                </md-card-actions>
            </md-card>
            </div>

            <div class='md-layout md-alignment-center-center md-gutter'>
            <md-card md-with-hover>
                <md-card-header>
                    <div class="md-title">Produto exemplo</div>
                    <div class="md-subhead">It also have a ripple</div>
                </md-card-header>
                <md-card-content>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
                </md-card-content>
                <md-card-actions>
                    <md-button @click='produto()'>Editar</md-button>
                </md-card-actions>
            </md-card>
            </div>

            <div class='md-layout md-alignment-center-center md-gutter'>
            <md-card md-with-hover>
                <md-card-header>
                    <div class="md-title">Produto exemplo</div>
                    <div class="md-subhead">It also have a ripple</div>
                </md-card-header>
                <md-card-content>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
                </md-card-content>
                <md-card-actions>
                    <md-button @click='produto()'>Editar</md-button>
                </md-card-actions>
            </md-card>
            </div>

            <div class='md-layout md-alignment-center-center md-gutter'>
            <md-card md-with-hover>
                <md-card-header>
                    <div class="md-title">Produto exemplo</div>
                    <div class="md-subhead">It also have a ripple</div>
                </md-card-header>
                <md-card-content>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
                </md-card-content>
                <md-card-actions>
                    <md-button @click='produto()'>Editar</md-button>
                </md-card-actions>
            </md-card>
            </div>

            <div class='md-layout md-alignment-center-center md-gutter'>
            <md-card md-with-hover>
                <md-card-header>
                    <div class="md-title">Produto exemplo</div>
                    <div class="md-subhead">It also have a ripple</div>
                </md-card-header>
                <md-card-content>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
                </md-card-content>
                <md-card-actions>
                    <md-button @click='produto()'>Editar</md-button>
                </md-card-actions>
            </md-card>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            produto() {
                this.$router.push({ name: "produto" });
            }
        }
    }
</script>

<style lang="css" scoped>

#produtos {
    margin: 0 0 40px;
}

.md-display-1 {
    display:block;
    margin-bottom: 20px;
}

.md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
}
</style>