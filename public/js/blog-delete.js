async function deleteFormHandler(event) {
    event.preventDefault();

    
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment_text) {
        const response = await fetch(`/api/blog/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.delete-blog-btn').addEventListener('click', deleteFormHandler);