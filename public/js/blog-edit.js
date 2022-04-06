async function commentFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name = "blog-title"]').value.trim();
    const comment = document.querySelector('input[name = "blog-comment"]').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment_text) {
        const response = await fetch(`/api/blog/${id}`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                comment,
                description: comment
            }),

            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            document.location.replace();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);