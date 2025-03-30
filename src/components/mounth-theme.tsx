"use client"
import React, { useEffect, useState } from 'react';

const MountTheme: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mounted, setMounted] = useState(false)


    // Esperamos a que el componente esté montado para acceder al tema
    useEffect(() => {
        setMounted(true)
    }, [])

    // Si no está montado, mostramos un placeholder para evitar saltos de UI
    if (!mounted) {
        return (
            <div className="min-h-screen bg-[#ffffff] dark:bg-[#101113]">
                <div className="flex items-center justify-center min-h-screen">
                    <p>Loading...</p>
                </div>
            </div>
        )
    }

    return <>{children}</>;
};

export default MountTheme;