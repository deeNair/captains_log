const React = require('react');

function New(){

    return(
        <div>
            <form action="/logs" method="POST">
           title <input type="text" name="title"/>
           entry <input type="text" name="entry" />
           is it broken :<input type="checkbox"  name="shipIsBroken"/>
            <input type="submit"/>
            </form>

        </div>
    )

}
module.exports=New;