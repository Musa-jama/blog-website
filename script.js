document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname === "/index.html") {
        const postList = document.getElementById('post-list');
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        
        if (posts.length === 0) {
            postList.innerHTML = "<li>No posts available</li>";
        } else {
            posts.forEach((post, index) => {
                const postItem = document.createElement('li');
                postItem.innerHTML = `
                    <h2><a href="post.html?id=${index}">${post.title}</a></h2>
                    <p>${post.content.substring(0, 100)}...</p>
                `;
                postList.appendChild(postItem);
            });
        }
    }

    
    if (window.location.pathname === "/new-post.html") {
        document.getElementById('new-post-form').addEventListener('submit', function(event) {
            event.preventDefault();

            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value;
            const image = document.getElementById('image').files[0];

            if (!title || !content) {
                alert("Title and content are required.");
                return;
            }

            const newPost = {
                title,
                content,
                image: image ? URL.createObjectURL(image) : null
            };

            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            posts.push(newPost);
            localStorage.setItem('posts', JSON.stringify(posts));

            window.location.href = 'index.html';
        });
    }


    if (window.location.pathname === "/post.html") {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');
        const posts = JSON.parse(localStorage.getItem('posts')) || [];

        if (!posts[postId]) {
            alert("Post not found.");
            return;
        }

        const post = posts[postId];
        document.getElementById('post-title').textContent = post.title;
        document.getElementById('post-content').textContent = post.content;
        if (post.image) {
            document.getElementById('post-image').innerHTML = `<img src="${post.image}" alt="Post Image">`;
        }

        document.getElementById('edit-button').addEventListener('click', function() {
            window.location.href = `new-post.html?id=${postId}`;
        });

        document.getElementById('delete-button').addEventListener('click', function() {
            posts.splice(postId, 1);
            localStorage.setItem('posts', JSON.stringify(posts));
            window.location.href = 'index.html';
        });
    }
});
