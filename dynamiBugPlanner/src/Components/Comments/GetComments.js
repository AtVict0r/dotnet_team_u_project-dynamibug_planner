function ShowComments({ comments }) {
    if (comments.length !== 0) {
        return comments.map((c) => {
            return (
                <div key={c.id}>
                    <div>
                        <label>Date: </label>{" "}
                        <input type="text" value={new Date(c.createDate)} readOnly />
                    </div>
                    <div>
                        <label>Comment: </label>{" "}
                        <textarea value={c.comment} readOnly />
                    </div>
                </div>
            );
        })
    }
    else {
        return <p>No Comments</p>;
        // }
    }
}

export default function GetComments({ comments }) {
    return (
        <>
            <h4>Comments</h4>
            <div>
                <ShowComments comments={comments} />
            </div>
        </>
    );
}