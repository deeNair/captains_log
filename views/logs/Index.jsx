const React = require("react");

function Index(props){
const {logs1}=props;
return(

    <div>
        <nav>
        <a href="/logs/new">Enter New Ship</a>
      </nav>
        <h1>ships to be repaired</h1>
        <ul>
           {logs1.map((log,i)=>{
              return(
                <li key={log._id}>
                    The <a href={`/logs/${log._id}`}>{log.title}</a> name is {log.entry} {log.shipIsBroken ? "is broken" : "not broken"}

                    <a href={`/logs/${log._id}/edit`}>Edit </a>

             <form method="POST" action={`/logs/${log._id}?_method=DELETE`}>
                <input type="submit" value="DELETE" />
               </form>

                </li>
              );
           })}
        </ul>
    </div>
);

}

module.exports = Index;