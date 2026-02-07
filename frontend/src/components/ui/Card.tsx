import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
    variant?: 'default' | 'glass' | 'neo';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'glass', children, ...props }, ref) => {
        const variants = {
            default: 'bg-white border border-gray-200 shadow-sm',
            glass: 'bg-white/80 backdrop-blur-lg border border-gray-200 shadow-xl',
            neo: 'bg-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] border-2 border-black',
        };

        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                    'rounded-2xl p-6 transition-all duration-300',
                    variants[variant],
                    className
                )}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

Card.displayName = 'Card';
export { Card };
