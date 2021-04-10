import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import './App.css';
import Search from "./components/search";
import Results from "./components/results";
import DocumentDetail from "./components/document-detail";
import LoadingBar from "react-top-loading-bar";
import {useRef} from "react";

const App = () => {
    const loadingRef = useRef(null);

    return (
        <Router>
            <LoadingBar
                color="orange"
                shadow="true"
                height={3}
                waitingTime={500}
                ref={loadingRef}/>
            <Switch>
                <Route exact path="/document/:docId">
                    <DocumentDetail loadingBar={loadingRef}/>
                </Route>
                <Route exact path="/search/:query">
                    <Results loadingBar={loadingRef}/>
                </Route>
                <Route exact path="/"
                       component={Search}>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
