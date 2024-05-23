/* Inside static/script.js */

document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display posts
    fetchPosts();

    // Handle new post submission
    document.getElementById('new-post-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const content = document.getElementById('post-content').value;
        createPost(content);
    });
});

function fetchPosts() {
    // Fetch posts from backend API
    // Replace this with your actual API endpoint
    fetch('/api/posts/')
        .then(response => response.json())
        .then(data => {
            const postsContainer = document.getElementById('posts-container');
            postsContainer.innerHTML = ''; // Clear previous posts
            data.forEach(post => {
                const postElement = createPostElement(post);
                postsContainer.appendChild(postElement);
            });
        });
}

function createPost(content) {
    // Send new post data to backend API
    // Replace this with your actual API endpoint
    fetch('/api/posts/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
    })
    .then(response => response.json())
    .then(data => {
        fetchPosts(); // Fetch and display updated posts
        document.getElementById('post-content').value = ''; // Clear post content textarea
    });
}

function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
        <p class="post-content">${post.content}</p>
        <p class="post-meta">Posted by ${post.user} on ${new Date(post.created_at).toLocaleString()}</p>
    `;
    return postElement;
}
