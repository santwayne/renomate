import { Canvas } from '@react-three/fiber';
import { XR, createXRStore } from '@react-three/xr';
import XrCube from '../components/XRContainer';
import '../App.css';

const XrContainer = () => {
    const store = createXRStore();
    // const store = createXRStore({
    //     customSessionInit: { requiredFeatures: ['hit-test'] },
    // });
    return (
        <>
            <Canvas
                style={{ height: '70vh', width: '90vw' }}
                resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}
            >
                <XR store={store}>
                    <XrCube position={[0, 0, -3]} />
                </XR>
            </Canvas>
            <button className="_hit_btn" onClick={() => store.enterAR()}>
                Enter AR
            </button>
        </>
    );
};

export default XrContainer;
