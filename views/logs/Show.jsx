const React = require("react");

function Show(props){
const {logs2}=props;
return(

    <div>
        <nav>
        <a href="/logs">Home</a>
      </nav>
        <h1> info about ship</h1>
        <p>The {logs2.title} name is {logs2.entry} {logs2.shipIsBroken ? "is broken":"not broken"} created at:{logs2.createdAt.toString()}</p>
    </div>
)

}

module.exports = Show;