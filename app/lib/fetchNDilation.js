const fetchNDilation = (fetch, value) => {
    return fetch("http://localhost:8080/dilation", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify({
            value,
            degree: 2,
        }),
    });
};

export default fetchNDilation;
