$(document).ready(function () {
    $("#searchUser").on("keyup", function (event) {
        let username = event.target.value;
        // Make request to GitHub API:
        let client_id = "da6c381de6ce0cce901b";
        let client_secret = "dac36bec6b5424e2a52134d57e5afaa8de28cf9c";
        $.ajax({
            url: `https://api.github.com/users/${username}`,
            headers: {
                Authorization: "Basic " + btoa(client_id + ":" + client_secret),
            },
            data: {
                headers: "headers",
            },
        }).done(function (user) {
            let client_id = "da6c381de6ce0cce901b";
            let client_secret = "dac36bec6b5424e2a52134d57e5afaa8de28cf9c";
            $.ajax({
                url: `https://api.github.com/users/${username}/repos`,
                headers: {
                    Authorization: "Basic " + btoa(client_id + ":" + client_secret),
                },
                data: {
                    sort: "created: asc",
                    per_page: 5,
                    headers: "headers",
                },
            }).done(function (repos) {
                $.each(repos, function (index, repo) {
                    $("#repos").append(`
                        <div class="card">
                            <div class="row p-3" style="text-transform:capitalize;">
                                <div class="col-md-7">
                                    <strong>${repo.name}</strong>: ${repo.description}
                                </div>
                                <div class="col-md-3">
                                    <span class="badge bg-dark">Forks: ${repo.forks_count}</span>
                                    <span class="badge bg-primary">Watchers: ${repo.watchers_count}</span>
                                    <span class="badge bg-success">Stars: ${repo.stargazers_count}</span>
                                </div>
                                <div class="col-md-2">
                                    <a href="${repo.html_url}" target="_blank" class="btn btn-primary">Repo Page</a>
                                </div>
                            </div>
                        </div>
                    `);
                });
            });
            $("#profile").html(`
            <div class="card border-dark mb-3" style="max-width: 100rem;">
                <div class="card-header">
                    <h3>${user.name}</h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img src="${user.avatar_url}" class="img-thumbnail avatar">
                            <a class="btn btn-primary btn-block mt-3" target="_blank" href="${user.html_url}">View Profile</a>
                        </div>
                        <div class="col-md-9">
                            <span class="badge bg-primary">Public Reops: ${user.public_repos}</span>
                            <span class="badge bg-success">Followers: ${user.followers}</span>
                            <span class="badge bg-info">Following: ${user.following}</span>
                            <br><br>
                            <ul class="list-group">
                                <li class="list-group-item">Company: ${user.company}</li>
                                <li class="list-group-item">Website/Blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                                <li class="list-group-item">Location: ${user.location}</li>
                                <li class="list-group-item">Member Since: ${user.created_at}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <h3 class="page-header">Latest Repos</h3>
            <div id="repos"></div>       
            `);
        });
    });
});
