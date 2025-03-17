

const loadIssues = () => {
    fetch("/read-issues/")
        .then(response => response.json())
        .then(data =>{
            let issueDiv = document.getElementById('issues');
            issueDiv.innerHTML = "";
            data.issues.forEach(issue => {
                issueDiv.innerHTML += renderIssue(issue);
            });
        })

};

document.addEventListener("DOMContentLoaded", loadIssues);

const createIssue = () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
    const message = "Issue created successfully!";


    fetch("/create-issue/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title, description, priority, message})
    }).then(response => response.json())
      .then(() => {
        loadIssues(); 
        showNotification(message);
    }).catch(() => {
        showNotification("Failed to create issue!", "is-danger");
    });
};

const renderIssue = (issue) => {
    return `
        <div class="card" id="issue-${issue.issue_id}>
            <header class="card-header"  style="border-bottom: 1px solid #808080;">
                <p class="card-header-title">
                    <span>${issue.title}</span>
                </p>
                <span class="tag is-info my-4 mx-2 status">${issue.status}</span>
                <span class="tag is-danger my-4 mx-2 is-light">${issue.priority}</span>
            </header>
    
            <div class="card-content">
                <div class="content">
                    ${issue.description}
                    <br>
                    <div class="buttons mt-3">
                        <button class="button is-warning is-small is-responsive" onclick="updateIssue(${issue.issue_id})">
                            <i class="fas fa-sync-alt"></i> Change Status
                        </button>
                        <button class="button is-danger is-small is-responsive" onclick="deleteIssue(${issue.issue_id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

const updateIssue = (issue_id) => {
    fetch(`/update-issues/${issue_id}/`, {
        method: "PATCH"
    }).then(response => response.json())
    .then(() => loadIssues());
};


const deleteIssue = (issue_id) => {
    const message = "Issue deleted successfully!";

    fetch(`/delete-issues/${issue_id}`,{
        method: "DELETE"
    }).then(response => response.json())
    .then(() => {
        loadIssues();
        showNotification(message, "is-danger");
    });
};

const showNotification = (message, type = "is-link") => {
    const container = document.getElementById("notification-container");

    
    const notification = document.createElement("div");
    notification.className = `notification ${type} p-4`;
    notification.style.cssText = "margin-bottom: 10px; max-width: 300px;";


    notification.innerHTML += message;

    
    container.appendChild(notification);


    setTimeout(() => {
        notification.remove();
    }, 3000);
};
