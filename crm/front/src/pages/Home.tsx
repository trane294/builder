import type { RootState } from 'src/store';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from 'src/features/counter/counterSlice';
import Header from 'src/components/Header';
import { NavLink } from 'react-router';

function Home() {
    return (
        <>
            <div>
                <Header />

                <div>
                    <NavLink to={`/project/1`}>
                        Project 1
                    </NavLink>
                </div>
                <div>
                    <NavLink to={`/project/2`}>
                        Project 2
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default Home;
