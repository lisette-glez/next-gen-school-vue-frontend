export default defineNuxtPlugin(async () => {
  const useFetchCookies = async () => {
    await $fetch("/sanctum/csrf-cookie", {
      baseURL: 'http://localhost',
      credentials: 'include' // Allow browser to handle cookies
    });
  };
  const csrf_cookie: string = "XSRF-TOKEN";
  let token = useCookie(csrf_cookie)?.value;
  
	if (!token) {	
		await useFetchCookies();   	
		token = useCookie(csrf_cookie).value;
	}
  
  const customFetch = $fetch.create({
      baseURL: 'http://localhost/api', // useRuntimeConfig().public.apiBaseUrl
      credentials: 'include',
      onRequest({ options }) {
        const defaultHeaders: HeadersInit = {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type" : "application/json", 
          "Accept": "application/json",
          'X-XSRF-TOKEN': token as string,
          ...options?.headers
        };
        options.headers = defaultHeaders;
       },
    })
    return {
      provide: {
        customFetch
      }
    }
})
  
