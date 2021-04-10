import {useParams} from "react-router";
import {useState, useEffect} from "react";
import SearchEngineService from "../services/search-engine-service";
import {Link} from "react-router-dom";

const DocumentDetail = ({loadingBar}) => {
    const {docId} = useParams();
    const [document, setDocument] = useState(null);

    useEffect(() => {
        loadingBar.current.continuousStart()
        SearchEngineService.getDocumentById(docId)
            .then(response => setDocument(response))
            .finally(() => loadingBar.current.complete())
    }, [docId]);

    return (
        <div className="container shadow p-4">
            {
                document && (
                    <>
                        <h1 className="display-3 text-secondary"
                            dangerouslySetInnerHTML={{__html: document._source['@title']}}/>
                        {
                            document._source['also-called'] &&
                            <figcaption className="blockquote-footer">
                                <strong>Also called&nbsp;</strong>
                                <cite title="Source Title">
                                    {
                                        typeof (document._source['also-called']) === "object" &&
                                        document._source['also-called'].map((alias, index) =>
                                                <span key={index}>
                                            {alias}
                                                    {index !== document._source['also-called'].length - 1 && <>,&nbsp;</>}
                                        </span>
                                        )
                                    }
                                    {
                                        typeof (document._source['also-called']) === "string" &&
                                        <>
                                            {document._source['also-called']}
                                        </>
                                    }
                                </cite>
                            </figcaption>
                        }
                        {
                            document._source['see-reference'] &&
                            <figcaption className="blockquote-footer">
                                <strong>See reference&nbsp;</strong>
                                <cite title="Source Title">
                                    {
                                        typeof (document._source['see-reference']) === "object" &&
                                        document._source['see-reference'].map((alias, index) =>
                                                <span key={index}>
                                            {alias}
                                                    {index !== document._source['see-reference'].length - 1 && <>,&nbsp;</>}
                                        </span>
                                        )
                                    }
                                    {
                                        typeof (document._source['see-reference']) === "string" &&
                                        <>
                                            {document._source['see-reference']}
                                        </>
                                    }
                                </cite>
                            </figcaption>
                        }
                        <hr/>
                        {
                            document._source['mesh-heading'] &&
                            <div className="mb-2">
                                <strong>MeSH -&nbsp;</strong>
                                {
                                    Array.isArray(document._source['mesh-heading']) ?
                                        document._source['mesh-heading'].map((descriptor, index) =>
                                                <span key={index}>
                                            <kbd>{descriptor.descriptor['#text']}</kbd>&nbsp;
                                        </span>
                                        )
                                        :
                                        <kbd>{document._source['mesh-heading']['descriptor']['#text']}</kbd>
                                }
                            </div>
                        }
                        <a href={document._source['@url']}
                           className="badge rounded-pill bg-light mb-4">
                            source
                        </a>
                        <p className="lead mb-5">
                            <strong>{document._source['@meta-desc']}</strong>
                        </p>
                        <h4 className="text-secondary pt-2">Summary</h4>
                        <hr/>
                        <div className="mb-5"
                             dangerouslySetInnerHTML={{__html: document._source['full-summary']}}/>
                        {
                            document._source['related-topic'] &&
                            <>
                                <h4 className="text-secondary">Related Topics</h4>
                                <hr/>
                                <ul className="mb-5">
                                    {
                                        Array.isArray(document._source['related-topic']) ?
                                            document._source['related-topic'].map((topic, index) =>
                                                <li key={index}>
                                                    <Link to={`/document/${topic['@id']}`}>
                                                        {topic['#text']}
                                                    </Link>
                                                </li>
                                            )
                                            :
                                            <li>
                                                <Link to={`/document/${document._source['related-topic']['@id']}`}>
                                                    {document._source['related-topic']['#text']}
                                                </Link>
                                            </li>
                                    }
                                </ul>
                            </>
                        }
                        {
                            document._source['site'] &&
                            <>
                                <h4 className="text-secondary">See Links</h4>
                                <hr/>
                                <ul>
                                    {
                                        Array.isArray(document._source['site']) ?
                                            document._source['site'].map((site, index) =>
                                                <li key={index}>
                                                    <a href={site['@url']}>
                                                        {site['@title']}
                                                    </a>
                                                    <p>
                                                        <small>{site['organization']}</small>
                                                    </p>
                                                </li>
                                            )
                                            :
                                            <li>
                                                <a href={document._source['site']['@url']}>
                                                    {document._source['site']['@title']}
                                                </a>
                                                <p>
                                                    <small>{document._source['site']['organization']}</small>
                                                </p>
                                            </li>
                                    }
                                </ul>
                            </>
                        }
                    </>
                )
            }
        </div>
    );
}

export default DocumentDetail;