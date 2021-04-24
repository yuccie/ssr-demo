import createApp from "./createApp";

// 这是
export default (ctx) => {
  const { app } = createApp(ctx);
  return app;
};
