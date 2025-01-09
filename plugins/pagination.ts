export default defineNuxtPlugin(() => {
    const usePagination = (currentPage: Ref<number>, totalPages: Ref<number>) => {
        const nextPage = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value++;
            }
        };

        const prevPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
            }
        };

        return {
            nextPage,
            prevPage
        };
    };

    return {
        provide: {
            usePagination
        }
    };
});
