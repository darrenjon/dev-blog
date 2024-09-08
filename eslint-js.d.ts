declare module '@eslint/js' {
  const configs: {
    recommended: {
      rules: Record<string, unknown>;
    };
  };
  export = { configs };
}