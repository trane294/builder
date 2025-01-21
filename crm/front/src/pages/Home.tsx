import type { RootState } from 'src/store';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from 'src/features/counter/counterSlice';
import Header from 'src/components/Header';

function Home() {
    // const count = useSelector((state: RootState) => state.counter.value);
    // const dispatch = useDispatch();

    return (
        <>
            <div>
                <div>
                    <Header />
                    {/* <button
                        aria-label="Increment value"
                        onClick={() => dispatch(increment())}
                    >
                        Increment
                    </button>
                    <span>{count}</span>
                    <button
                        aria-label="Decrement value"
                        onClick={() => dispatch(decrement())}
                    >
                        Decrement
                    </button> */}
                </div>
            </div>
        </>
    )
}

export default Home;
