const React = require('react');
function Edit(props){
    const {logs3} = props;
    return(
 
            <div>
                <form method="POST" action={`/logs/${logs3._id}/?_method=PUT`}>
                Title:<input type="text" name="title"/>
                Entry:<input type="text" name="entry" />
                is it broken :{
                logs3.shipIsBroken ? <input type="checkbox" name="shipIsBroken" defaultChecked/> 
                : <input type="checkbox" /> 
                }
                <input type="submit" value="Submit Changes"/>
                </form>
            </div>

        )
}

module.exports = Edit;
