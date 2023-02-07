import { ref } from 'vue';
import { getBlogBackInfoUsingGet } from '/@/api/apis';

const BlogBackInfoList = ref();
const loading = ref<boolean>(false);
const getBlogBackInfoList = async () => {
  loading.value = true;
  BlogBackInfoList.value = await getBlogBackInfoUsingGet(undefined);
  loading.value = false;
};

export const useGetBlogBackInfoList = () => {
  getBlogBackInfoList();
  return { BlogBackInfoList, loading };
};
