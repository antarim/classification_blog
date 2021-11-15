import React from "react";
import { Redirect, Route } from "react-router-dom";
import {SIGN_IN} from "./constants";
import {useSelector} from "react-redux";


export default function PrivateRoute({ children, ...rest }) {
    const user = useSelector((state => state.auth.user));

    return (
        <Route
            {...rest}
            render={({ location }) =>
                user ? (
                    <>
                        {children}
                    </>
                ) : (
                    <Redirect
                        to={{
                            pathname: SIGN_IN,
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}
