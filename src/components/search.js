import {useState} from "react";
import {useHistory} from "react-router";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const history = useHistory();

    const handleChangeQuery = (e) => {
        setSearchQuery(e.target.value)
    }

    return (
        <div className="container">
            <div className="row search-group centered">
                <div className="col-sm-8">
                        <input type="text"
                               className="form-control form-control-lg shadow-sm bg-body"
                               aria-describedby="addon-wrapping"
                               onChange={handleChangeQuery}/>
                </div>
                <div className="col-sm-6">
                    <button className="btn btn-info btn-lg mt-5"
                            onClick={() => history.push(`/search/${searchQuery}`)}>
                        <i className="fas fa-glasses fa-lg"/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Search;