<script setup lang="ts">
definePageMeta({
    middleware: ["guest"]
})
const form = ref({
  email: "",
  password: "",
})
const { login } = useAuth();
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
                  Login
                </h1>
                <form @submit.prevent="login(form)">                  
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
                      autocomplete="on"
                      v-model="form.password"
                    />
                  </div> 
                <div class="mt-4 mb-2 sm:mb-4">
                    <button
                      type="submit"
                      class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                    >
                        Login
                    </button>
                  </div>  
                </form>
                <hr class="my-8" />
                <p class="mt-4 text-sm font-medium text-purple-600 dark:text-purple-400">
                  Don't have an account? 
                  <a
                    class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                    href=""
                  >
                    Register now
                  </a>
                </p>
              </div>
            </div>       
        </div>
      </div>
  </template>