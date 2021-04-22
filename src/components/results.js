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
        totalPages: 0,
        time: 0.0
    });

    useEffect(() => {
        loadingBar.current.continuousStart()
        SearchEngineService.searchQuery(query, paginateParams.current)
            .then(response => {
                setSearchResult(response)
                setPaginateParams(params => ({
                    ...params,
                    hits: response.hits.total.value,
                    totalPages: Math.ceil(response.hits.total.value / 15),
                    time: response.took / 1000
                }))
            })
            .catch(error => {
                console.log("Error: ", error)
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

    function remove_tags(html) {
        html = html.replaceAll("<strong>", "||br||");
        html = html.replaceAll("</strong>", "||/br||");
        let tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        html = tmp.textContent || tmp.innerText;
        html = html.replaceAll("||br||", "<strong>");
        return html.replaceAll("||/br||", "</strong>");
    }

    return (
        <div className="container">
            <div className="row py-5">
                <div className="col-sm-12 mb-4">
                    <h1 className="display-4 title-color-grey">Search Results</h1>
                    {
                        paginateParams &&
                        <figcaption className="blockquote-footer">
                            About {paginateParams.hits} results&nbsp;
                            <cite title="Source Title">
                                ({paginateParams.time} seconds)
                            </cite>
                        </figcaption>
                    }
                    <hr/>
                </div>
                <ul className="col-sm-12"
                    style={{'list-style-type': 'none'}}>
                    {searchResult && searchResult.hits.hits.map((hit, index) =>
                        <li className="mb-5" key={index}>
                            <Link to={`/document/${hit._id}`}>
                                {hit._source['@title']}
                            </Link>
                            <br/>
                            {
                                hit.highlight && Object.keys(hit.highlight).map(key => {
                                    // return (<>{hit.highlight[key][0]}</>)
                                    // let stripped = (hit.highlight[key][0]).replace(/<(?!strong\!\/strong\s*\/?)[^>]+>/g, '');
                                    let stripped = remove_tags(hit.highlight[key][0]) + " ... "
                                    if (hit.highlight[key].length > 1) {
                                        stripped += remove_tags(hit.highlight[key][1]) + " ... "
                                    }
                                    return (
                                        <span className="text-secondary"
                                              dangerouslySetInnerHTML={{__html: stripped}}/>
                                    )
                                })
                            }
                        </li>
                    )}
                </ul>
            </div>
            <div className="row">
                <div className="col-sm-5"/>
                <div className="col-sm-2 d-flex justify-content-between">
                    {/*{console.log(paginateParams)}*/}
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