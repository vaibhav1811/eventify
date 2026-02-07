import { Link } from 'react-router-dom';
import { Card } from './ui/Card';
import { format } from 'date-fns';

interface EventCardProps {
    event: any;
}

export function EventCard({ event }: EventCardProps) {
    return (
        <Link to={`/event/${event.slug}`}>
            <Card className="h-full hover:scale-[1.02] transition-transform cursor-pointer group relative overflow-hidden from-gray-800/50 to-gray-900/50 bg-gradient-to-br border-white/5 hover:border-purple-500/30">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                        {event.title}
                    </h3>

                    <div className="space-y-2 text-gray-400 text-sm">
                        <p className="flex items-center gap-2">
                            📅 {format(new Date(event.date_time), 'PPP p')}
                        </p>
                        <p className="flex items-center gap-2">
                            📍 {event.location_name}
                        </p>
                    </div>

                    {event.description && (
                        <p className="mt-4 text-gray-500 line-clamp-2 text-sm">{event.description}</p>
                    )}
                </div>
            </Card>
        </Link>
    );
}
