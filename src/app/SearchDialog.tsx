const SearchDialog = ({}) => {
    return (
        <div className="card">
            <div className="card-header">Search threads</div>
            <div className="card-body">
                <form>
                    <label>Thread title</label>
                    <input type="text" placeholder="Enter thread title" />
                    <label>Author</label>
                    <input type="text" placeholder="Enter author to filter" />
                    <label>Tags</label>
                    <input type="text" placeholder="Select tag to filter" />
                </form>
            </div>
        </div>
    );
}
 
export default SearchDialog;