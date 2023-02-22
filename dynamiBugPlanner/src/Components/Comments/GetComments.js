import './GetComments.css';
function ShowComments({ comments }) {
    if (comments.length !== 0) {
        return comments.map((c) => {
            return (
                <div key={c.id}>
                    <div className="row Crow">
                        <label className="Clabel">Date: </label>{" "}
                        <input className="Cdate" type="text" value={new Date(c.createDate)} readOnly />
                    </div>
                    <div className="row Crow">
                        <label className="Clabel">Comment: </label>{" "}
                        <textarea className="Ctextarea" rows="5" value={c.comment} readOnly />
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