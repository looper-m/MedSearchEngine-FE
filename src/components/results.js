import SearchEngineService from "../services/search-engine-service";
import {useState, useEffect} from "react";
import {useParams} from "react-router";
import {Link} from "react-router-dom";

const Results = ({loadingBar}) => {
    const {query, page} = useParams();
    const [searchResult, setSearchResult] = useState(null);
    const [paginateParams, setPaginateParams] = useState({
        current: 0,
        hits: 0,
        totalPages: 0
    });

    useEffect(() => {
        loadingBar.current.continuousStart()
        SearchEngineService.searchQuery(query, paginateParams.current)
            .then(response => {
                setSearchResult(response)
                setPaginateParams(params => ({
                    ...params,
                    hits: response.hits.total.value,
                    totalPages: Math.ceil(response.hits.total.value / 15)
                }))
            })
            .finally(() =>
                loadingBar.current.complete()
            )
    }, [page, paginateParams.current, query]);

    const handlePrevPage = () => {
        let prevPage = paginateParams.current - 15 <= 0 ? 0 : paginateParams.current - 15
        setPaginateParams(params => ({
            ...params,
            current: prevPage
        }))
    }

    const handleNextPage = () => {
        let nextPage = paginateParams.current + 15 >= paginateParams.hits ? 0 : paginateParams.current + 15
        setPaginateParams(params => ({
            ...params,
            current: nextPage
        }))
    }

    return (
        <div className="container">
            <div className="row py-5">
                <div className="col-sm-12">
                    <h1>Results</h1>
                </div>
                <div className="col-sm-12">
                    {searchResult && console.log("pingu " + searchResult.hits.total.value)}
                    {searchResult && searchResult.hits.hits.map((hit, index) =>
                        <p key={index}>
                            <Link to={`/document/${hit._id}`}>
                                {index} : {hit._source['@title']}
                            </Link>
                            {hit._source['@meta-desc']}
                        </p>
                    )}
                </div>
            </div>
            <div className="row">
                <div className="col-sm-5"/>
                <div className="col-sm-2 d-flex justify-content-between">
                    {console.log(paginateParams)}
                    {
                        Math.floor(paginateParams.current / 15) > 0 &&
                        <i style={{cursor: "pointer"}}
                           className="fas fa-arrow-circle-left fa-3x"
                           onClick={handlePrevPage}/>
                    }
                    {
                        Math.floor(paginateParams.current / 15) <= paginateParams.totalPages - 2 &&
                        <i style={{cursor: "pointer"}}
                           className="fas fa-arrow-circle-right fa-3x"
                           onClick={handleNextPage}/>
                    }
                </div>
                <div className="col-sm-5"/>
            </div>
        </div>
    );
}

export default Results;