import { useUserRoute } from 'hooks/user';

const RenderRouter = () => {
  const routes = useUserRoute();
  return routes;
};

export default RenderRouter();
