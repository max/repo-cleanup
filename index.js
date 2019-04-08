const { Toolkit } = require("actions-toolkit");

process.env.GITHUB_TOKEN = process.env.PAT;

Toolkit.run(tools => {
  const options = tools.github.repos.list.endpoint.merge({
    affiliation: "owner"
  });

  tools.github
    .paginate(options, response => response.data)
    .then(repos => repos.filter(repo => repo.name.startsWith("tmp-")))
    .then(repos => repos.filter(repo => !repo.archived))
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
