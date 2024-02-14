import Search from '@/components/icon/Search';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-br from-[#44356A] to-[#272039]'>
      <Input
        prefix={Search}
        placeholder='Search by player name'
        spellCheck={false}
      />

      <Select>
        <SelectTrigger className='w-48'>
          <SelectValue placeholder='Class (All)' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='light'>Light</SelectItem>
          <SelectItem value='dark'>Dark</SelectItem>
          <SelectItem value='system'>System</SelectItem>
        </SelectContent>
      </Select>
    </main>
  );
}
