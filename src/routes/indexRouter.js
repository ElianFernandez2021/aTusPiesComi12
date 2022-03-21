let express = require("express")
let router = express.Router();
let controller = require("../controllers/indexController")

router.get("/", controller.home)
module.exports = router














/* import React, {Component} from 'React';
class MiComponente extends Component {
   constructor(props){
       super(props);
       this.state = {
          message: "Hacé click para suscribirte y recibir noticias"
       }
   }
   styles = {
       color: teal
   }
   cambiarColor(){
       this.styles = {
           color: pink
       }
   }
   render(){
       return(
           <div>
               <h3 onMouseOver={this.cambiarColor} styles={this.styles}>{this.state.message}</h3>
           </div>
       )
   }
}
export default MiComponente */