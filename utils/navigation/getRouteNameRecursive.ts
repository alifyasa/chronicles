interface Route {
  name: string;
  state?: {
    routes: Route[];
  };
}

const getRouteNamesRecursive = (routes: Route[], parent: string): string[] => {
  return routes.flatMap((route: Route) => {
    const currentName = `${parent}/${route.name}`;
    if (!route.state) {
      return currentName;
    }

    return getRouteNamesRecursive(route.state.routes, currentName);
  });
};

export { getRouteNamesRecursive };
