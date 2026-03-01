import Link from 'next/link';
import { NoteTag } from '@/types/note';

import css from './SidebarNotes.module.css';

function SideBarNotes() {
  const tags: NoteTag[] = [
    'Work',
    'Todo',
    'Personal',
    'Meeting',
    'Shopping',
    'Ideas',
    'Travel',
    'Finance',
    'Health',
    'Important',
  ];

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/filter/all" className={css.menuLink}>
          All Notes
        </Link>
      </li>

      {tags.map(tag => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SideBarNotes;
