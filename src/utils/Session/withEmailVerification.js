import React from 'react'
import { connect } from 'react-redux'
import { withFirebase } from '../Firebase'
import { Modal, Button, Segment, Header } from 'semantic-ui-react'
import { ResponsiveContainer, Footer } from '../../components/Navs'
import { compose } from 'redux'

const withEmailVerification = Component => {
    class WithEmailVerification extends React.Component {
        constructor(props) {
            super(props);

            this.state = { isSent: false };
        }

        sendEmailVerification = () => {
            this.props.firebase
                .sendEmailVerification()
                .then(() => this.setState({ isSent: true }))
        }

        render() {
            const { authUser } = this.props
            return (
                needsEmailVerification(authUser)
                    ? (
                        <ResponsiveContainer>
                            <Segment
                                textAlign="center"
                                style={{ minHeight: '43.4vh' }}
                            >
                                <Header>
                                    Please Verify Your Email!
                                </Header>

                                <p>
                                    This page can only be accessed if your Email is verified.
                                </p>
                                <p>
                                    Refresh the page after verifying to display content
                                </p>

                                <Modal.Actions>
                                    {this.state.isSent
                                        ?
                                        <Button
                                            disabled
                                            content="Confirmation Email has already been sent"
                                        />
                                        :
                                        <Button
                                            onClick={this.sendEmailVerification}
                                            positive
                                            content="Send confirmation Email"
                                        />
                                    }
                                </Modal.Actions>
                            </Segment>
                            <Footer />
                        </ResponsiveContainer>
                    )
                    : (
                        <Component {...this.props} />
                    )

            );
        }
    }

    return compose(
        withFirebase,
        connect(mapStateToProps)
    )(WithEmailVerification)
};

const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
})

const needsEmailVerification = authUser =>
    authUser &&
    !authUser.emailVerified &&
    authUser.providerData
        .map(provider => provider.providerId)
        .includes('password')

export default (withEmailVerification)