import { Link } from "react-router-dom";



function Work(){
    return(
        <>
        <h1>Work</h1>
        <Link to="/swot">TrendlyneWidget</Link><br/>
        {/* <Link to="/heatmap">Heatmap</Link><br/> */}
        <Link to="/heatmapp">Heatmaps</Link><br/>
        <Link to="/cagr">Cagr</Link><br/>
        <Link to="/demo">Demo</Link><br/>
        <Link to='/login'>Login</Link><br/>
        <Link to='/sign'>Sign</Link><br/>
        <Link to='/component'>Component</Link><br/>
        <Link to='/navbars'>Nav</Link><br/>



        </>
    )
}

export default Work;