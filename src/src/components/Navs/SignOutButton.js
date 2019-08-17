import React from 'react';

import { withFirebase } from '../Firebase';
import { Button } from 'semantic-ui-react';

const SignOutButton = ({ firebase, inverted }) => (
    <Button onClick={() => {
        firebase.signOut()
        // window.location.reload()
    }} inverted={inverted}>
        Sign Out
    </Button>
)

export default withFirebase(SignOutButton)