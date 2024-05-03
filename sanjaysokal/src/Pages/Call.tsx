import React from 'react'
import { Link } from "react-router-dom"

const Call = () => {
    return (
        <section>
            <h2 className="section-heading">Discuss New Role?</h2>
            <div className="bottom-contact">
                <h4>Call me for fast</h4>
                <a href="tel:+91-82-95-67-3601">+91-82-95-67-3601</a>
                <br />
                <Link to="/contact" className="btn">Send Message</Link>
            </div>
        </section>
    )
}

export default Call