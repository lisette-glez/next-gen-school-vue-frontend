<script setup lang="ts">

definePageMeta({
  middleware: ["auth"],
})
const courseName = ref('');
const courseDescription = ref('');
const numberOfModules = ref(0);
const numberOfLessons = ref(0);
const price = ref(0);
const courseContent = ref('');
const loading = ref(false);

const { createCourse } = useCourses();

const generateCourseContent = async () => {
  if (!courseName.value || !courseDescription.value || !numberOfModules.value || !numberOfLessons.value) {
    alert('Please fill in all fields');
    return;
  }
  loading.value = true;
  try {
    const courseData = {
      name: courseName.value,
      description: courseDescription.value,
      modules: numberOfModules.value,
      lessons: numberOfLessons.value,
      price: price.value,
    };

    const course = await createCourse(courseData);
    if (course) {
      courseContent.value = course.choices[0].message.content;
    } else {
      alert('Failed to create course');
    }
  } catch (error) {
    console.error('Error generating course content:', error);
  } finally {
    loading.value = false;
  }
};

</script>

<template>
  <div class="container mx-auto p-4 mt-8">
    <h1 class="text-2xl font-bold mb-4">Create New Course</h1>
    <form @submit.prevent="generateCourseContent" class="p-4">
      <div class="mb-4 pb-2">
        <label for="courseName" class="block text-sm font-medium text-gray-700">Course Name</label>
        <input v-model="courseName" type="text" id="courseName"
          class="block w-full rounded-md grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border"
          required>
      </div>
      <div class="mb-4 pb-2">
        <label for="courseDescription" class="block text-sm font-medium text-gray-700">Course Description</label>
        <textarea v-model="courseDescription" id="courseDescription"
          class="mt-1 block w-full rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border"
          required></textarea>
      </div>
      <div class="mb-4 pb-2 flex space-x-4">
        <div class="flex-1">
          <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
          <input v-model="price" type="number" id="numberOfLessons"
            class="block w-full rounded-md grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border"
            required>
        </div>
        <div class="flex-1">
          <label for="numberOfModules" class="block text-sm font-medium text-gray-700">Number of Modules</label>
          <input v-model="numberOfModules" type="number" id="numberOfModules"
            class="block w-full rounded-md grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border"
            required>
        </div>
        <div class="flex-1">
          <label for="numberOfLessons" class="block text-sm font-medium text-gray-700">Number of Lessons</label>
          <input v-model="numberOfLessons" type="number" id="numberOfLessons"
            class="block w-full rounded-md grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border"
            required>
        </div>       
      </div>
      <button :disabled="loading" type="submit"
        class="mt-3 inline-flex justify-center py-2 px-4 shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 border">
        <svg v-if="loading" viewBox="0 0 24 24" fill="none" class="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd"
              d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              fill="#000000"></path>
            <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="#000000"></path>
          </g>
        </svg>
        Generate Course Content
      </button>     
    </form>
    <div v-if="courseContent" class="mt-2 p-4">
      <h2 class="text-xl font-bold mb-2 border-b">Generated Course Content</h2>
      <p>{{ courseContent }}</p>
      <button type="button" v-if="courseContent"
        class="mt-6 inline-flex justify-center py-2 px-4 shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 border">        
        Save Course
      </button>     
    </div>    
  </div>
</template>