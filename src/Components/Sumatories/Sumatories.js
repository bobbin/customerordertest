import React, { Component } from 'react'
import './sumatories.css'

export default class Sumatories extends Component {
    render() {
        // const {qtyOrdered, qtyScheduled,qtyLoaded, qtyDelivered, qtyToDeliver } = this.props;
        const {qtyOrdered, qtyDelivered, qtyToDeliver } = this.props;
        return (
            <div className="sumatories">
                <div className="emptyField">
                    
                </div>
                <div className="sumField">
                    <p>
                        {qtyOrdered}
                    </p>
                </div>
                {/* <div className="sumField">
                    <p>
                        {qtyScheduled}
                    </p>
                </div> */}
                {/* <div className="sumField">
                    <p>
                        {qtyLoaded}
                    </p>
                </div> */}
                <div className="sumField">
                    <p>
                        {qtyDelivered}
                    </p>
                </div>
                <div className="sumField">
                    <p>
                        {qtyToDeliver}
                    </p>
                </div>
            </div>
        )
    }
}
