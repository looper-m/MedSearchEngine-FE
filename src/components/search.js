import {useState} from "react";
import {useHistory} from "react-router";
import logo from "../logo.svg";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const history = useHistory();

    const handleChangeQuery = (e) => {
        setSearchQuery(e.target.value)
    }

    const handlePressEnter = (e) => {
        if (e.key === "Enter") {
            handleSearchQuery()
        }
    }

    const handleSearchQuery = () => {
        if (searchQuery !== "") {
            history.push(`/search/${searchQuery}`)
        }
    }

    return (
        <div className="container">
            <div className="row m-5 pt-5">
                <img className="logo d-flex mx-auto" src={logo} alt="logo"/>
            </div>
            <div className="row centered search-group">
                <div className="col-sm-8">
                    <input type="text"
                           className="form-control form-control-lg shadow-sm bg-body"
                           aria-describedby="addon-wrapping"
                           onChange={handleChangeQuery}
                           onKeyPress={handlePressEnter}/>
                </div>
                <div className="col-sm-6">
                    <button className="btn btn-info btn-lg mt-5 shadow-sm"
                            onClick={handleSearchQuery}>
                        <i className="fas fa-search fa-lg"/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Search;