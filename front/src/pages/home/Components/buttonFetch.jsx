function ButtonFetch(name, id, type = 'GET') {
    fetch(`http://localhost:8080/api/posts/${id}/${name}`, {
        method: type,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    });
}

export default ButtonFetch;
