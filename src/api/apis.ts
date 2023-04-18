import { createRequest } from '/@/utils/http/axios';

export const authLogin = createRequest<{ requestBody?: AuthLoginRes }, AuthLoginRev>(
  'authLogin',
  ({ requestBody }) => ({
    url: '/users/login',
    method: 'POST',
    params: requestBody,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
);

/**
 * 校验文章访问密码
 */
export const accessArticleUsingPost = createRequest<
  {
    requestBody?: ArticlePasswordVo;
  },
  ResultVoObject
>('accessArticleUsingPost', ({ requestBody }) => ({
  url: `/articles/access`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 清除定时任务的日志
 */
export const cleanJobLogsUsingDelete = createRequest<undefined, ResultVoObject>(
  'cleanJobLogsUsingDelete',
  () => ({ url: `/admin/jobLogs/clean`, method: 'DELETE' }),
);

/**
 * 物理删除文章
 */
export const deleteArticlesUsingDelete = createRequest<
  {
    requestBody?: DeleteArticlesUsingDeleteArticleids;
  },
  ResultVoObject
>('deleteArticlesUsingDelete', ({ requestBody }) => ({
  url: `/admin/articles/delete`,
  method: 'DELETE',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 删除分类
 */
export const deleteCategoriesUsingDelete = createRequest<
  {
    requestBody?: number[];
  },
  ResultVoObject
>('deleteCategoriesUsingDelete', ({ requestBody }) => ({
  url: `/admin/categories`,
  method: 'DELETE',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 删除评论
 */
export const deleteCommentsUsingDelete = createRequest<
  {
    requestBody?: number[];
  },
  ResultVoObject
>('deleteCommentsUsingDelete', ({ requestBody }) => ({
  url: `/admin/comments`,
  method: 'DELETE',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 删除异常日志
 */
export const deleteExceptionLogsUsingDelete = createRequest<
  {
    requestBody?: number[];
  },
  ResultVoObject
>('deleteExceptionLogsUsingDelete', ({ requestBody }) => ({
  url: `/admin/exception/logs`,
  method: 'DELETE',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 删除友链
 */
export const deleteFriendLinkUsingDelete = createRequest<
  {
    requestBody?: number[];
  },
  ResultVoObject
>('deleteFriendLinkUsingDelete', ({ requestBody }) => ({
  url: `/admin/links`,
  method: 'DELETE',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 删除定时任务
 */
export const deleteJobByIdUsingDelete = createRequest<
  {
    requestBody?: number[];
  },
  ResultVoObject
>('deleteJobByIdUsingDelete', ({ requestBody }) => ({
  url: `/admin/jobs`,
  method: 'DELETE',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 删除定时任务的日志
 */
export const deleteJobLogsUsingDelete = createRequest<
  {
    requestBody?: number[];
  },
  ResultVoObject
>('deleteJobLogsUsingDelete', ({ requestBody }) => ({
  url: `/admin/jobLogs`,
  method: 'DELETE',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 删除菜单
 */
export const deleteMenuUsingDelete = createRequest<
  {
    menuId: number;
  },
  ResultVoObject
>('deleteMenuUsingDelete', ({ menuId }) => ({ url: `/admin/menus/${menuId}`, method: 'DELETE' }));

/**
 * 删除操作日志
 */
export const deleteOperationLogsUsingDelete = createRequest<
  {
    requestBody?: number[];
  },
  ResultVoObject
>('deleteOperationLogsUsingDelete', ({ requestBody }) => ({
  url: `/admin/operation/logs`,
  method: 'DELETE',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 根据id删除相册
 */
export const deletePhotoAlbumByIdUsingDelete = createRequest<
  {
    albumId: string;
  },
  ResultVoObject
>('deletePhotoAlbumByIdUsingDelete', ({ albumId }) => ({
  url: `/admin/photos/albums/${albumId}`,
  method: 'DELETE',
}));

/**
 * 删除照片
 */
export const deletePhotosUsingDelete = createRequest<
  {
    requestBody?: number[];
  },
  ResultVoObject
>('deletePhotosUsingDelete', ({ requestBody }) => ({
  url: `/admin/photos`,
  method: 'DELETE',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 删除资源
 */
export const deleteResourceUsingDelete = createRequest<
  {
    resourceId: number;
  },
  ResultVoObject
>('deleteResourceUsingDelete', ({ resourceId }) => ({
  url: `/admin/resources/${resourceId}`,
  method: 'DELETE',
}));

/**
 * 删除角色
 */
export const deleteRolesUsingDelete = createRequest<
  {
    requestBody?: number[];
  },
  ResultVoObject
>('deleteRolesUsingDelete', ({ requestBody }) => ({
  url: `/admin/roles`,
  method: 'DELETE',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 删除标签
 */
export const deleteTagUsingDelete = createRequest<
  {
    requestBody?: number[];
  },
  ResultVoObject
>('deleteTagUsingDelete', ({ requestBody }) => ({
  url: `/admin/tags`,
  method: 'DELETE',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 删除说说
 */
export const deleteTalksUsingDelete = createRequest<
  {
    requestBody?: number[];
  },
  ResultVoObject
>('deleteTalksUsingDelete', ({ requestBody }) => ({
  url: `/admin/talks`,
  method: 'DELETE',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 导出文章
 */
export const exportArticlesUsingPost = createRequest<
  {
    requestBody?: DeleteArticlesUsingDeleteArticleids;
  },
  ResultVoListString
>('exportArticlesUsingPost', ({ requestBody }) => ({
  url: `/admin/articles/export`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 查看关于我信息
 */
export const getAboutUsingGet = createRequest<undefined, ResultVoAboutDto>(
  'getAboutUsingGet',
  () => ({
    url: `/about`,
    method: 'GET',
  }),
);

/**
 * 获取所有标签
 */
export const getAllTagsUsingGet = createRequest<undefined, ResultVoListTagDto>(
  'getAllTagsUsingGet',
  () => ({ url: `/tags/all`, method: 'GET' }),
);

/**
 * 根据id查看后台文章
 */
export const getArticleBackByIdUsingGet = createRequest<
  {
    articleId: string;
  },
  ResultVoArticleAdminViewDto
>('getArticleBackByIdUsingGet', ({ articleId }) => ({
  url: `/admin/articles/${articleId}`,
  method: 'GET',
}));

/**
 * 根据id获取文章
 */
export const getArticleByIdUsingGet = createRequest<
  {
    articleId: number;
  },
  ResultVoArticleDto
>('getArticleByIdUsingGet', ({ articleId }) => ({ url: `/articles/${articleId}`, method: 'GET' }));

/**
 * 根据分类id获取文章
 */
export const getArticlesByCategoryIdUsingGet = createRequest<
  {
    categoryId: number;
  },
  ResultVoPageResultDtoArticleCardDto
>('getArticlesByCategoryIdUsingGet', ({ categoryId }) => ({
  url: `/articles/categoryId`,
  method: 'GET',
  params: {
    categoryId,
  },
}));

/**
 * 根据id查看后台说说
 */
export const getBackTalkByIdUsingGet = createRequest<
  {
    talkId: string;
  },
  ResultVoTalkAdminDto
>('getBackTalkByIdUsingGet', ({ talkId }) => ({ url: `/admin/talks/${talkId}`, method: 'GET' }));

/**
 * 获取系统后台信息
 */
export const getBlogBackInfoUsingGet = createRequest<undefined, ResultVoAuroraAdminInfoDto>(
  'getBlogBackInfoUsingGet',
  () => ({ url: `/admin`, method: 'GET' }),
);

/**
 * 获取系统信息
 */
export const getBlogHomeInfoUsingGet = createRequest<undefined, ResultVoAuroraHomeInfoDto>(
  'getBlogHomeInfoUsingGet',
  () => ({ url: `/`, method: 'GET' }),
);

/**
 * 获取评论
 */
export const getCommentsUsingGet = createRequest<
  {
    commentContent: string;
    parentId?: number;
    replyUserId?: number;
    topicId?: number;
    type?: number;
  },
  ResultVoPageResultDtoCommentDto
>('getCommentsUsingGet', ({ commentContent, parentId, replyUserId, topicId, type }) => ({
  url: `/comments`,
  method: 'GET',
  params: {
    commentContent,
    parentId,
    replyUserId,
    topicId,
    type,
  },
}));

/**
 * 根据id获取任务
 */
export const getJobByIdUsingGet = createRequest<
  {
    id: number;
  },
  ResultVoJobDto
>('getJobByIdUsingGet', ({ id }) => ({ url: `/admin/jobs/${id}`, method: 'GET' }));

/**
 * 根据id获取后台相册信息
 */
export const getPhotoAlbumBackByIdUsingGet = createRequest<
  {
    albumId: string;
  },
  ResultVoPhotoAlbumAdminDto
>('getPhotoAlbumBackByIdUsingGet', ({ albumId }) => ({
  url: `/admin/photos/albums/${albumId}/info`,
  method: 'GET',
}));

/**
 * 根据id查看说说
 */
export const getTalkByIdUsingGet = createRequest<
  {
    talkId: string;
  },
  ResultVoTalkDto
>('getTalkByIdUsingGet', ({ talkId }) => ({ url: `/talks/${talkId}`, method: 'GET' }));

/**
 * 获取前十个标签
 */
export const getTopTenTagsUsingGet = createRequest<undefined, ResultVoListTagDto>(
  'getTopTenTagsUsingGet',
  () => ({ url: `/tags/topTen`, method: 'GET' }),
);

/**
 * 根据id获取用户信息
 */
export const getUserInfoByIdUsingGet = createRequest<
  {
    userInfoId: number;
  },
  ResultVoUserInfoDto
>('getUserInfoByIdUsingGet', ({ userInfoId }) => ({
  url: `/users/info/${userInfoId}`,
  method: 'GET',
}));

/**
 * 获取网站配置
 */
export const getWebsiteConfigUsingGet = createRequest<undefined, ResultVoWebsiteConfigDto>(
  'getWebsiteConfigUsingGet',
  () => ({ url: `/admin/website/config`, method: 'GET' }),
);

/**
 * /处理BizException
 */
export const handleBizExceptionUsingDelete = createRequest<undefined, {}>(
  'handleBizExceptionUsingDelete',
  () => ({
    url: `/bizException`,
    method: 'DELETE',
  }),
);

/**
 * /处理BizException
 */
export const handleBizExceptionUsingGet = createRequest<undefined, {}>(
  'handleBizExceptionUsingGet',
  () => ({
    url: `/bizException`,
    method: 'GET',
  }),
);

/**
 * /处理BizException
 */
export const handleBizExceptionUsingHead = createRequest<undefined, {}>(
  'handleBizExceptionUsingHead',
  () => ({
    url: `/bizException`,
    method: 'HEAD',
  }),
);

/**
 * /处理BizException
 */
export const handleBizExceptionUsingPatch = createRequest<undefined, {}>(
  'handleBizExceptionUsingPatch',
  () => ({
    url: `/bizException`,
    method: 'PATCH',
  }),
);

/**
 * /处理BizException
 */
export const handleBizExceptionUsingPost = createRequest<undefined, {}>(
  'handleBizExceptionUsingPost',
  () => ({
    url: `/bizException`,
    method: 'POST',
  }),
);

/**
 * /处理BizException
 */
export const handleBizExceptionUsingPut = createRequest<undefined, {}>(
  'handleBizExceptionUsingPut',
  () => ({
    url: `/bizException`,
    method: 'PUT',
  }),
);

/**
 * 导入文章
 */
export const importArticlesUsingPost = createRequest<
  {
    requestBody?: {
      file?: Blob;
    };
    type?: string;
  },
  ResultVoObject
>('importArticlesUsingPost', ({ type, requestBody }) => ({
  url: `/admin/articles/import`,
  method: 'POST',
  data: requestBody,
  params: {
    type,
  },
  headers: { 'Content-Type': 'multipart/form-data' },
}));

/**
 * 获取所有文章归档
 */
export const listArchivesUsingGet = createRequest<undefined, ResultVoPageResultDtoArchiveDto>(
  'listArchivesUsingGet',
  () => ({ url: `/archives/all`, method: 'GET' }),
);

/**
 * 获取后台文章
 */
export const listArticlesAdminUsingGet = createRequest<
  {
    albumId?: number;
    categoryId?: number;
    current?: number;
    endTime?: string;
    isDelete?: number;
    isFeatured?: number;
    isReview?: number;
    isTop?: number;
    keywords?: string;
    loginType?: number;
    size?: number;
    startTime?: string;
    status?: number;
    tagId?: number;
    type?: number;
  },
  ResultVoPageResultDtoArticleAdminDto
>(
  'listArticlesAdminUsingGet',
  ({
    albumId,
    categoryId,
    current,
    endTime,
    isDelete,
    isFeatured,
    isReview,
    isTop,
    keywords,
    loginType,
    size,
    startTime,
    status,
    tagId,
    type,
  }) => ({
    url: `/admin/articles`,
    method: 'GET',
    params: {
      albumId,
      categoryId,
      current,
      endTime,
      isDelete,
      isFeatured,
      isReview,
      isTop,
      keywords,
      loginType,
      size,
      startTime,
      status,
      tagId,
      type,
    },
  }),
);

/**
 * 搜索文章
 */
export const listArticlesBySearchUsingGet = createRequest<
  {
    albumId?: number;
    categoryId?: number;
    current?: number;
    endTime?: string;
    isDelete?: number;
    isFeatured?: number;
    isReview?: number;
    isTop?: number;
    keywords?: string;
    loginType?: number;
    size?: number;
    startTime?: string;
    status?: number;
    tagId?: number;
    type?: number;
  },
  ResultVoListArticleSearchDto
>(
  'listArticlesBySearchUsingGet',
  ({
    albumId,
    categoryId,
    current,
    endTime,
    isDelete,
    isFeatured,
    isReview,
    isTop,
    keywords,
    loginType,
    size,
    startTime,
    status,
    tagId,
    type,
  }) => ({
    url: `/articles/search`,
    method: 'GET',
    params: {
      albumId,
      categoryId,
      current,
      endTime,
      isDelete,
      isFeatured,
      isReview,
      isTop,
      keywords,
      loginType,
      size,
      startTime,
      status,
      tagId,
      type,
    },
  }),
);

/**
 * 根据标签id获取文章
 */
export const listArticlesByTagIdUsingGet = createRequest<
  {
    tagId: number;
  },
  ResultVoPageResultDtoArticleCardDto
>('listArticlesByTagIdUsingGet', ({ tagId }) => ({
  url: `/articles/tagId`,
  method: 'GET',
  params: {
    tagId,
  },
}));

/**
 * 获取所有文章
 */
export const listArticlesUsingGet = createRequest<undefined, ResultVoPageResultDtoArticleCardDto>(
  'listArticlesUsingGet',
  () => ({ url: `/articles/all`, method: 'GET' }),
);

/**
 * 查看后台说说
 */
export const listBackTalksUsingGet = createRequest<
  {
    albumId?: number;
    categoryId?: number;
    current?: number;
    endTime?: string;
    isDelete?: number;
    isFeatured?: number;
    isReview?: number;
    isTop?: number;
    keywords?: string;
    loginType?: number;
    size?: number;
    startTime?: string;
    status?: number;
    tagId?: number;
    type?: number;
  },
  ResultVoPageResultDtoTalkAdminDto
>(
  'listBackTalksUsingGet',
  ({
    albumId,
    categoryId,
    current,
    endTime,
    isDelete,
    isFeatured,
    isReview,
    isTop,
    keywords,
    loginType,
    size,
    startTime,
    status,
    tagId,
    type,
  }) => ({
    url: `/admin/talks`,
    method: 'GET',
    params: {
      albumId,
      categoryId,
      current,
      endTime,
      isDelete,
      isFeatured,
      isReview,
      isTop,
      keywords,
      loginType,
      size,
      startTime,
      status,
      tagId,
      type,
    },
  }),
);

/**
 * 搜索文章分类
 */
export const listCategoriesAdminBySearchUsingGet = createRequest<
  {
    albumId?: number;
    categoryId?: number;
    current?: number;
    endTime?: string;
    isDelete?: number;
    isFeatured?: number;
    isReview?: number;
    isTop?: number;
    keywords?: string;
    loginType?: number;
    size?: number;
    startTime?: string;
    status?: number;
    tagId?: number;
    type?: number;
  },
  ResultVoListCategoryOptionDto
>(
  'listCategoriesAdminBySearchUsingGet',
  ({
    albumId,
    categoryId,
    current,
    endTime,
    isDelete,
    isFeatured,
    isReview,
    isTop,
    keywords,
    loginType,
    size,
    startTime,
    status,
    tagId,
    type,
  }) => ({
    url: `/admin/categories/search`,
    method: 'GET',
    params: {
      albumId,
      categoryId,
      current,
      endTime,
      isDelete,
      isFeatured,
      isReview,
      isTop,
      keywords,
      loginType,
      size,
      startTime,
      status,
      tagId,
      type,
    },
  }),
);

/**
 * 查看后台分类列表
 */
export const listCategoriesAdminUsingGet = createRequest<
  {
    albumId?: number;
    categoryId?: number;
    current?: number;
    endTime?: string;
    isDelete?: number;
    isFeatured?: number;
    isReview?: number;
    isTop?: number;
    keywords?: string;
    loginType?: number;
    size?: number;
    startTime?: string;
    status?: number;
    tagId?: number;
    type?: number;
  },
  ResultVoPageResultDtoCategoryAdminDto
>(
  'listCategoriesAdminUsingGet',
  ({
    albumId,
    categoryId,
    current,
    endTime,
    isDelete,
    isFeatured,
    isReview,
    isTop,
    keywords,
    loginType,
    size,
    startTime,
    status,
    tagId,
    type,
  }) => ({
    url: `/admin/categories`,
    method: 'GET',
    params: {
      albumId,
      categoryId,
      current,
      endTime,
      isDelete,
      isFeatured,
      isReview,
      isTop,
      keywords,
      loginType,
      size,
      startTime,
      status,
      tagId,
      type,
    },
  }),
);

/**
 * 获取所有分类
 */
export const listCategoriesUsingGet = createRequest<undefined, ResultVoListCategoryDto>(
  'listCategoriesUsingGet',
  () => ({ url: `/categories/all`, method: 'GET' }),
);

/**
 * 查询后台评论
 */
export const listCommentBackDtoUsingGet = createRequest<
  {
    albumId?: number;
    categoryId?: number;
    current?: number;
    endTime?: string;
    isDelete?: number;
    isFeatured?: number;
    isReview?: number;
    isTop?: number;
    keywords?: string;
    loginType?: number;
    size?: number;
    startTime?: string;
    status?: number;
    tagId?: number;
    type?: number;
  },
  ResultVoPageResultDtoCommentAdminDto
>(
  'listCommentBackDtoUsingGet',
  ({
    albumId,
    categoryId,
    current,
    endTime,
    isDelete,
    isFeatured,
    isReview,
    isTop,
    keywords,
    loginType,
    size,
    startTime,
    status,
    tagId,
    type,
  }) => ({
    url: `/admin/comments`,
    method: 'GET',
    params: {
      albumId,
      categoryId,
      current,
      endTime,
      isDelete,
      isFeatured,
      isReview,
      isTop,
      keywords,
      loginType,
      size,
      startTime,
      status,
      tagId,
      type,
    },
  }),
);

/**
 * 获取异常日志
 */
export const listExceptionLogsUsingGet = createRequest<
  {
    albumId?: number;
    categoryId?: number;
    current?: number;
    endTime?: string;
    isDelete?: number;
    isFeatured?: number;
    isReview?: number;
    isTop?: number;
    keywords?: string;
    loginType?: number;
    size?: number;
    startTime?: string;
    status?: number;
    tagId?: number;
    type?: number;
  },
  ResultVoPageResultDtoExceptionLogDto
>(
  'listExceptionLogsUsingGet',
  ({
    albumId,
    categoryId,
    current,
    endTime,
    isDelete,
    isFeatured,
    isReview,
    isTop,
    keywords,
    loginType,
    size,
    startTime,
    status,
    tagId,
    type,
  }) => ({
    url: `/admin/exception/logs`,
    method: 'GET',
    params: {
      albumId,
      categoryId,
      current,
      endTime,
      isDelete,
      isFeatured,
      isReview,
      isTop,
      keywords,
      loginType,
      size,
      startTime,
      status,
      tagId,
      type,
    },
  }),
);

/**
 * 查看后台友链列表
 */
export const listFriendLinkDtoUsingGet = createRequest<
  {
    albumId?: number;
    categoryId?: number;
    current?: number;
    endTime?: string;
    isDelete?: number;
    isFeatured?: number;
    isReview?: number;
    isTop?: number;
    keywords?: string;
    loginType?: number;
    size?: number;
    startTime?: string;
    status?: number;
    tagId?: number;
    type?: number;
  },
  ResultVoPageResultDtoFriendLinkAdminDto
>(
  'listFriendLinkDtoUsingGet',
  ({
    albumId,
    categoryId,
    current,
    endTime,
    isDelete,
    isFeatured,
    isReview,
    isTop,
    keywords,
    loginType,
    size,
    startTime,
    status,
    tagId,
    type,
  }) => ({
    url: `/admin/links`,
    method: 'GET',
    params: {
      albumId,
      categoryId,
      current,
      endTime,
      isDelete,
      isFeatured,
      isReview,
      isTop,
      keywords,
      loginType,
      size,
      startTime,
      status,
      tagId,
      type,
    },
  }),
);

/**
 * 查看友链列表
 */
export const listFriendLinksUsingGet = createRequest<undefined, ResultVoListFriendLinkDto>(
  'listFriendLinksUsingGet',
  () => ({ url: `/links`, method: 'GET' }),
);

/**
 * 获取所有job分组
 */
export const listJobGroupUsingGet = createRequest<undefined, ResultVoListString>(
  'listJobGroupUsingGet',
  () => ({ url: `/admin/jobs/jobGroups`, method: 'GET' }),
);

/**
 * 获取定时任务日志的所有组名
 */
export const listJobLogGroupsUsingGet = createRequest<undefined, ResultVoObject>(
  'listJobLogGroupsUsingGet',
  () => ({ url: `/admin/jobLogs/jobGroups`, method: 'GET' }),
);

/**
 * 获取定时任务的日志列表
 */
export const listJobLogsUsingGet = createRequest<
  {
    任务Id?: number;
    任务名称?: string;
    任务状态?: number;
    任务的组别?: string;
    开始时间?: string;
    结束时间?: string;
  },
  ResultVoPageResultDtoJobLogDto
>('listJobLogsUsingGet', ({ 任务Id, 任务名称, 任务状态, 任务的组别, 开始时间, 结束时间 }) => ({
  url: `/admin/jobLogs`,
  method: 'GET',
  params: {
    任务Id,
    任务名称,
    任务状态,
    任务的组别,
    开始时间,
    结束时间,
  },
}));

/**
 * 获取任务列表
 */
export const listJobsUsingGet = createRequest<
  {
    jobName?: string;
    status?: number;
    jobGroup?: string;
    size?: number;
    current?: number;
  },
  ResultVoPageResultDtoJobDto
>('listJobsUsingGet', ({ jobName, status, jobGroup, size, current }) => ({
  url: `/admin/jobs`,
  method: 'GET',
  params: {
    jobName,
    status,
    jobGroup,
    size,
    current,
  },
}));

/**
 * 查看角色菜单选项
 */
export const listMenuOptionsUsingGet = createRequest<undefined, ResultVoListLabelOptionDto>(
  'listMenuOptionsUsingGet',
  () => ({ url: `/admin/role/menus`, method: 'GET' }),
);

/**
 * 查看菜单列表
 */
export const listMenusUsingGet = createRequest<
  {
    albumId?: number;
    categoryId?: number;
    current?: number;
    endTime?: string;
    isDelete?: number;
    isFeatured?: number;
    isReview?: number;
    isTop?: number;
    keywords?: string;
    loginType?: number;
    size?: number;
    startTime?: string;
    status?: number;
    tagId?: number;
    type?: number;
  },
  ResultVoListMenuDto
>(
  'listMenusUsingGet',
  ({
    albumId,
    categoryId,
    current,
    endTime,
    isDelete,
    isFeatured,
    isReview,
    isTop,
    keywords,
    loginType,
    size,
    startTime,
    status,
    tagId,
    type,
  }) => ({
    url: `/admin/menus`,
    method: 'GET',
    params: {
      albumId,
      categoryId,
      current,
      endTime,
      isDelete,
      isFeatured,
      isReview,
      isTop,
      keywords,
      loginType,
      size,
      startTime,
      status,
      tagId,
      type,
    },
  }),
);

/**
 * 查看在线用户
 */
export const listOnlineUsersUsingGet = createRequest<
  {
    albumId?: number;
    categoryId?: number;
    current?: number;
    endTime?: string;
    isDelete?: number;
    isFeatured?: number;
    isReview?: number;
    isTop?: number;
    keywords?: string;
    loginType?: number;
    size?: number;
    startTime?: string;
    status?: number;
    tagId?: number;
    type?: number;
  },
  ResultVoPageResultDtoUserOnlineDto
>(
  'listOnlineUsersUsingGet',
  ({
    albumId,
    categoryId,
    current,
    endTime,
    isDelete,
    isFeatured,
    isReview,
    isTop,
    keywords,
    loginType,
    size,
    startTime,
    status,
    tagId,
    type,
  }) => ({
    url: `/admin/users/online`,
    method: 'GET',
    params: {
      albumId,
      categoryId,
      current,
      endTime,
      isDelete,
      isFeatured,
      isReview,
      isTop,
      keywords,
      loginType,
      size,
      startTime,
      status,
      tagId,
      type,
    },
  }),
);

/**
 * 查看操作日志
 */
export const listOperationLogsUsingGet = createRequest<
  {
    albumId?: number;
    categoryId?: number;
    current?: number;
    endTime?: string;
    isDelete?: number;
    isFeatured?: number;
    isReview?: number;
    isTop?: number;
    keywords?: string;
    loginType?: number;
    size?: number;
    startTime?: string;
    status?: number;
    tagId?: number;
    type?: number;
  },
  ResultVoPageResultDtoOperationLogDto
>(
  'listOperationLogsUsingGet',
  ({
    albumId,
    categoryId,
    current,
    endTime,
    isDelete,
    isFeatured,
    isReview,
    isTop,
    keywords,
    loginType,
    size,
    startTime,
    status,
    tagId,
    type,
  }) => ({
    url: `/admin/operation/logs`,
    method: 'GET',
    params: {
      albumId,
      categoryId,
      current,
      endTime,
      isDelete,
      isFeatured,
      isReview,
      isTop,
      keywords,
      loginType,
      size,
      startTime,
      status,
      tagId,
      type,
    },
  }),
);

/**
 * 获取后台相册列表信息
 */
export const listPhotoAlbumBackInfosUsingGet = createRequest<undefined, ResultVoListPhotoAlbumDto>(
  'listPhotoAlbumBackInfosUsingGet',
  () => ({ url: `/admin/photos/albums/info`, method: 'GET' }),
);

/**
 * 查看后台相册列表
 */
export const listPhotoAlbumBacksUsingGet = createRequest<
  {
    albumId?: number;
    categoryId?: number;
    current?: number;
    endTime?: string;
    isDelete?: number;
    isFeatured?: number;
    isReview?: number;
    isTop?: number;
    keywords?: string;
    loginType?: number;
    size?: number;
    startTime?: string;
    status?: number;
    tagId?: number;
    type?: number;
  },
  ResultVoPageResultDtoPhotoAlbumAdminDto
>(
  'listPhotoAlbumBacksUsingGet',
  ({
    albumId,
    categoryId,
    current,
    endTime,
    isDelete,
    isFeatured,
    isReview,
    isTop,
    keywords,
    loginType,
    size,
    startTime,
    status,
    tagId,
    type,
  }) => ({
    url: `/admin/photos/albums`,
    method: 'GET',
    params: {
      albumId,
      categoryId,
      current,
      endTime,
      isDelete,
      isFeatured,
      isReview,
      isTop,
      keywords,
      loginType,
      size,
      startTime,
      status,
      tagId,
      type,
    },
  }),
);

/**
 * 获取相册列表
 */
export const listPhotoAlbumsUsingGet = createRequest<undefined, ResultVoListPhotoAlbumDto>(
  'listPhotoAlbumsUsingGet',
  () => ({ url: `/photos/albums`, method: 'GET' }),
);

/**
 * 根据相册id查看照片列表
 */
export const listPhotosByAlbumIdUsingGet = createRequest<
  {
    albumId: number;
  },
  ResultVoPhotoDto
>('listPhotosByAlbumIdUsingGet', ({ albumId }) => ({
  url: `/albums/${albumId}/photos`,
  method: 'GET',
}));

/**
 * 根据相册id获取照片列表
 */
export const listPhotosUsingGet = createRequest<
  {
    albumId?: number;
    categoryId?: number;
    current?: number;
    endTime?: string;
    isDelete?: number;
    isFeatured?: number;
    isReview?: number;
    isTop?: number;
    keywords?: string;
    loginType?: number;
    size?: number;
    startTime?: string;
    status?: number;
    tagId?: number;
    type?: number;
  },
  ResultVoPageResultDtoPhotoAdminDto
>(
  'listPhotosUsingGet',
  ({
    albumId,
    categoryId,
    current,
    endTime,
    isDelete,
    isFeatured,
    isReview,
    isTop,
    keywords,
    loginType,
    size,
    startTime,
    status,
    tagId,
    type,
  }) => ({
    url: `/admin/photos`,
    method: 'GET',
    params: {
      albumId,
      categoryId,
      current,
      endTime,
      isDelete,
      isFeatured,
      isReview,
      isTop,
      keywords,
      loginType,
      size,
      startTime,
      status,
      tagId,
      type,
    },
  }),
);

/**
 * 根据commentId获取回复
 */
export const listRepliesByCommentIdUsingGet = createRequest<
  {
    commentId: number;
  },
  ResultVoListReplyDto
>('listRepliesByCommentIdUsingGet', ({ commentId }) => ({
  url: `/comments/${commentId}/replies`,
  method: 'GET',
}));

/**
 * 查看角色资源选项
 */
export const listResourceOptionUsingGet = createRequest<undefined, ResultVoListLabelOptionDto>(
  'listResourceOptionUsingGet',
  () => ({ url: `/admin/role/resources`, method: 'GET' }),
);

/**
 * 查看资源列表
 */
export const listResourcesUsingGet = createRequest<
  {
    albumId?: number;
    categoryId?: number;
    current?: number;
    endTime?: string;
    isDelete?: number;
    isFeatured?: number;
    isReview?: number;
    isTop?: number;
    keywords?: string;
    loginType?: number;
    size?: number;
    startTime?: string;
    status?: number;
    tagId?: number;
    type?: number;
  },
  ResultVoListResourceDto
>(
  'listResourcesUsingGet',
  ({
    albumId,
    categoryId,
    current,
    endTime,
    isDelete,
    isFeatured,
    isReview,
    isTop,
    keywords,
    loginType,
    size,
    startTime,
    status,
    tagId,
    type,
  }) => ({
    url: `/admin/resources`,
    method: 'GET',
    params: {
      albumId,
      categoryId,
      current,
      endTime,
      isDelete,
      isFeatured,
      isReview,
      isTop,
      keywords,
      loginType,
      size,
      startTime,
      status,
      tagId,
      type,
    },
  }),
);

/**
 * 查询角色列表
 */
export const listRolesUsingGet = createRequest<
  {
    albumId?: number;
    categoryId?: number;
    current?: number;
    endTime?: string;
    isDelete?: number;
    isFeatured?: number;
    isReview?: number;
    isTop?: number;
    keywords?: string;
    loginType?: number;
    size?: number;
    startTime?: string;
    status?: number;
    tagId?: number;
    type?: number;
  },
  ResultVoPageResultDtoRoleDto
>(
  'listRolesUsingGet',
  ({
    albumId,
    categoryId,
    current,
    endTime,
    isDelete,
    isFeatured,
    isReview,
    isTop,
    keywords,
    loginType,
    size,
    startTime,
    status,
    tagId,
    type,
  }) => ({
    url: `/admin/roles`,
    method: 'GET',
    params: {
      albumId,
      categoryId,
      current,
      endTime,
      isDelete,
      isFeatured,
      isReview,
      isTop,
      keywords,
      loginType,
      size,
      startTime,
      status,
      tagId,
      type,
    },
  }),
);

/**
 * 搜索文章标签
 */
export const listTagsAdminBySearchUsingGet = createRequest<
  {
    albumId?: number;
    categoryId?: number;
    current?: number;
    endTime?: string;
    isDelete?: number;
    isFeatured?: number;
    isReview?: number;
    isTop?: number;
    keywords?: string;
    loginType?: number;
    size?: number;
    startTime?: string;
    status?: number;
    tagId?: number;
    type?: number;
  },
  ResultVoListTagAdminDto
>(
  'listTagsAdminBySearchUsingGet',
  ({
    albumId,
    categoryId,
    current,
    endTime,
    isDelete,
    isFeatured,
    isReview,
    isTop,
    keywords,
    loginType,
    size,
    startTime,
    status,
    tagId,
    type,
  }) => ({
    url: `/admin/tags/search`,
    method: 'GET',
    params: {
      albumId,
      categoryId,
      current,
      endTime,
      isDelete,
      isFeatured,
      isReview,
      isTop,
      keywords,
      loginType,
      size,
      startTime,
      status,
      tagId,
      type,
    },
  }),
);

/**
 * 查询后台标签列表
 */
export const listTagsAdminUsingGet = createRequest<
  {
    albumId?: number;
    categoryId?: number;
    current?: number;
    endTime?: string;
    isDelete?: number;
    isFeatured?: number;
    isReview?: number;
    isTop?: number;
    keywords?: string;
    loginType?: number;
    size?: number;
    startTime?: string;
    status?: number;
    tagId?: number;
    type?: number;
  },
  ResultVoPageResultDtoTagAdminDto
>(
  'listTagsAdminUsingGet',
  ({
    albumId,
    categoryId,
    current,
    endTime,
    isDelete,
    isFeatured,
    isReview,
    isTop,
    keywords,
    loginType,
    size,
    startTime,
    status,
    tagId,
    type,
  }) => ({
    url: `/admin/tags`,
    method: 'GET',
    params: {
      albumId,
      categoryId,
      current,
      endTime,
      isDelete,
      isFeatured,
      isReview,
      isTop,
      keywords,
      loginType,
      size,
      startTime,
      status,
      tagId,
      type,
    },
  }),
);

/**
 * 查看说说列表
 */
export const listTalksUsingGet = createRequest<undefined, ResultVoPageResultDtoTalkDto>(
  'listTalksUsingGet',
  () => ({ url: `/talks`, method: 'GET' }),
);

/**
 * 获取置顶和推荐文章
 */
export const listTopAndFeaturedArticlesUsingGet = createRequest<
  undefined,
  ResultVoTopAndFeaturedArticlesDto
>('listTopAndFeaturedArticlesUsingGet', () => ({ url: `/articles/topAndFeatured`, method: 'GET' }));

/**
 * 获取前六个评论
 */
export const listTopSixCommentsUsingGet = createRequest<undefined, ResultVoListCommentDto>(
  'listTopSixCommentsUsingGet',
  () => ({ url: `/comments/topSix`, method: 'GET' }),
);

/**
 * 获取用户区域分布
 */
export const listUserAreasUsingGet = createRequest<
  {
    albumId?: number;
    categoryId?: number;
    current?: number;
    endTime?: string;
    isDelete?: number;
    isFeatured?: number;
    isReview?: number;
    isTop?: number;
    keywords?: string;
    loginType?: number;
    size?: number;
    startTime?: string;
    status?: number;
    tagId?: number;
    type?: number;
  },
  ResultVoListUserAreaDto
>(
  'listUserAreasUsingGet',
  ({
    albumId,
    categoryId,
    current,
    endTime,
    isDelete,
    isFeatured,
    isReview,
    isTop,
    keywords,
    loginType,
    size,
    startTime,
    status,
    tagId,
    type,
  }) => ({
    url: `/admin/users/area`,
    method: 'GET',
    params: {
      albumId,
      categoryId,
      current,
      endTime,
      isDelete,
      isFeatured,
      isReview,
      isTop,
      keywords,
      loginType,
      size,
      startTime,
      status,
      tagId,
      type,
    },
  }),
);

/**
 * 查看当前用户菜单
 */
export const listUserMenusUsingGet = createRequest<undefined, ResultVoListUserMenuDto>(
  'listUserMenusUsingGet',
  () => ({ url: `/admin/user/menus`, method: 'GET' }),
);

/**
 * 查询用户角色选项
 */
export const listUserRolesUsingGet = createRequest<undefined, ResultVoListUserRoleDto>(
  'listUserRolesUsingGet',
  () => ({ url: `/admin/users/role`, method: 'GET' }),
);

/**
 * 查询后台用户列表
 */
export const listUsersUsingGet = createRequest<
  {
    albumId?: number;
    categoryId?: number;
    current?: number;
    endTime?: string;
    isDelete?: number;
    isFeatured?: number;
    isReview?: number;
    isTop?: number;
    keywords?: string;
    loginType?: number;
    size?: number;
    startTime?: string;
    status?: number;
    tagId?: number;
    type?: number;
  },
  ResultVoPageResultDtoUserAdminDto
>(
  'listUsersUsingGet',
  ({
    albumId,
    categoryId,
    current,
    endTime,
    isDelete,
    isFeatured,
    isReview,
    isTop,
    keywords,
    loginType,
    size,
    startTime,
    status,
    tagId,
    type,
  }) => ({
    url: `/admin/users`,
    method: 'GET',
    params: {
      albumId,
      categoryId,
      current,
      endTime,
      isDelete,
      isFeatured,
      isReview,
      isTop,
      keywords,
      loginType,
      size,
      startTime,
      status,
      tagId,
      type,
    },
  }),
);

/**
 * 用户登出
 */
export const logoutUsingPost = createRequest<undefined, ResultVoUserLogoutStatusDto>(
  'logoutUsingPost',
  () => ({
    url: `/users/logout`,
    method: 'POST',
  }),
);

/**
 * qq登录
 */
export const qqLoginUsingPost = createRequest<
  {
    requestBody?: QqLoginVo;
  },
  ResultVoUserInfoDto
>('qqLoginUsingPost', ({ requestBody }) => ({
  url: `/users/oauth/qq`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 用户注册
 */
export const registerUsingPost = createRequest<
  {
    requestBody?: UserVo;
  },
  ResultVoObject
>('registerUsingPost', ({ requestBody }) => ({
  url: `/users/register`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 下线用户
 */
export const removeOnlineUserUsingDelete = createRequest<
  {
    userInfoId: number;
  },
  ResultVoObject
>('removeOnlineUserUsingDelete', ({ userInfoId }) => ({
  url: `/admin/users/${userInfoId}/online`,
  method: 'DELETE',
}));

/**
 * 上报访客信息
 */
export const reportUsingPost = createRequest<undefined, ResultVoObject>('reportUsingPost', () => ({
  url: `/report`,
  method: 'POST',
}));

/**
 * 执行某个任务
 */
export const runJobUsingPut = createRequest<
  {
    requestBody?: JobRunVo;
  },
  ResultVoObject
>('runJobUsingPut', ({ requestBody }) => ({
  url: `/admin/jobs/run`,
  method: 'PUT',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 上传文章图片
 */
export const saveArticleImagesUsingPost = createRequest<
  {
    requestBody: {
      file: string;
    };
  },
  ResultVoString
>('saveArticleImagesUsingPost', ({ requestBody }) => ({
  url: `/admin/articles/images`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'multipart/form-data' },
}));

/**
 * 添加评论
 */
export const saveCommentUsingPost = createRequest<
  {
    requestBody?: CommentVo;
  },
  ResultVoObject
>('saveCommentUsingPost', ({ requestBody }) => ({
  url: `/comments/save`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 添加定时任务
 */
export const saveJobUsingPost = createRequest<
  {
    requestBody?: JobVo;
  },
  ResultVoObject
>('saveJobUsingPost', ({ requestBody }) => ({
  url: `/admin/jobs`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 保存和修改文章
 */
export const saveOrUpdateArticleUsingPost = createRequest<
  {
    requestBody?: ArticleVo;
  },
  ResultVoObject
>('saveOrUpdateArticleUsingPost', ({ requestBody }) => ({
  url: `/admin/articles`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 添加或修改分类
 */
export const saveOrUpdateCategoryUsingPost = createRequest<
  {
    requestBody?: CategoryVo;
  },
  ResultVoObject
>('saveOrUpdateCategoryUsingPost', ({ requestBody }) => ({
  url: `/admin/categories`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 保存或修改友链
 */
export const saveOrUpdateFriendLinkUsingPost = createRequest<
  {
    requestBody?: FriendLinkVo;
  },
  ResultVoObject
>('saveOrUpdateFriendLinkUsingPost', ({ requestBody }) => ({
  url: `/admin/links`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 新增或修改菜单
 */
export const saveOrUpdateMenuUsingPost = createRequest<
  {
    requestBody?: MenuVo;
  },
  ResultVoObject
>('saveOrUpdateMenuUsingPost', ({ requestBody }) => ({
  url: `/admin/menus`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 保存或更新相册
 */
export const saveOrUpdatePhotoAlbumUsingPost = createRequest<
  {
    requestBody?: PhotoAlbumVo;
  },
  ResultVoObject
>('saveOrUpdatePhotoAlbumUsingPost', ({ requestBody }) => ({
  url: `/admin/photos/albums`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 新增或修改资源
 */
export const saveOrUpdateResourceUsingPost = createRequest<
  {
    requestBody?: ResourceVo;
  },
  ResultVoObject
>('saveOrUpdateResourceUsingPost', ({ requestBody }) => ({
  url: `/admin/resources`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 保存或更新角色
 */
export const saveOrUpdateRoleUsingPost = createRequest<
  {
    requestBody?: RoleVo;
  },
  ResultVoObject
>('saveOrUpdateRoleUsingPost', ({ requestBody }) => ({
  url: `/admin/role`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 添加或修改标签
 */
export const saveOrUpdateTagUsingPost = createRequest<
  {
    requestBody?: TagVo;
  },
  ResultVoObject
>('saveOrUpdateTagUsingPost', ({ requestBody }) => ({
  url: `/admin/tags`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 保存或修改说说
 */
export const saveOrUpdateTalkUsingPost = createRequest<
  {
    requestBody?: TalkVo;
  },
  ResultVoObject
>('saveOrUpdateTalkUsingPost', ({ requestBody }) => ({
  url: `/admin/talks`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 上传博客配置图片
 */
export const savePhotoAlbumCoverUsingPost = createRequest<
  {
    requestBody: {
      file: string;
    };
  },
  ResultVoString
>('savePhotoAlbumCoverUsingPost', ({ requestBody }) => ({
  url: `/admin/config/images`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'multipart/form-data' },
}));

/**
 * 上传相册封面
 */
export const savePhotoAlbumCoverUsingPost1 = createRequest<
  {
    requestBody: {
      file: string;
    };
  },
  ResultVoString
>('savePhotoAlbumCoverUsingPost1', ({ requestBody }) => ({
  url: `/admin/photos/albums/upload`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'multipart/form-data' },
}));

/**
 * 上传照片
 */
export const savePhotoAlbumCoverUsingPost2 = createRequest<
  {
    requestBody: {
      file: string;
    };
  },
  ResultVoString
>('savePhotoAlbumCoverUsingPost2', ({ requestBody }) => ({
  url: `/admin/photos/upload`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'multipart/form-data' },
}));

/**
 * 保存照片
 */
export const savePhotosUsingPost = createRequest<
  {
    requestBody?: PhotoVo;
  },
  ResultVoObject
>('savePhotosUsingPost', ({ requestBody }) => ({
  url: `/admin/photos`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 上传说说图片
 */
export const saveTalkImagesUsingPost = createRequest<
  {
    requestBody: {
      file: string;
    };
  },
  ResultVoString
>('saveTalkImagesUsingPost', ({ requestBody }) => ({
  url: `/admin/talks/images`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'multipart/form-data' },
}));

/**
 * 绑定用户邮箱
 */
export const saveUserEmailUsingPut = createRequest<
  {
    requestBody?: EmailVo;
  },
  ResultVoObject
>('saveUserEmailUsingPut', ({ requestBody }) => ({
  url: `/users/email`,
  method: 'PUT',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 发送邮箱验证码
 */
export const sendCodeUsingGet = createRequest<
  {
    username: string;
  },
  ResultVoObject
>('sendCodeUsingGet', ({ username }) => ({
  url: `/users/code`,
  method: 'GET',
  params: {
    username,
  },
}));

/**
 * 修改关于我信息
 */
export const updateAboutUsingPut = createRequest<
  {
    requestBody?: AboutVo;
  },
  ResultVoObject
>('updateAboutUsingPut', ({ requestBody }) => ({
  url: `/admin/about`,
  method: 'PUT',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 修改管理员密码
 */
export const updateAdminPasswordUsingPut = createRequest<
  {
    requestBody?: PasswordVo;
  },
  ResultVoObject
>('updateAdminPasswordUsingPut', ({ requestBody }) => ({
  url: `/admin/users/password`,
  method: 'PUT',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 删除或者恢复文章
 */
export const updateArticleDeleteUsingPut = createRequest<
  {
    requestBody?: DeleteVo;
  },
  ResultVoObject
>('updateArticleDeleteUsingPut', ({ requestBody }) => ({
  url: `/admin/articles`,
  method: 'PUT',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 修改文章是否置顶和推荐
 */
export const updateArticleTopAndFeaturedUsingPut = createRequest<
  {
    requestBody?: ArticleTopFeaturedVo;
  },
  ResultVoObject
>('updateArticleTopAndFeaturedUsingPut', ({ requestBody }) => ({
  url: `/admin/articles/topAndFeatured`,
  method: 'PUT',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 审核评论
 */
export const updateCommentsReviewUsingPut = createRequest<
  {
    requestBody?: ReviewVo;
  },
  ResultVoObject
>('updateCommentsReviewUsingPut', ({ requestBody }) => ({
  url: `/admin/comments/review`,
  method: 'PUT',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 更改任务的状态
 */
export const updateJobStatusUsingPut = createRequest<
  {
    requestBody?: JobStatusVo;
  },
  ResultVoObject
>('updateJobStatusUsingPut', ({ requestBody }) => ({
  url: `/admin/jobs/status`,
  method: 'PUT',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 修改定时任务
 */
export const updateJobUsingPut = createRequest<
  {
    requestBody?: JobVo;
  },
  ResultVoObject
>('updateJobUsingPut', ({ requestBody }) => ({
  url: `/admin/jobs`,
  method: 'PUT',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 修改目录是否隐藏
 */
export const updateMenuIsHiddenUsingPut = createRequest<
  {
    requestBody?: IsHiddenVo;
  },
  ResultVoObject
>('updateMenuIsHiddenUsingPut', ({ requestBody }) => ({
  url: `/admin/menus/isHidden`,
  method: 'PUT',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 修改密码
 */
export const updatePasswordUsingPut = createRequest<
  {
    requestBody?: UserVo;
  },
  ResultVoObject
>('updatePasswordUsingPut', ({ requestBody }) => ({
  url: `/users/password`,
  method: 'PUT',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 更新照片删除状态
 */
export const updatePhotoDeleteUsingPut = createRequest<
  {
    requestBody?: DeleteVo;
  },
  ResultVoObject
>('updatePhotoDeleteUsingPut', ({ requestBody }) => ({
  url: `/admin/photos/delete`,
  method: 'PUT',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 更新照片信息
 */
export const updatePhotoUsingPut = createRequest<
  {
    requestBody?: PhotoInfoVo;
  },
  ResultVoObject
>('updatePhotoUsingPut', ({ requestBody }) => ({
  url: `/admin/photos`,
  method: 'PUT',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 移动照片相册
 */
export const updatePhotosAlbumUsingPut = createRequest<
  {
    requestBody?: PhotoVo;
  },
  ResultVoObject
>('updatePhotosAlbumUsingPut', ({ requestBody }) => ({
  url: `/admin/photos/album`,
  method: 'PUT',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 更新用户头像
 */
export const updateUserAvatarUsingPost = createRequest<
  {
    requestBody: {
      file: string;
    };
  },
  ResultVoString
>('updateUserAvatarUsingPost', ({ requestBody }) => ({
  url: `/users/avatar`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'multipart/form-data' },
}));

/**
 * 修改用户禁用状态
 */
export const updateUserDisableUsingPut = createRequest<
  {
    requestBody?: UserDisableVo;
  },
  ResultVoObject
>('updateUserDisableUsingPut', ({ requestBody }) => ({
  url: `/admin/users/disable`,
  method: 'PUT',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 更新用户信息
 */
export const updateUserInfoUsingPut = createRequest<
  {
    requestBody?: UserInfoVo;
  },
  ResultVoObject
>('updateUserInfoUsingPut', ({ requestBody }) => ({
  url: `/users/info`,
  method: 'PUT',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 修改用户角色
 */
export const updateUserRoleUsingPut = createRequest<
  {
    requestBody?: UserRoleVo;
  },
  ResultVoObject
>('updateUserRoleUsingPut', ({ requestBody }) => ({
  url: `/admin/users/role`,
  method: 'PUT',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 修改用户的订阅状态
 */
export const updateUserSubscribeUsingPut = createRequest<
  {
    requestBody?: SubscribeVo;
  },
  ResultVoObject
>('updateUserSubscribeUsingPut', ({ requestBody }) => ({
  url: `/users/subscribe`,
  method: 'PUT',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 更新网站配置
 */
export const updateWebsiteConfigUsingPut = createRequest<
  {
    requestBody?: WebsiteConfigVo;
  },
  ResultVoObject
>('updateWebsiteConfigUsingPut', ({ requestBody }) => ({
  url: `/admin/website/config`,
  method: 'PUT',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

export interface AboutDto {
  content?: string;
}

export interface AboutVo {
  content: string;
}

export interface ArchiveDto {
  articles?: ArticleCardDto[];
  time?: string;
}

export interface ArticleAdminDto {
  articleCover?: string;
  articleTitle?: string;
  categoryName?: string;
  createTime?: string;
  id?: number;
  isDelete?: number;
  isFeatured?: number;
  isTop?: number;
  status?: number;
  tagDTOs?: TagDto[];
  type?: number;
  viewsCount?: number;
}

export interface ArticleAdminViewDto {
  articleContent?: string;
  articleCover?: string;
  articleTitle?: string;
  categoryName?: string;
  id?: number;
  isFeatured?: number;
  isTop?: number;
  originalUrl?: string;
  password?: string;
  status?: number;
  tagNames?: string[];
  type?: number;
}

export interface ArticleCardDto {
  articleContent?: string;
  articleCover?: string;
  articleTitle?: string;
  author?: UserInfo;
  categoryName?: string;
  createTime?: string;
  id?: number;
  isFeatured?: number;
  isTop?: number;
  status?: number;
  tags?: Tag[];
  updateTime?: string;
}

export interface ArticleDto {
  articleContent?: string;
  articleCover?: string;
  articleTitle?: string;
  author?: UserInfo;
  categoryName?: string;
  createTime?: string;
  id?: number;
  isDelete?: number;
  isFeatured?: number;
  isTop?: number;
  nextArticleCard?: ArticleCardDto;
  originalUrl?: string;
  preArticleCard?: ArticleCardDto;
  status?: number;
  tags?: Tag[];
  type?: number;
  updateTime?: string;
  viewCount?: number;
}

export interface ArticlePasswordVo {
  articleId?: number;
  articlePassword?: string;
}

export interface ArticleRankDto {
  articleTitle?: string;
  viewsCount?: number;
}

export interface ArticleSearchDto {
  articleContent?: string;
  articleTitle?: string;
  id?: number;
  isDelete?: number;
  status?: number;
}

export interface ArticleStatisticsDto {
  count?: number;
  date?: string;
}

export interface ArticleTopFeaturedVo {
  id?: number;
  isFeatured?: number;
  isTop?: number;
}

export interface ArticleVo {
  articleContent: string;
  articleCover?: string;
  articleTitle: string;
  categoryName?: string;
  id?: number;
  isFeatured?: number;
  isTop?: number;
  originalUrl?: string;
  password?: string;
  status?: number;
  tagNames?: string[];
  type?: number;
}

export interface AuroraAdminInfoDto {
  articleCount?: number;
  articleRankDTOs?: ArticleRankDto[];
  articleStatisticsDTOs?: ArticleStatisticsDto[];
  categoryDTOs?: CategoryDto[];
  messageCount?: number;
  tagDTOs?: TagDto[];
  uniqueViewDTOs?: UniqueViewDto[];
  userCount?: number;
  viewsCount?: number;
}

export interface AuroraHomeInfoDto {
  articleCount?: number;
  categoryCount?: number;
  tagCount?: number;
  talkCount?: number;
  viewCount?: number;
  websiteConfigDTO?: WebsiteConfigDto;
}

export interface CategoryAdminDto {
  articleCount?: number;
  categoryName?: string;
  createTime?: string;
  id?: number;
}

export interface CategoryDto {
  articleCount?: number;
  categoryName?: string;
  id?: number;
}

export interface CategoryOptionDto {
  categoryName?: string;
  id?: number;
}

export interface CategoryVo {
  categoryName: string;
  id?: number;
}

export interface CommentAdminDto {
  articleTitle?: string;
  avatar?: string;
  commentContent?: string;
  createTime?: string;
  id?: number;
  isReview?: number;
  nickname?: string;
  replyNickname?: string;
  type?: number;
}

export interface CommentDto {
  avatar?: string;
  commentContent?: string;
  createTime?: string;
  id?: number;
  nickname?: string;
  replyDTOs?: ReplyDto[];
  userId?: number;
  webSite?: string;
}

export interface CommentVo {
  commentContent: string;
  parentId?: number;
  replyUserId?: number;
  topicId?: number;
  type?: number;
}

export type DeleteArticlesUsingDeleteArticleids = number[];

export interface DeleteVo {
  ids: number[];
  isDelete: number;
}

export interface EmailVo {
  code: string;
  email: string;
}

export interface ExceptionLogDto {
  createTime?: string;
  exceptionInfo?: string;
  id?: number;
  ipAddress?: string;
  ipSource?: string;
  optDesc?: string;
  optMethod?: string;
  optUri?: string;
  requestMethod?: string;
  requestParam?: string;
}

export interface FriendLinkAdminDto {
  createTime?: string;
  id?: number;
  linkAddress?: string;
  linkAvatar?: string;
  linkIntro?: string;
  linkName?: string;
}

export interface FriendLinkDto {
  id?: number;
  linkAddress?: string;
  linkAvatar?: string;
  linkIntro?: string;
  linkName?: string;
}

export interface FriendLinkVo {
  id?: number;
  linkAddress: string;
  linkAvatar: string;
  linkIntro: string;
  linkName: string;
}

export interface IsHiddenVo {
  id?: number;
  isHidden?: number;
}

export interface JobDto {
  concurrent?: number;
  createTime?: string;
  cronExpression?: string;
  id?: number;
  invokeTarget?: string;
  jobGroup?: string;
  jobName?: string;
  misfirePolicy?: number;
  nextValidTime?: string;
  remark?: string;
  status?: number;
}

export interface JobLogDto {
  createTime?: string;
  endTime?: string;
  exceptionInfo?: string;
  id?: number;
  invokeTarget?: string;
  jobGroup?: string;
  jobId?: number;
  jobMessage?: string;
  jobName?: string;
  startTime?: string;
  status?: number;
}

export interface JobRunVo {
  id: number;
  jobGroup: string;
}

export interface JobStatusVo {
  id: number;
  status: number;
}

export interface JobVo {
  concurrent?: number;
  cronExpression?: string;
  id?: number;
  invokeTarget?: string;
  jobGroup?: string;
  jobName?: string;
  misfirePolicy?: number;
  remark?: string;
  status?: number;
}

export interface LabelOptionDto {
  children?: LabelOptionDto[];
  id?: number;
  label?: string;
}

export interface MenuDto {
  children?: MenuDto[];
  component?: string;
  createTime?: string;
  icon?: string;
  id?: number;
  isDisable?: number;
  isHidden?: number;
  name?: string;
  orderNum?: number;
  path?: string;
}

export interface MenuVo {
  component?: string;
  icon?: string;
  id?: number;
  isHidden?: number;
  name?: string;
  orderNum?: number;
  parentId?: number;
  path?: string;
}

export interface OperationLogDto {
  createTime?: string;
  id?: number;
  ipAddress?: string;
  ipSource?: string;
  nickname?: string;
  optDesc?: string;
  optMethod?: string;
  optModule?: string;
  optType?: string;
  optUri?: string;
  requestMethod?: string;
  requestParam?: string;
  responseData?: string;
}

export interface PageResultDtoArchiveDto {
  count?: number;
  records?: ArchiveDto[];
}

export interface PageResultDtoArticleAdminDto {
  count?: number;
  records?: ArticleAdminDto[];
}

export interface PageResultDtoArticleCardDto {
  count?: number;
  records?: ArticleCardDto[];
}

export interface PageResultDtoCategoryAdminDto {
  count?: number;
  records?: CategoryAdminDto[];
}

export interface PageResultDtoCommentAdminDto {
  count?: number;
  records?: CommentAdminDto[];
}

export interface PageResultDtoCommentDto {
  count?: number;
  records?: CommentDto[];
}

export interface PageResultDtoExceptionLogDto {
  count?: number;
  records?: ExceptionLogDto[];
}

export interface PageResultDtoFriendLinkAdminDto {
  count?: number;
  records?: FriendLinkAdminDto[];
}

export interface PageResultDtoJobDto {
  count?: number;
  records?: JobDto[];
}

export interface PageResultDtoJobLogDto {
  count?: number;
  records?: JobLogDto[];
}

export interface PageResultDtoOperationLogDto {
  count?: number;
  records?: OperationLogDto[];
}

export interface PageResultDtoPhotoAdminDto {
  count?: number;
  records?: PhotoAdminDto[];
}

export interface PageResultDtoPhotoAlbumAdminDto {
  count?: number;
  records?: PhotoAlbumAdminDto[];
}

export interface PageResultDtoRoleDto {
  count?: number;
  records?: RoleDto[];
}

export interface PageResultDtoTagAdminDto {
  count?: number;
  records?: TagAdminDto[];
}

export interface PageResultDtoTalkAdminDto {
  count?: number;
  records?: TalkAdminDto[];
}

export interface PageResultDtoTalkDto {
  count?: number;
  records?: TalkDto[];
}

export interface PageResultDtoUserAdminDto {
  count?: number;
  records?: UserAdminDto[];
}

export interface PageResultDtoUserOnlineDto {
  count?: number;
  records?: UserOnlineDto[];
}

export interface PasswordVo {
  newPassword: string;
  oldPassword: string;
}

export interface PhotoAdminDto {
  id?: number;
  photoDesc?: string;
  photoName?: string;
  photoSrc?: string;
}

export interface PhotoAlbumAdminDto {
  albumCover?: string;
  albumDesc?: string;
  albumName?: string;
  id?: number;
  photoCount?: number;
  status?: number;
}

export interface PhotoAlbumDto {
  albumCover?: string;
  albumDesc?: string;
  albumName?: string;
  id?: number;
}

export interface PhotoAlbumVo {
  albumCover: string;
  albumDesc?: string;
  albumName: string;
  id: number;
  status: number;
}

export interface PhotoDto {
  photoAlbumCover?: string;
  photoAlbumName?: string;
  photos?: string[];
}

export interface PhotoInfoVo {
  id: number;
  photoDesc?: string;
  photoName: string;
}

export interface PhotoVo {
  albumId: number;
  photoIds: number[];
  photoUrls: string[];
}

export interface QqLoginVo {
  accessToken: string;
  openId: string;
}

export interface ReplyDto {
  avatar?: string;
  commentContent?: string;
  createTime?: string;
  id?: number;
  nickname?: string;
  parentId?: number;
  replyNickname?: string;
  replyUserId?: number;
  replyWebsite?: string;
  userId?: number;
  webSite?: string;
}

export interface ResourceDto {
  children?: ResourceDto[];
  createTime?: string;
  id?: number;
  isAnonymous?: number;
  isDisable?: number;
  requestMethod?: string;
  resourceName?: string;
  url?: string;
}

export interface ResourceVo {
  id: number;
  isAnonymous: number;
  parentId: number;
  requestMethod: string;
  resourceName: string;
  url: string;
}

export interface ResultVoAboutDto {
  code?: number;
  data?: AboutDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoArticleAdminViewDto {
  code?: number;
  data?: ArticleAdminViewDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoArticleDto {
  code?: number;
  data?: ArticleDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoAuroraAdminInfoDto {
  code?: number;
  data?: AuroraAdminInfoDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoAuroraHomeInfoDto {
  code?: number;
  data?: AuroraHomeInfoDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoJobDto {
  code?: number;
  data?: JobDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoListArticleSearchDto {
  code?: number;
  data?: ArticleSearchDto[];
  flag?: boolean;
  message?: string;
}

export interface ResultVoListCategoryDto {
  code?: number;
  data?: CategoryDto[];
  flag?: boolean;
  message?: string;
}

export interface ResultVoListCategoryOptionDto {
  code?: number;
  data?: CategoryOptionDto[];
  flag?: boolean;
  message?: string;
}

export interface ResultVoListCommentDto {
  code?: number;
  data?: CommentDto[];
  flag?: boolean;
  message?: string;
}

export interface ResultVoListFriendLinkDto {
  code?: number;
  data?: FriendLinkDto[];
  flag?: boolean;
  message?: string;
}

export interface ResultVoListLabelOptionDto {
  code?: number;
  data?: LabelOptionDto[];
  flag?: boolean;
  message?: string;
}

export interface ResultVoListMenuDto {
  code?: number;
  data?: MenuDto[];
  flag?: boolean;
  message?: string;
}

export interface ResultVoListPhotoAlbumDto {
  code?: number;
  data?: PhotoAlbumDto[];
  flag?: boolean;
  message?: string;
}

export interface ResultVoListReplyDto {
  code?: number;
  data?: ReplyDto[];
  flag?: boolean;
  message?: string;
}

export interface ResultVoListResourceDto {
  code?: number;
  data?: ResourceDto[];
  flag?: boolean;
  message?: string;
}

export interface ResultVoListString {
  code?: number;
  data?: string[];
  flag?: boolean;
  message?: string;
}

export interface ResultVoListTagAdminDto {
  code?: number;
  data?: TagAdminDto[];
  flag?: boolean;
  message?: string;
}

export interface ResultVoListTagDto {
  code?: number;
  data?: TagDto[];
  flag?: boolean;
  message?: string;
}

export interface ResultVoListUserAreaDto {
  code?: number;
  data?: UserAreaDto[];
  flag?: boolean;
  message?: string;
}

export interface ResultVoListUserMenuDto {
  code?: number;
  data?: UserMenuDto[];
  flag?: boolean;
  message?: string;
}

export interface ResultVoListUserRoleDto {
  code?: number;
  data?: UserRoleDto[];
  flag?: boolean;
  message?: string;
}

export interface ResultVoObject {
  code?: number;
  data?: {};
  flag?: boolean;
  message?: string;
}

export interface ResultVoPageResultDtoArchiveDto {
  code?: number;
  data?: PageResultDtoArchiveDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoPageResultDtoArticleAdminDto {
  code?: number;
  data?: PageResultDtoArticleAdminDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoPageResultDtoArticleCardDto {
  code?: number;
  data?: PageResultDtoArticleCardDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoPageResultDtoCategoryAdminDto {
  code?: number;
  data?: PageResultDtoCategoryAdminDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoPageResultDtoCommentAdminDto {
  code?: number;
  data?: PageResultDtoCommentAdminDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoPageResultDtoCommentDto {
  code?: number;
  data?: PageResultDtoCommentDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoPageResultDtoExceptionLogDto {
  code?: number;
  data?: PageResultDtoExceptionLogDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoPageResultDtoFriendLinkAdminDto {
  code?: number;
  data?: PageResultDtoFriendLinkAdminDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoPageResultDtoJobDto {
  code?: number;
  data?: PageResultDtoJobDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoPageResultDtoJobLogDto {
  code?: number;
  data?: PageResultDtoJobLogDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoPageResultDtoOperationLogDto {
  code?: number;
  data?: PageResultDtoOperationLogDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoPageResultDtoPhotoAdminDto {
  code?: number;
  data?: PageResultDtoPhotoAdminDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoPageResultDtoPhotoAlbumAdminDto {
  code?: number;
  data?: PageResultDtoPhotoAlbumAdminDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoPageResultDtoRoleDto {
  code?: number;
  data?: PageResultDtoRoleDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoPageResultDtoTagAdminDto {
  code?: number;
  data?: PageResultDtoTagAdminDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoPageResultDtoTalkAdminDto {
  code?: number;
  data?: PageResultDtoTalkAdminDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoPageResultDtoTalkDto {
  code?: number;
  data?: PageResultDtoTalkDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoPageResultDtoUserAdminDto {
  code?: number;
  data?: PageResultDtoUserAdminDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoPageResultDtoUserOnlineDto {
  code?: number;
  data?: PageResultDtoUserOnlineDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoPhotoAlbumAdminDto {
  code?: number;
  data?: PhotoAlbumAdminDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoPhotoDto {
  code?: number;
  data?: PhotoDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoString {
  code?: number;
  data?: string;
  flag?: boolean;
  message?: string;
}

export interface ResultVoTalkAdminDto {
  code?: number;
  data?: TalkAdminDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoTalkDto {
  code?: number;
  data?: TalkDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoTopAndFeaturedArticlesDto {
  code?: number;
  data?: TopAndFeaturedArticlesDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoUserInfoDto {
  code?: number;
  data?: UserInfoDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoUserLogoutStatusDto {
  code?: number;
  data?: UserLogoutStatusDto;
  flag?: boolean;
  message?: string;
}

export interface ResultVoWebsiteConfigDto {
  code?: number;
  data?: WebsiteConfigDto;
  flag?: boolean;
  message?: string;
}

export interface ReviewVo {
  ids: number[];
  isReview: number;
}

export interface RoleDto {
  createTime?: string;
  id?: number;
  isDisable?: number;
  menuIds?: number[];
  resourceIds?: number[];
  roleName?: string;
}

export interface RoleVo {
  id?: number;
  menuIds: number[];
  resourceIds: number[];
  roleName: string;
}

export interface SubscribeVo {
  isSubscribe?: number;
  userId?: number;
}

export interface Tag {
  createTime?: string;
  id?: number;
  tagName?: string;
  updateTime?: string;
}

export interface TagAdminDto {
  articleCount?: number;
  createTime?: string;
  id?: number;
  tagName?: string;
}

export interface TagDto {
  count?: number;
  id?: number;
  tagName?: string;
}

export interface TagVo {
  id?: number;
  tagName: string;
}

export interface TalkAdminDto {
  avatar?: string;
  content?: string;
  createTime?: string;
  id?: number;
  images?: string;
  imgs?: string[];
  isTop?: number;
  nickname?: string;
  status?: number;
}

export interface TalkDto {
  avatar?: string;
  commentCount?: number;
  content?: string;
  createTime?: string;
  id?: number;
  images?: string;
  imgs?: string[];
  isTop?: number;
  nickname?: string;
}

export interface TalkVo {
  content?: string;
  id?: number;
  images?: string;
  isTop?: number;
  status?: number;
}

export interface TopAndFeaturedArticlesDto {
  featuredArticles?: ArticleCardDto[];
  topArticle?: ArticleCardDto;
}

export interface UniqueViewDto {
  day?: string;
  viewsCount?: number;
}

export interface UserAdminDto {
  avatar?: string;
  createTime?: string;
  id?: number;
  ipAddress?: string;
  ipSource?: string;
  isDisable?: number;
  lastLoginTime?: string;
  loginType?: number;
  nickname?: string;
  roles?: UserRoleDto[];
  status?: number;
  userInfoId?: number;
}

export interface UserAreaDto {
  name?: string;
  value?: number;
}

export interface UserDisableVo {
  id?: number;
  isDisable?: number;
}

export interface UserInfo {
  avatar?: string;
  createTime?: string;
  email?: string;
  id?: number;
  intro?: string;
  isDisable?: number;
  isSubscribe?: number;
  nickname?: string;
  updateTime?: string;
  website?: string;
}

export interface UserInfoDto {
  avatar?: string;
  email?: string;
  id?: number;
  intro?: string;
  ipAddress?: string;
  ipSource?: string;
  isSubscribe?: number;
  lastLoginTime?: string;
  loginType?: number;
  nickname?: string;
  token?: string;
  userInfoId?: number;
  username?: string;
  website?: string;
}

export interface UserInfoVo {
  intro?: string;
  nickname?: string;
  website?: string;
}

export interface UserLogoutStatusDto {
  message?: string;
}

export interface UserMenuDto {
  children?: UserMenuDto[];
  component?: string;
  hidden?: boolean;
  icon?: string;
  name?: string;
  path?: string;
}

export interface UserOnlineDto {
  avatar?: string;
  browser?: string;
  ipAddress?: string;
  ipSource?: string;
  lastLoginTime?: string;
  nickname?: string;
  os?: string;
  userInfoId?: number;
}

export interface UserRoleDto {
  id?: number;
  roleName?: string;
}

export interface UserRoleVo {
  nickname?: string;
  roleIds?: number[];
  userInfoId?: number;
}

export interface UserVo {
  code: string;
  password: string;
  username: string;
}

export interface WebsiteConfigDto {
  alipayQRCode?: string;
  author?: string;
  authorAvatar?: string;
  authorIntro?: string;
  beianNumber?: string;
  csdn?: string;
  englishName?: string;
  gitee?: string;
  github?: string;
  isCommentReview?: number;
  isEmailNotice?: number;
  isReward?: number;
  juejin?: string;
  logo?: string;
  multiLanguage?: number;
  name?: string;
  notice?: string;
  qq?: string;
  qqLogin?: number;
  stackoverflow?: string;
  touristAvatar?: string;
  twitter?: string;
  userAvatar?: string;
  weChat?: string;
  websiteCreateTime?: string;
  weiXinQRCode?: string;
  weibo?: string;
  zhihu?: string;
}

export interface WebsiteConfigVo {
  alipayQRCode: string;
  author: string;
  authorAvatar: string;
  authorIntro: string;
  beianNumber: string;
  csdn: string;
  englishName: string;
  gitee: string;
  github: string;
  isCommentReview: number;
  isEmailNotice: number;
  isReward: number;
  juejin: string;
  logo: string;
  multiLanguage: number;
  name: string;
  notice: string;
  qq: string;
  qqLogin: number;
  stackoverflow: string;
  touristAvatar: string;
  twitter: string;
  userAvatar: string;
  weChat: string;
  websiteCreateTime: string;
  weiXinQRCode: string;
  weibo: string;
  zhihu: string;
}

export interface AuthLoginRes {
  username: string;
  password: string;
}

export interface AuthLoginRev {
  code: number;
  flag: boolean;
  message: string;
  data: object;
}
