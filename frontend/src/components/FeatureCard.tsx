import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';

interface FeatureCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    delay?: number;
}

export function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
        >
            <Card className="h-full p-6 bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-4xl mb-4 text-purple-400">{icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
                <p className="text-gray-400">{description}</p>
            </Card>
        </motion.div>
    );
}
