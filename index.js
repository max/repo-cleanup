const { Toolkit } = require("actions-toolkit");

process.env.GITHUB_TOKEN = process.env.PAT;

const monthishAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

Toolkit.run(tools => {
  const options = tools.github.repos.list.endpoint.merge({
    affiliation: "owner"
  });

  tools.github
    .paginate(options, response => response.data)
    .then(repos => repos.filter(repo => repo.name.startsWith("tmp-")))
    .then(repos =>
      repos.filter(repo => {
        const lastPush = Date.parse(repo.pushed_at);
        return !repo.archived && lastPush > monthishAgo;
      })
    )
    .then(repos =>
      repos.map(repo =>
        tools.github.repos.update({
          owner: repo.owner.login,
          repo: repo.name,
          name: repo.name,
          archived: true
        })
      )
    );
});
