<script setup lang="ts">
const { $customFetch } = useNuxtApp()
import type { RegisterPayload } from '~/types';

const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: ""
})

async function register(payload: RegisterPayload) {
    try{
      await $customFetch('/register', {
        method: 'POST',
        body: payload,
      }) 
      return await navigateTo('/')
    }catch (e){
      console.log(e);
    }
  }
</script>  
  
  <template>
      <div class="flex items-center min-h-screen p-6 bg-gray-900">
        <div
          class="flex-1 h-full max-w-md mx-auto overflow-hidden rounded-lg shadow-xl bg-blue-gray-accent-100"
        >         
            <div class="flex items-center justify-center p-6 sm:p-12">
              <div class="w-full">
                <h1
                  class="mb-4 text-xl font-semibold text-gray-200"
                >
                  Create account
                </h1>
                <form @submit.prevent="register(form)">
                  <div class="mb-1 sm:mb-2">
                    <span class="text-gray-700 dark:text-gray-400">Full name</span>
                    <input
                      placeholder="John"                   
                      type="text"
                      class="mt-1 flex-grow w-full h-9 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      id="firstName"
                      name="firstName"
                      v-model="form.name"
                    />
                  </div>
                  <div class="mb-1 sm:mb-2">
                    <span class="text-gray-700 dark:text-gray-400">E-mail</span>
                    <input
                      placeholder="johndoe@email.com"                    
                      type="text"
                      class="mt-1 flex-grow w-full h-9 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      id="email"
                      name="email"
                       v-model="form.email"
                    />
                  </div> 
                  <div class="mb-1 sm:mb-2">
                    <span class="text-gray-700 dark:text-gray-400">Password</span>
                    <input
                      placeholder="***************"
                      type="password"                                      
                      class="mt-1 flex-grow w-full h-9 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      id="password"
                      name="password"
                      v-model="form.password"
                    />
                  </div>    
                  <div class="mb-1 sm:mb-2">
                    <span class="text-gray-700 dark:text-gray-400">Password confirmation</span>
                    <input
                      placeholder="***************"
                      type="password"                                      
                      class="mt-1 flex-grow w-full h-9 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      id="password_confirmation"
                      name="password_confirmation"
                      v-model="form.password_confirmation"
                    />
                  </div>             
                <div class="flex mt-6 text-sm">
                  <label class="flex items-center text-gray-400">
                    <input
                      type="checkbox"
                      class="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray"
                    />
                    <span class="ml-2">
                      I agree to the
                      <span class="underline">privacy policy</span>
                    </span>
                  </label>
                </div>
                <div class="mt-4 mb-2 sm:mb-4">
                    <button
                      type="submit"
                      class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                    >
                        Create account
                    </button>
                  </div>  
                </form>
                <hr class="my-8" />
                <button
                  class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition-colors duration-150 border hover:text-white border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-deep-purple-accent-400 focus:border-deep-purple-accent-400 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
                >
                   <svg  class="w-4 h-4 mr-2"
                      aria-hidden="true"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
                   <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"></path>
                  </svg>                 
                  Google
                </button>
                <p class="mt-4">
                  <a
                    class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                    href=""
                  >
                    Already have an account? Login
                  </a>
                </p>
              </div>
            </div>       
        </div>
      </div>
  </template>