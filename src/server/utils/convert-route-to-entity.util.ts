const mapping: Record<string, string> = {
  resources: 'resource',
  'suggested-edits': 'suggested_edit',
  thinkers: 'thinker',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
