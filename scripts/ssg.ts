import("../dist/server/main.ssg.js" as any).then(async (entry) => {
  console.log(await entry.render("/"));
});
