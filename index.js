const { Toolkit } = require("actions-toolkit");

Toolkit.run(async tools => {
  const repos = await tools.github.repos.list();
  console.log(repos);
});
