import Search from '@/components/icon/Search';
import { Input } from '@/components/ui/input';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-br from-[#44356A] to-[#272039]'>
      <Input prefix={Search} placeholder='Search by player name' spellCheck={false} />
    </main>
  );
}
