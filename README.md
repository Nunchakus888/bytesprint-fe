# ByteSprint 2023

#### contranct Api 
https://zw41df4l3nd.feishu.cn/docx/TjkydYHBcoklkCx7MIfcfMVwnih

## Getting started

- Clone
- Enter in the directory
- Install dependencies: `yarn`
- Start the development server: `yarn dev`
- View project in local environment: `localhost:3000`

### Commands

All commands are run from the root of the project, from a terminal:

| Command      | Action                                      |
| :----------- | :------------------------------------------ |
| `yarn`       | Install dependencies                        |
| `yarn dev`   | Starts local dev server at `localhost:3000` |
| `yarn build` | Build your production site to `./next/`     |
| `yarn lint`  | Run Eslint                                  |

### Framework & UI library

- nextjs https://nextjs.org/docs
- tailwindcss https://tailwindcss.com/docs
- flowbite，基于tw的组件，支持ssr、主题切换（无需更改bg/color）， https://flowbite.com/docs/overview/introduction/
- chakra-ui，基于tw的css in js 实现（不支持ssr）， https://chakra-ui.com/docs/getting-started
- Responsive， 以上 UI 库均以 mobile first 为准，支持响应式布局
- 多页面应用，组件库可按需组合选用

### i18n

- 使用next-i18next组件，支持ssr
- 客户端使用 locale 路由
- todo 页面切换 middleware suffix locale

### theme

- color-mode 使用next-themes组件，支持ssr
- 全局 theme 以chakra-ui为准，tw 配置向chakra-ui兼容
- UI 配色待定（紫色渐变），当前是设计稿是 blue，纯web2既视感2333

### 鉴权管理

- 使用next-auth组件
- 使用nextjs api实现自定义登录接口或接三方API

# deploy

- push code to main branch, then vercel will deploy automatically
- 后期按需自托管

# environments

- prod: https://btyd.io/
- dev: to be continued...
