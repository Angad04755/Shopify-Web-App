"use client";
import { Provider } from "react-redux";
import { store } from "../redux/store";

function StoreProvider (props: any) {
    return (
    <Provider store={store}>
        {props.children}
    </Provider>
    );
}
export default StoreProvider;