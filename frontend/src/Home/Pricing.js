import React, { Component } from 'react'
import {
    Segment,
    Divider,
} from 'semantic-ui-react'
import FeaturesSection from './PricingSections/FeaturesSection'
import PricingSection from './PricingSections/PricingSection'
import FAQSection from './PricingSections/FAQSection';

import ResponsiveContainer from '../Navs/Header';
import Footer from '../Navs/Footer';

class Pricing extends Component {
    state = {
        subscribed: true
    }
    handleSubscription = () => this.setState({ subscribed: !this.subscribed })

    render() {
        return (
            <div>
                <ResponsiveContainer pricingActive style={{ minHeight: 70 }}>
                    <Segment /* style={{ padding: '1vh 8vw' }} */ vertical>
                        <Segment style={{ padding: '3em 2em' }}>
                            <PricingSection />

                            <Divider section />

                            <FeaturesSection />

                            <Divider section />

                            <FAQSection />

                        </Segment>
                    </Segment>

                    <Footer />
                </ResponsiveContainer>
            </div >
        )
    }
}

export default Pricing
