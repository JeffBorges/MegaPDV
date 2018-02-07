<template>
    <div id='funcionarioDetalhes'>
        <div class='md-layout titulo'>
            <div class='md-layout-item'>
                <router-link to="/home">
                    <md-button class="md-icon-button">
                        <md-icon>arrow_back</md-icon>
                    </md-button>
                </router-link>
                <span class="md-display-1">Funcionario</span>
            </div>
        </div>
        <form novalidate class="md-layout" @submit.prevent="validateUser">
            <md-card class="md-layout-item md-size-100">

                <md-card-content>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                    <md-field :class="getValidationClass('firstName')">
                        <label for="first-name">Nome</label>
                        <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" :disabled="sending" />
                        <span class="md-error" v-if="!$v.form.firstName.required">O nome é obrigatório</span>
                        <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>
                    </md-field>
                    </div>

                    <div class="md-layout-item md-small-size-100">
                    <md-field :class="getValidationClass('email')">
                        <label for="email">Email</label>
                        <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
                        <span class="md-error" v-if="!$v.form.email.required">O email é obrigatório</span>
                        <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
                    </md-field>
                    </div>
                </div>

                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                    <md-field :class="getValidationClass('gender')">
                        <label for="gender">Perfil</label>
                        <md-select name="gender" id="gender" v-model="form.gender" md-dense :disabled="sending">
                        <md-option value="coordenador">Coordenador</md-option>
                        <md-option value="colaborador">Colaborador</md-option>
                        <md-option value="gerente">Gerente</md-option>
                        <md-option value="vedendor">Vendedor</md-option>
                        </md-select>
                        <span class="md-error">O perfil é obrigatório</span>
                    </md-field>
                    </div>

                    <div class="md-layout-item md-small-size-100">
                    <md-field :class="getValidationClass('firstName')">
                        <label for="first-name">Usuário</label>
                        <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" :disabled="sending" />
                        <span class="md-error" v-if="!$v.form.firstName.required">O usuário é obrigatório</span>
                        <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>
                    </md-field>
                    </div>
                </div>

                
                </md-card-content>

                <md-progress-bar md-mode="indeterminate" v-if="sending" />

                <md-card-actions>
                <md-button type="submit" class="md-primary" :disabled="sending">Salvar</md-button>
                </md-card-actions>
            </md-card>

            <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
        </form>
    </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'

  export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    data: () => ({
      form: {
        firstName: null,
        lastName: null,
        gender: null,
        age: null,
        email: null,
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }),
    validations: {
      form: {
        firstName: {
          required,
          minLength: minLength(3)
        },
        lastName: {
          required,
          minLength: minLength(3)
        },
        age: {
          required,
          maxLength: maxLength(3)
        },
        gender: {
          required
        },
        email: {
          required,
          email
        }
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.firstName = null
        this.form.lastName = null
        this.form.age = null
        this.form.gender = null
        this.form.email = null
      },
      saveUser () {
        this.sending = true

        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.lastUser = `${this.form.firstName} ${this.form.lastName}`
          this.userSaved = true
          this.sending = false
          this.clearForm()
        }, 1500)
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      }
    }
  }
</script>

<style lang="css" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

  .titulo {
        display:block;
        margin-bottom: 20px;
  }
</style>