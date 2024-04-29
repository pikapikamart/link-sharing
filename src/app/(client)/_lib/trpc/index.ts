import { AppRouter } from '@/app/_server/trpc/routers';
import { createTRPCReact } from '@trpc/react-query';
 

export const trpc = createTRPCReact<AppRouter>();