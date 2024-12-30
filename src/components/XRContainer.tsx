import { OrbitControls, useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const XrCube = ({ position, fileId }: { position: [number, number, number]; fileId: string }) => {
    const cubeRef = useRef<THREE.Group>(null);

    const ModelFromS3 = ({ url }: { url: string }) => {
        const gltf = useGLTF(url); // Load the GLTF/GLB model

        return <primitive object={gltf.scene} scale={0.45} />;
    };

    const s3Url = `https://elite-furniture.s3.eu-north-1.amazonaws.com/3D/${fileId}.gltf`;
    // const s3Url = 'https://elite-furniture.s3.eu-north-1.amazonaws.com/3D/plants.glb';

    return (
        <group ref={cubeRef} position={position}>
            <OrbitControls enableZoom={true} zoomSpeed={2} minDistance={5} maxDistance={10} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <ModelFromS3 url={s3Url} />
        </group>
    );
};

export default XrCube;
