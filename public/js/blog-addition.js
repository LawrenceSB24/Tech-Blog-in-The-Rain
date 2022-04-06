async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="blog-title"]').value;
    const description = document.querySelector('input[name="description"]').value;

    const response = await fetch(`/api/blog`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            description
        }),

        headers: {'Content-Type': 'application/json'}
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}