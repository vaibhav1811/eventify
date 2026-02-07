import { motion } from 'framer-motion';

interface StepCardProps {
    number: number;
    title: string;
    description: string;
}

export function StepCard({ number, title, description }: StepCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: number * 0.2 }}
            className="flex gap-6 items-start"
        >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-purple-500/20">
                {number}
            </div>
            <div>
                <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
                <p className="text-gray-400 leading-relaxed">{description}</p>
            </div>
        </motion.div>
    );
}
