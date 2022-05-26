import { React } from "@xarc/react";
import { Link } from "@xarc/react-router"

const listStyle = { display: "inline-block", fontSize: "20px", margin: "10px" }

 const Navigation = () => {
     return (
        <nav>
            <ul style={{background: "#d2d2d2", marginBottom: 0}}>
                <li style={listStyle}><Link to="/">Home</Link></li>
                <li style={listStyle}><Link to="/products">Product</Link></li>
            </ul>   
      </nav>
     )
 }

export default Navigation;