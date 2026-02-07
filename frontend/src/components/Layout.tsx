import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-purple-100 overflow-x-hidden">
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight">
                        Eventify
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link to="/create">
                            <Button size="sm">Create Event</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="relative pt-24 px-6 pb-12 max-w-7xl mx-auto z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
}
