import { OrbitControls } from '@react-three/drei';
import { useXRHitTest } from '@react-three/xr';
import { useRef } from 'react';
import { Mesh } from 'three';

const XRHit = () => {
    const hitRef = useRef<Mesh>(null);

    useXRHitTest((hitMatrix, hit) => {
        hitMatrix.decompose(
            hitRef.current.position,
            hitRef.current.quaternion,
            hitRef.current.scale
        );
        hitRef.current.rotation.set(-Math.PI / 2, 0, 0);
    });

    return (
        <>
            <OrbitControls enableZoom={true} zoomSpeed={2} minDistance={5} maxDistance={10} />
            <ambientLight intensity={0.5} />
            <mesh ref={hitRef}>
                <ringGeometry args={[1, 0.5, 32]} />
                <meshStandardMaterial color="red" />
            </mesh>
        </>
    );
};

export default XRHit;
