import "@testing-library/jest-dom"
import { render } from '@testing-library/react'
import Body from '../Body';
import { Provider } from 'react-redux';
import store from '../../utils/store';
import {StaticRouter} from 'react-router-dom/server';
import { RESTAURANT_DATA } from '../../mocks/data';

//fetch returns a promise
//dummy function given by jest
//fake api call
global.fetch = jest.fn(()=>{
    return Promise.resolve({
        json: ()=> {
            return Promise.resolve(RESTAURANT_DATA)
        },
    })
});

test("Shimmer should load on Homepage", () => {
    const body = render(
        <StaticRouter>
            <Provider store={store}>
                <Body/>
            </Provider>
        </StaticRouter>
        );
    // console.log(body);

    const shimmer = body.getByTestId("shimmer");

    // expect(shimmer).toBeInTheDocument();
    expect(shimmer.children.langth).toBe(10);
})