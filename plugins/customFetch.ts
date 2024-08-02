export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const csrf_cookie = "XSRF-TOKEN";

  const useFetchCookies = async () => {
    if(!useCookie(csrf_cookie).value){
      await $fetch("/sanctum/csrf-cookie", {
      baseURL: config.public.appURL,
      credentials: 'include'
    });
    }   
  };
  
  let token = useCookie(csrf_cookie)?.value;
  if (!token) {	
    await useFetchCookies(); 
  }

  const customFetch = $fetch.create({
      baseURL: `${config.public.appURL}/api`,
      credentials: 'include',
      onRequest({ options }) {      
      token = useCookie(csrf_cookie).value;
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
  
